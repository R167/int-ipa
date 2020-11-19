import { Theme } from "@material-ui/core";

export const notchGutters = (theme: Theme) => ({
  paddingLeft: `max(env(safe-area-inset-left, 0px), ${theme.spacing(2)}px)`,
  paddingRight: `max(env(safe-area-inset-right, 0px), ${theme.spacing(2)}px)`,
  [theme.breakpoints.up("sm")]: {
    paddingLeft: `max(env(safe-area-inset-left, 0px), ${theme.spacing(3)}px)`,
    paddingRight: `max(env(safe-area-inset-right, 0px), ${theme.spacing(3)}px)`,
  },
});
