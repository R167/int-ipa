# Interactive IPA transcription

Int IPA is a tool for teaching IPA transcription with incremental feedback.

- [Interactive IPA transcription](#interactive-ipa-transcription)
  - [Features](#features)
  - [Config](#config)
  - [Hosting](#hosting)
    - [Prebuilt release](#prebuilt-release)
    - [Hosted](#hosted)
    - [Custom build](#custom-build)
  - [Tools](#tools)
  - [Development](#development)

## Features

* Everything is client side
  * No student data is saved to any server, etc. You just provide a config and then everything runs
    locally in browser
* Full interactive IPA keyboard
* Multiple classes/assignment groupings
* Verifiable submission codes
  * includes student entered text (e.g. their name), timestamp, and verification.
* Word segment matchers
  * Segment macros, allowing the same message for multiple possible entries
  * Wildcards to capture "any" type patterns
* Unicode normalization

For a full list of changes, please see the [changelog](CHANGELOG.md).

## Config

TODO: Add config help

see [here](public/config/README.md)

## Hosting

There are several different options for hosting an instance of Int IPA.

### Prebuilt release

Go to the [latest release](https://github.com/R167/int-ipa/releases/tag/latest) and download one of
the build assets. In most cases, you want `relative-path-assets.zip`. Unzip the contents and place
it wherever you want hosted on your statically hosted webserver.

The `assets` and `static` folders must be copied to the server as well as `index.html`. The other
files are optional and useful if this is the root folder of your site.

`config` is where all config files live. An example configuration is included (it's largely the same
as the [hosted](#hosted) version). Check out the [config section](#config) for more info.

### Hosted

A prebuilt version of this website exists at

### Custom build

## Tools

TODO: Build out admin/teacher tools

## Development
