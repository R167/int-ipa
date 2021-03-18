# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- Began using keep a changelog format

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
