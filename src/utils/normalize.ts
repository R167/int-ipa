import { EJECTIVE } from "./ipa";

// We will always prefer the multi char version of a symbol, so always expand it
const CANONICAL_FORMS = new Map([
  ["ʧ", "t͡ʃ"],
  ["ʤ", "d͡ʒ"],
  ["ɚ", "ə˞"],
  ["ɝ", "ɜ˞"],
  // coerce an exclamation point to postalveolar click
  ["!", "ǃ"],
  // coerce an apostrophe to the ejective
  ["'", EJECTIVE],
]);

const NORM = "NFKD";

const MATCHER = new RegExp(Array.from(CANONICAL_FORMS.keys()).join("|"), "gu");

const normalize = (str: string) => {
  const normalized = str.normalize(NORM);
  return normalized.replaceAll(MATCHER, (match) => CANONICAL_FORMS.get(match) || "⍰");
};

export default normalize;
