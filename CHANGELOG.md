# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.7.1] - 2022-10-15

### Added

- Type/Listen page have been unified
- Ability to specify a list of allowed ipa symbols for a task

### Changed

- Rewrote the IPAInput cursor position handling
- Cleaned up assorted imports

### Fixed

- Random scrolling on ipa keyboard typing
- Fixed GH actions... again.

## [0.7.0-beta.2] - 2022-04-04

### Added

- Listen element now supports displaying the video
- Internally, lots of tweaks to the base set of playable files
- Lots of minor cleanup

### Fixed

- Release script no longer crashes with an old version of Node

## [0.7.0-beta.1] - 2022-04-04

### Fixed

- Builds complete properly again

## [0.7.0-beta] - 2022-04-04

### Added

- (beta) New keyboard for playing sounds from IPA by clicking

### Changed

- Updated to Typescript 4.4

## [0.6.1] - 2021-08-29

### Added

- Added optional `HINT` key as special case in segments list which displays after getting that segment wrong 5+ times

### Changed

- Began using [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format
- `theme_color` is now responsive and set to same as nav bar
- Upgraded typescript and several other minor packages

## [0.6.0] - 2021-02-16

- (Internal) switch to yarn berry for installation/package management
- Revamp reslease mechanism (again...)
- Update github actions to work with new yarn version
- Dependency updates

## [0.5.3] - 2021-01-19

- Fixed changelog
- Add changelog check to version bump

## [0.5.2] - 2021-01-19

- Update examples
- Fix bug where sounds on relative assets didn't work

## [0.5.1] - 2021-01-17

- Minor tweaks to the example assignment1

## [0.5.0] - 2020-12-19

- Links now work correctly for Markdown
- Homepage content set in `manifest.yaml`
- Clarify versioning scheme

## [0.4.0] - 2020-12-18

- Allowing remote file loading is now optional under `REACT_APP_ALLOW_REMOTE`
  - Disabled by default in production
- Option to use browser router instead of hash router with `REACT_APP_ROUTER=browser`
- Move `/type` to `/keyboard` (includes redirect)
- Internal improvements
- Added more documentation
- Hosted version is now at https://ipa.wdurand.com/
- Added footer with copyright information

## [0.3.1] - 2020-12-04

- Begin packaging prebuilt images

## [0.2.0] - 2020-12-04

- Initial release

<!-- AUTOGENERATED BELOW THIS LINE -->
<!-- Run `./scripts/changelog.rb` to generate -->

[unreleased]: https://github.com/R167/int-ipa/compare/v0.7.1...HEAD
[0.7.1]: https://github.com/R167/int-ipa/compare/v0.7.0-beta.2...v0.7.1
[0.7.0-beta.2]: https://github.com/R167/int-ipa/compare/v0.7.0-beta.1...v0.7.0-beta.2
[0.7.0-beta.1]: https://github.com/R167/int-ipa/compare/v0.7.0-beta...v0.7.0-beta.1
[0.7.0-beta]: https://github.com/R167/int-ipa/compare/v0.6.1...v0.7.0-beta
[0.6.1]: https://github.com/R167/int-ipa/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/R167/int-ipa/compare/v0.5.3...v0.6.0
[0.5.3]: https://github.com/R167/int-ipa/compare/v0.5.2...v0.5.3
[0.5.2]: https://github.com/R167/int-ipa/compare/v0.5.1...v0.5.2
[0.5.1]: https://github.com/R167/int-ipa/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/R167/int-ipa/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/R167/int-ipa/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/R167/int-ipa/compare/v0.2.0...v0.3.1
[0.2.0]: https://github.com/R167/int-ipa/tree/v0.2.0
