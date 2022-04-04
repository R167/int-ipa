import { Infer, array, object, optional, string } from "superstruct";

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

export const IpaSounds = object({
  baseUrl: optional(string()),
  packFile: optional(string()),
  symbols: array(Sound),
  additionalSections: optional(array(Section)),
});
