import { darken, lighten, fade, Theme } from "@material-ui/core/styles";

export interface Clickable {
  onClick?: (char: string) => void;
}

export const borderColor = (theme: Theme) =>
  theme.palette.type === "light"
    ? lighten(fade(theme.palette.divider, 1), 0.88)
    : darken(fade(theme.palette.divider, 1), 0.68);
