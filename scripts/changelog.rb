#!/usr/bin/env ruby
# frozen_string_literals: true

CHANGELOG = "CHANGELOG.md"
MARKER = "<!-- AUTOGENERATED BELOW THIS LINE -->"
COMMAND = "<!-- Run `./scripts/changelog.rb` to generate -->"

HEAD = "Unreleased"

VERSION = /^## \[(?<version>\d+\.\d+\.\d+(-[\w\.]+)?|#{HEAD})\]/

log = []

File.open(CHANGELOG, "r") do |file|
  log = file.read.split("\n")
end

marker = log.find_index(MARKER)

log_lines = log[0...marker]

log_lines << "" unless marker

versions = log_lines.filter_map { |line| line.match(VERSION) }.map! { |match| match["version"] }

log_lines << MARKER
log_lines << COMMAND
log_lines << ""

def tag(version)
  if version == HEAD
    "HEAD"
  else
    "v#{version}"
  end
end

versions.each_cons(2) do |new, old|
  log_lines << "[#{new}]: https://github.com/R167/int-ipa/compare/#{tag(old)}...#{tag(new)}"
end

log_lines << "[#{versions.last}]: https://github.com/R167/int-ipa/tree/#{tag(versions.last)}"

File.open(CHANGELOG, "w") do |file|
  file.puts(log_lines.join("\n"))
end
