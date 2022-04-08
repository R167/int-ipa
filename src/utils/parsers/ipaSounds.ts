import { IpaSounds, Sound } from "../../data/ipaSounds";
import { parse } from "./parse";

import normalize from "../normalize";

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
    const normalized = normalize(snd.ipa);
    if (symbols.has(normalized)) {
      throw new Error(`Duplicate entry for ${normalized}`);
    } else {
      symbols.set(normalized, { ...snd, extra });
    }
  };

  rawSymbols.forEach(addSound(false));

  additionalSections?.forEach((section) => section.symbols.forEach(addSound(true)));

  return { symbols, baseUrl, packFile, footer, sections: additionalSections };
};

export type IpaSoundsParsed = ReturnType<typeof parseIpaSounds>;
