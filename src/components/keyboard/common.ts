import { Theme, darken, fade, lighten } from "@material-ui/core/styles";

export interface Clickable {
  onClick?: (char: string) => void;
}

export const borderColor = (theme: Theme) =>
  theme.palette.type === "light"
    ? lighten(fade(theme.palette.divider, 1), 0.88)
    : darken(fade(theme.palette.divider, 1), 0.68);

export const shadowBorder = (size: string, color: string) => {
  return `${size} 0 0 0 ${color}, 0 ${size} 0 0 ${color}, ${size} ${size} 0 0 ${color}, ${size} 0 0 0 ${color} inset, 0 ${size} 0 0 ${color} inset`;
};
