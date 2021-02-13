#!/bin/sh

function check() {
  if ! $@; then
    echo "Failed \`$@\`"
    exit 100
  fi
}

version="v$npm_package_version"

if ! git show :CHANGELOG.md | grep "## $version"; then
  echo "Missing $version in changelog!"
  exit 100
fi

check yarn prettier --check ./src
check yarn lint-ci
check yarn test --watchAll=false

echo "Creating tag $version"

git commit -m "Release $version" && \
git tag -a $version -m "Release $version" || exit 100

echo "Pushing $version to origin..."

git push --follow-tags
