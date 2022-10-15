import { useMemo } from "react";
import { Theme, darken, fade, lighten } from "@material-ui/core/styles";

export interface Clickable {
  onClick?: (char: string) => void;
}

export interface ClickableSubset extends Clickable {
  subset?: Subset;
}

type SubsetFunc = (char: string) => boolean;
export type Subset = undefined | Set<string> | string[] | SubsetFunc;

export const subsetFunc = (subset: Subset): SubsetFunc => {
  if (subset === undefined) {
    return () => true;
  } else if (typeof subset === "function") {
    return subset;
  } else if (Array.isArray(subset)) {
    const set = new Set(subset);
    return (char) => set.has(char);
  } else {
    return (char) => subset.has(char);
  }
};

export const useSubset = (subset: Subset): SubsetFunc => {
  return useMemo(() => subsetFunc(subset), [subset]);
};

export const borderColor = (theme: Theme) =>
  theme.palette.type === "light"
    ? lighten(fade(theme.palette.divider, 1), 0.88)
    : darken(fade(theme.palette.divider, 1), 0.68);

export const shadowBorder = (size: string, color: string) => {
  return `${size} 0 0 0 ${color}, 0 ${size} 0 0 ${color}, ${size} ${size} 0 0 ${color}, ${size} 0 0 0 ${color} inset, 0 ${size} 0 0 ${color} inset`;
};

export const colToWidth = (c?: number) => (c === 2 ? 6 : c === 3 ? 4 : 12);
