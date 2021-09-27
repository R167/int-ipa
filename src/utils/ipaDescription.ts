import { IMPOSSIBLE, MANNERS, NOT_USED, PLACES, PULMONICS } from "./ipa";

type Pulmonics = Exclude<typeof PULMONICS[number][number], typeof NOT_USED | typeof IMPOSSIBLE>;

const describePulmonics = (): Map<Pulmonics, string> => {
  const defs = new Map<Pulmonics, string>();

  PULMONICS.forEach((row, r) => {
    const manner = MANNERS[r];
    row.forEach((sym, c) => {
      if (sym === IMPOSSIBLE || sym === NOT_USED) return;
      const place = PLACES[Math.floor(c / 2)];
      const voicing = c % 2 === 1 ? "Voiced" : "Voiceless";
      defs.set(sym, `${voicing} ${place} ${manner}`);
    });
  });

  return defs;
};

export const PulmonicDescriptions = describePulmonics();
