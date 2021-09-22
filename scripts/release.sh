#!/bin/sh

function check() {
  if ! $@; then
    echo "Failed \`$@\`"
    exit 100
  fi
}

if git status -u --porcelain | grep "^.M"; then
  git status
  echo "Dirty files exist! Please stage everything before running."
  exit 100
fi

version="v$npm_package_version"

# Check for version
if ! git show :CHANGELOG.md | grep -F "## [$npm_package_version] -" > /dev/null; then
  echo "Missing $version in changelog!"
  exit 100
fi

# Check for version link
if ! git show :CHANGELOG.md | grep -F "[$npm_package_version]: https://" > /dev/null; then
  echo "Missing $version link. Please run ./scripts/changelog.rb"
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
