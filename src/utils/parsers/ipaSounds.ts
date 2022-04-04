import { IpaSounds, Sound } from "../../data/ipaSounds";
import { parse } from "./parse";
import { FILLER } from "../ipa";

const fillerRegex = new RegExp(FILLER, "ug");
const cleanSymbol = (sym: string): string => sym.replace(fillerRegex, "");

export type SoundParsed = Sound & { extra: boolean };

export const parseIpaSounds = (contents: string) => {
  const { symbols: rawSymbols, packFile, baseUrl, additionalSections } = parse(contents, IpaSounds);

  const symbols = new Map<string, SoundParsed>();

  // TODO: Raise error if a duplicate is encountered
  rawSymbols.forEach((line) => {
    symbols.set(cleanSymbol(line.ipa), { ...line, extra: false });
  });

  additionalSections?.forEach((section) =>
    section.symbols.forEach((line) => symbols.set(cleanSymbol(line.ipa), { ...line, extra: true }))
  );

  return { symbols, baseUrl, packFile, sections: additionalSections };
};

export type IpaSoundsParsed = ReturnType<typeof parseIpaSounds>;
