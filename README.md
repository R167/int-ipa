# Interactive IPA transcription

Int IPA is a tool for teaching IPA transcription with incremental feedback. See some examples at
[ipa.wdurand.com](https://ipa.wdurand.com)!

- [Interactive IPA transcription](#interactive-ipa-transcription)
  - [Features](#features)
  - [Config](#config)
  - [Hosting](#hosting)
    - [Prebuilt release](#prebuilt-release)
    - [Hosted](#hosted)
    - [Custom build](#custom-build)
  - [Tools](#tools)
    - [Planned additional tools](#planned-additional-tools)
  - [Contributing](#contributing)

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

The application supports having multiple classes and multiple assignments for each class. All configuration
is done using static files so that any file server can be used. Because of this, under [`/config`](public/config), there
is a [`manifest.yaml`](public/config/manifest.yaml) that specifies a list of all classes. Each class is a folder with the given name
and a [`tasks.yaml`](public/config/ex-lign101/tasks.yaml). The task file contains a list of all assignments
for this class, what the assignment is called, and a short description.

The assignment file itself contains metadata about the assignment, instructions, and the list
of all words to be transcribed (specified again as a list of correct and incorrect options). Here is
a [sample](public/config/ex-lign101/format.sample.yaml) with annotations about which fields are required
or optional. Additionally, [`assignment1.yaml`](public/config/ex-lign101/assignment1.yaml) is a full
assignment using all of the available features. Finally, an assignment may attach sound files. All URLs
are assumed relative to the given config file. This means you can easily have assignments fully self
contained in a folder as shown in the [nested](public/config/ex-lign101/nested) example.

More details on configuration is available [here](public/config/README.md)

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

A prebuilt version of this website exists at [ipa.wdurand.com](https://ipa.wdurand.com).

Eventually, there will be a tool to write custom assignments and have them hosted remotely for verified
users. At present, if you have interest in having your assignments hosted here as examples,
 please reach out to Winston Durand at wdurand@ucsd.edu.

### Custom build

Finally, you can create a custom build of the site. This involves compiling the site from source. To do
so, install node and yarn, then run `yarn install`. After that, you can change any environment variables
you want in `.env.production` and run `yarn build` to compile a new build. Most features are documented
in the `.env` files. This installation process mostly makes sense if you are forking this repository,
at which point you should probably be looking at the [contribution](#contributing) section below.

## Tools

This site currently has a tool to validate student submissions. It is available at an unlisted `/tools`
URL on all builds, but can be most easily reached at [ipa.wdurand.com/#/tools/validate](https://ipa.wdurand.com/#/tools/validate).

### Planned additional tools

- Assignment creator
- Hosted assignment creation

## Contributing

Follow the steps below to setup Int IPA locally:

```bash
$ git clone https://github.com/R167/int-ipa
$ cd int-ipa
$ brew install yarn
$ yarn install
# Start dev server
$ yarn start
```
