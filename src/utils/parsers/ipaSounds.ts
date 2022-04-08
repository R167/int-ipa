import { IpaSounds, Sound } from "../../data/ipaSounds";
import { parse } from "./parse";

export type SoundParsed = Sound & { extra: boolean };

export const parseIpaSounds = (contents: string) => {
  const {
    symbols: rawSymbols,
    packFile,
    baseUrl,
    footer,
    additionalSections,
  } = parse(contents, IpaSounds);

  const symbols = new Map<string, SoundParsed>();

  const addSound = (extra: boolean) => (snd: Sound) => {
    const { ipa } = snd;
    if (symbols.has(ipa)) {
      throw new Error(`Duplicate entry for ${ipa}`);
    } else {
      symbols.set(ipa, { ...snd, extra });
    }
  };

  rawSymbols.forEach(addSound(false));

  additionalSections?.forEach((section) => section.symbols.forEach(addSound(true)));

  return { symbols, baseUrl, packFile, footer, sections: additionalSections };
};

export type IpaSoundsParsed = ReturnType<typeof parseIpaSounds>;
