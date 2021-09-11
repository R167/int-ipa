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
  "Stop",
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

export const CLICKS = [
  ["ʘ", "Bilabial"],
  ["ǀ", "Dental"],
  ["ǃ", "(Post)alveolar"],
  ["ǂ", "Palatoalveolar"],
  ["ǁ", "Alveolar lateral"],
] as const;

export const IMPLOSIVES = [
  ["ɓ", "Bilabial"],
  ["ɗ", "Dental/alveolar"],
  ["ʄ", "Palatal"],
  ["ɠ", "Velar"],
  ["ʛ", "Uvular"],
] as const;

// U+02BC
export const EJECTIVE = "ʼ";

export const EJECTIVES = [
  ["ʼ", "Examples:"],
  ["pʼ", "Bilabial"],
  ["tʼ", "Dental/alveolar"],
  ["kʼ", "Velar"],
  ["sʼ", "Alveolar fricative"],
] as const;

export const FILLER = "◌";

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

export const STRESS = "ˈ";
export const SECONDARY_STRESS = "ˌ";

interface MiscChar {
  ipa: string;
  sym?: string;
  description: string;
  examples?: readonly string[];
}

export type MiscList = readonly Readonly<MiscChar>[];

export const DIACRITICS: MiscList = [
  { ipa: "\u0325", description: "Voiceless", examples: ["n", "d"] },
  { ipa: "\u032C", description: "Voiced", examples: ["s", "t"] },
  { ipa: "\u02B0", description: "Aspirated", examples: ["t", "d"] },
  { ipa: "\u0339", description: "More rounded", examples: ["ɔ"] },
  { ipa: "\u031C", description: "Less rounded", examples: ["ɔ"] },
  { ipa: "\u031F", description: "Advanced", examples: ["u"] },
  { ipa: "\u0320", description: "Retracted", examples: ["e"] },
  { ipa: "\u0308", description: "Centralized", examples: ["e"] },
  { ipa: "\u033D", description: "Mid-centralized", examples: ["e"] },
  { ipa: "\u0329", description: "Syllabic", examples: ["n"] },
  { ipa: "\u032F", description: "Non-syllabic", examples: ["n"] },
  { ipa: "\u02DE", description: "Rhoticity", examples: ["ə", "a"] },
  { ipa: "\u0324", description: "Breathy voiced", examples: ["b", "a"] },
  { ipa: "\u0330", description: "Creaky voiced", examples: ["b", "a"] },
  { ipa: "\u033C", description: "Linguolabial", examples: ["t", "d"] },
  { ipa: "\u02B7", description: "Labialized", examples: ["t", "d"] },
  { ipa: "\u02B2", description: "Palatalized", examples: ["t", "d"] },
  { ipa: "\u02E0", description: "Velarized", examples: ["t", "d"] },
  { ipa: "\u02E4", description: "Pharyngealized", examples: ["t", "d"] },

  { ipa: "\u032A", description: "Dental", examples: ["t", "d"] },
  { ipa: "\u033A", description: "Apical", examples: ["t", "d"] },
  { ipa: "\u033B", description: "Laminal", examples: ["t", "d"] },
  { ipa: "\u0303", description: "Nasalized", examples: ["e"] },
  { ipa: "\u207F", description: "Nasal release", examples: ["d"] },
  { ipa: "\u02E1", description: "Lateral release", examples: ["d"] },
  { ipa: "\u031A", description: "No audible release", examples: ["d"] },

  { ipa: "\u0334", description: "Velarized or pharyngealized", examples: ["l"] },

  { ipa: "\u031D", description: "Raised", examples: ["e"] },
  { ipa: "\u031E", description: "Lowered", examples: ["e"] },
  { ipa: "\u0318", description: "Advanced tongue root", examples: ["e"] },
  { ipa: "\u0319", description: "Retracted tongue root", examples: ["e"] },
];

export const MISC: MiscList = [
  {
    ipa: "\u0361",
    sym: `${FILLER}\u0361${FILLER}`,
    description: "Tie bar",
    examples: ["t͡ʃ", "d͡ʒ"],
  },
  { ipa: "w", sym: "w", description: "Voiced labial-velar approximant" },
  { ipa: "ʍ", sym: "ʍ", description: "Voiceless labial-velar fricative" },
  { ipa: "ɥ", sym: "ɥ", description: "Voiced labial-palatal approximant" },
  { ipa: "ʜ", sym: "ʜ", description: "Voiceless epiglottal fricative" },
  { ipa: "ʢ", sym: "ʢ", description: "Voiced epiglottal fricative" },
  { ipa: "ʡ", sym: "ʡ", description: "Epiglottal plosive" },
  { ipa: "ɺ", sym: "ɺ", description: "Voiced alveolar lateral flap" },
  { ipa: "ɕ", sym: "ɕ", description: "Voiceless alveolo-palatal fricative" },
  { ipa: "ʑ", sym: "ʑ", description: "Voiced alveolo-palatal fricative" },
  { ipa: "ɧ", sym: "ɧ", description: "Simultaneous ʃ and x" },
] as const;

export const SUPRASEGMENTALS: MiscList = [
  { ipa: STRESS, sym: STRESS, description: "Primary stress" },
  { ipa: SECONDARY_STRESS, sym: SECONDARY_STRESS, description: "Secondary stress" },
  { ipa: "ː", sym: "ː", description: "Long", examples: ["eː"] },
  { ipa: "ˑ", sym: "ˑ", description: "Half-long", examples: ["eˑ"] },
  { ipa: "\u0306", sym: `${FILLER}\u0306`, description: "Extra-short", examples: ["e\u0306"] },
  { ipa: "|", sym: "|", description: "Minor (foot) group" },
  { ipa: "‖", sym: "‖", description: "Major (intonation) group" },
  { ipa: ".", sym: ".", description: "Syllable break" },
  { ipa: "‿", sym: "‿", description: "Linking (absence of break)" },
] as const;
