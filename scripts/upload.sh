#!/bin/zsh

# pairs with ./batch_convert.rb to upload files

set -e

../scripts/binpack_ipa.rb -i ../public/config/ipa_sound_manifest.yaml -o ../tmp/data.msgpack -s ../tmp/converted -l

touch converted.zip
rm converted.zip

zip -r -qdgds 10m converted.zip converted

b2 sync --threads=10 --replaceNewer converted b2://int-ipa/static-assets/ipa/
b2 upload-file int-ipa converted.zip static-assets/ipa.zip
b2 upload-file --contentType application/msgpack int-ipa data.msgpack static-assets/ipa.msgpack
b2 upload-file --contentType application/yaml int-ipa ../public/config/ipa_sound_manifest.yaml static-assets/ipa_sound_manifest.yaml
