import { Infer, array, number, object, optional, string } from "superstruct";

const Section = object({
  name: string(),
  columns: optional(number()),
  symbols: array(
    object({
      ipa: string(),
      description: string(),
    })
  ),
});

export type SectionDef = Infer<typeof Section>;

export const Keyboard = object({
  // Filter the symbols in Pulmonics, Vowels, and Other.
  // If any Non-Pulmonic consanants are included, that section will appear,
  // otherwise it is automatically hidden.
  symbols: array(string()),
  // Any additional sections to include
  additionalSections: optional(array(Section)),
});
