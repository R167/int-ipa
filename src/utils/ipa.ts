/**
 * Places of articulation
 */
export const PLACES = [
  "Bilabial",
  "Labiodental",
  "Dental",
  "Alveolar",
  "Postalveolar",
  "Retroflex",
  "Palatal",
  "Velar",
  "Uvular",
  "Pharyngeal",
  "Glottal",
] as const;

/**
 * Manners of articulation
 */
export const MANNERS = [
  "Plosive",
  "Nasal",
  "Trill",
  "Tap",
  "Fricative",
  "Lateral fricative",
  "Approximant",
  "Lateral approximant",
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

export const CLICKS = new Map([
  ["ʘ", "Bilabial"],
  ["ǀ", "Dental"],
  ["ǃ", "(Post)alveolar"],
  ["ǂ", "Palatoalveolar"],
  ["ǁ", "Alveolar lateral"],
]);

export const IMPLOSIVES = new Map([
  ["ɓ", "Bilabial"],
  ["ɗ", "Dental/alveolar"],
  ["ʄ", "Palatal"],
  ["ɠ", "Velar"],
  ["ʛ", "Uvular"],
]);

// U+02BC
export const EJECTIVE = "ʼ";

export const EJECTIVES = new Map([
  ["ʼ", "Examples:"],
  ["pʼ", "Bilabial"],
  ["tʼ", "Dental/alveolar"],
  ["kʼ", "Velar"],
  ["sʼ", "Alveolar fricative"],
]);

export const OTHERS = new Map([
  ["ʍ", "voiceless labial-velar fricative"],
  ["w", "voiced labial-velar approximant"],
  ["ɥ", "voiced labial-palatal approximant"],
  ["ʜ", "voiceless epiglottal fricative"],
  ["ʢ", "voiced epiglottal fricative"],
  ["ʡ", "epiglottal plosive"],
]);

export const VOWEL_HEIGHTS = ["Close", "Close-mid", "Open-mid", "Open"] as const;
export const VOWEL_FRONTEDNESS = ["Front", "Central", "Back"] as const;

export type VowelLiteral = readonly [string, string] | string;
export type Coords = readonly [number, number];

type VowelCoords = readonly (readonly [VowelLiteral, Coords])[];

/**
 * Associative array of Vowel pairs and ~coordinates
 *
 * Coords are specified on the range [0, 1]
 * x = frontedness
 * y = height
 *
 * Upper left (close front) is origin. Everything is translated afterwards to be
 * in the trapezium shape
 */
// prettier-ignore
export const VOWELS: VowelCoords = [
  // Close vowels
  [["i", "y"], [0, 0]],
  [["ɨ", "ʉ"], [0.5, 0]],
  [["ɯ", "u"], [1, 0]],

  // Near close vowels
  [["ɪ", "ʏ"], [0.2, 1/6]],
  [["", "ʊ"], [0.75, 1/6]],

  // Close-mid
  [["e", "ø"], [0, 1/3]],
  [["ɘ", "ɵ"], [0.5, 1/3]],
  [["ɤ", "o"], [1, 1/3]],

  // Mid
  ["ə", [0.5, 0.5]],

  // Open-mid
  [["ɛ", "œ"], [0, 2/3]],
  [["ɜ", "ɞ"], [0.5, 2/3]],
  [["ʌ", "ɔ"], [1, 2/3]],

  // Near-open
  [["æ", ""], [0, 5/6]],
  ["ɐ", [0.5, 5/6]],

  // Open
  [["a", "ɶ"], [0, 1]],
  [["ɑ", "ɒ"], [1, 1]],
];
