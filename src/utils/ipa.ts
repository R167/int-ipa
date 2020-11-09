/**
 * Places of articulation
 */
export const PLACES = [
  "bilabial",
  "labiodental",
  "dental",
  "alveolar",
  "postalveolar",
  "retroflex",
  "palatal",
  "velar",
  "uvular",
  "pharyngeal",
  "glottal",
] as const;

/**
 * Manners of articulation
 */
export const MANNERS = [
  "plosive",
  "nasal",
  "trill",
  "tap",
  "fricative",
  "lateral fricative",
  "approximant",
  "lateral approximant",
] as const;

export type PlaceOfArt = typeof PLACES[number];
export type MannerOfArt = typeof MANNERS[number];

// The sounds that are either impossible or not used
export const IMPOSSIBLE = "_";
const IMP = IMPOSSIBLE;
export const NOT_USED = "";
const NUL = NOT_USED;

// prettier-ignore
export const PULMONICS = [
  ["p", "b", NUL, NUL, NUL, NUL, "t", "d", NUL, NUL, "ʈ", "ɖ", "c", "ɟ", "k", "g", "q", "ɢ", NUL, IMP, "ʔ", IMP],
  [NUL, "m", NUL, "ɱ", NUL, NUL, NUL, "n", NUL, NUL, NUL, "ɳ", NUL, "ɲ", NUL, "ŋ", NUL, "ɴ", IMP, IMP, IMP, IMP],
  [NUL, "ʙ", NUL, NUL, NUL, NUL, NUL, "r", NUL, NUL, NUL, NUL, NUL, NUL, IMP, IMP, NUL, "ʀ", NUL, NUL, IMP, IMP],
  [NUL, NUL, NUL, "ⱱ", NUL, NUL, NUL, "ɾ", NUL, NUL, NUL, "ɽ", NUL, NUL, IMP, IMP, NUL, NUL, NUL, NUL, IMP, IMP],
  ["ɸ", "β", "f", "v", "θ", "ð", "s", "z", "ʃ", "ʒ", "ʂ", "ʐ", "ç", "ʝ", "x", "ɣ", "χ", "ʁ", "ħ", "ʕ", "h", "ɦ"],
  [IMP, IMP, IMP, IMP, NUL, NUL, "ɬ", "ɮ", NUL, NUL, NUL, NUL, NUL, NUL, NUL, NUL, NUL, NUL, IMP, IMP, IMP, IMP],
  [NUL, NUL, NUL, "ʋ", NUL, NUL, NUL, "ɹ", NUL, NUL, NUL, "ɻ", NUL, "j", NUL, "ɰ", NUL, NUL, NUL, NUL, IMP, IMP],
  [IMP, IMP, IMP, IMP, NUL, NUL, NUL, "l", NUL, NUL, NUL, "ɭ", NUL, "ʎ", NUL, "ʟ", NUL, NUL, IMP, IMP, IMP, IMP]
] as const;

export const CLICKS = {
  bilabial: "ʘ",
  dental: "ǀ",
  postalveolar: "ǃ",
  palatoalveolar: "ǂ",
  "alveolar lateral": "ǁ",
};
export const IMPLOSIVES = { bilabial: "ɓ", dental: "ɗ", palatal: "ʄ", velar: "ɠ", uvular: "ʛ" };

export const EJECTIVE = "ʼ";