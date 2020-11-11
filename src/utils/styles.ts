import { Theme } from "@material-ui/core";

export const NOTCH_LEFT = "max(calc(env(safe-area-inset-left, 0) - 8px), 0px)";
export const NOTCH_RIGHT = "max(calc(env(safe-area-inset-right, 0) - 8px), 0px)";

export const notchGutters = (theme: Theme) => ({
  paddingLeft: `max(env(safe-area-inset-left, 0px), ${theme.spacing(2)}px)`,
  paddingRight: `max(env(safe-area-inset-right, 0px), ${theme.spacing(2)}px)`,
  [theme.breakpoints.up("sm")]: {
    paddingLeft: `max(env(safe-area-inset-left, 0px), ${theme.spacing(3)}px)`,
    paddingRight: `max(env(safe-area-inset-right, 0px), ${theme.spacing(3)}px)`,
  },
});
