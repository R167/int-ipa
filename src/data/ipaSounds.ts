import { Infer, array, object, optional, string, type } from "superstruct";

export type IpaSoundsDef = Infer<typeof IpaSounds>;

const commonSound = {
  // Note: the filler '◌' character should be treated as a noop and deleted
  ipa: string(),
  audio: string(),
  video: optional(string()),
  description: optional(string()),
};

const Sound = object(commonSound);

type SoundDef = Infer<typeof Sound>;

export type { SoundDef as Sound };

// Sections follos
const Section = object({
  name: string(),
  symbols: array(
    object({
      ...commonSound,
      description: string(),
    })
  ),
});

// Expliticly make this a type() to better support future changes/additions since it may be externally hosted
export const IpaSounds = type({
  baseUrl: optional(string()),
  packFile: optional(string()),
  footer: optional(string()),
  symbols: array(Sound),
  additionalSections: optional(array(Section)),
});
