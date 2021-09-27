import { IpaSounds, Sound } from "../../data/ipaSounds";
import { parse } from "./parse";
import { FILLER } from "../ipa";

const fillerRegex = new RegExp(FILLER, "ug");
const cleanSymbol = (sym: string): string => sym.replace(fillerRegex, "");

export const parseIpaSounds = (contents: string) => {
  const { symbols: rawSymbols, baseUrl, additionalSections } = parse(contents, IpaSounds);

  const symbols = new Map<string, Sound>();

  // TODO: Raise error if a duplicate is encountered
  rawSymbols.forEach((line) => {
    symbols.set(cleanSymbol(line.ipa), line);
  });

  additionalSections?.forEach((section) =>
    section.symbols.forEach((line) => symbols.set(cleanSymbol(line.ipa), line))
  );

  return { symbols, baseUrl, sections: additionalSections };
};
