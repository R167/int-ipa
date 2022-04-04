# IntIPA config

This is the config directory and it's where all configuration should live.

```
config                    # Root config folder
├── README.md
├── ex-lign101            # Each class has it's own folder
│   ├── assignment1.yaml  # Each assignment is a file
│   ├── assignment2.yaml  # And you can have multiple per class
│   ├── tasks.yaml        # Data about the class (list of assignments and class name, etc.)
│   ├── testSound.wav     # Any other assets like sound files
│   └── nestedFolder      # You can have any subfolders you like
│       └── snd.wav       # Sounds and other assets can be in these subfolders
├── manifest.yaml         # The root manifest file which has a list of all classes
└── ipa_sounds.yaml       # A list of ipa sound files for the interactive keyboard player
```

## `manifest.yaml`

The manifest file is the most important thing which lives in the config directory as it
tells the entire application what tasks exists, where to look for files, etc. This is the
main descriptor file.

## `ipa_sounds.yaml`

Describes the list of sounds which can be played on the interactive keyboard
