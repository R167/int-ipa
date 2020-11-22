import React, { useEffect } from "react";

import Router from "./Router";
import { Container, CssBaseline, Snackbar } from "@material-ui/core";
import Header from "./components/Header";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { blue, indigo } from "@material-ui/core/colors";
import { Theme, makeStyles, useMediaQuery } from "@material-ui/core";
import { notchGutters } from "./utils/styles";
import { useDebugContext } from "./utils/Debug";
import { usePersistentState } from "./utils/usePersistentState";

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: blue[900],
    },
    secondary: {
      main: indigo[700],
    },
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: blue[500],
    },
    secondary: {
      main: indigo[700],
    },
  },
});

const useStyles = makeStyles((theme: Theme) => ({
  // Modified from source
  // https://github.com/mui-org/material-ui/blob/v4.11.0/packages/material-ui/src/Container/Container.js
  containerRoot: {
    width: "100%",
    boxSizing: "border-box",
    display: "block", // Fix IE 11 layout when used with main.
    margin: theme.spacing(1, "auto", "env(safe-area-inset-bottom, 0px)"),
    ...notchGutters(theme),
  },
  debug: {
    pointerEvents: "none",
    zIndex: 1150,
  },
  debugRoot: {
    minWidth: 0,
    background: "rgba(240, 240, 240, 0.25)",
    color: theme.palette.text.disabled,
  },
}));

const DARK_KEY = "useDarkMode";

export default function App() {
  const classes = useStyles();
  const debug = useDebugContext();

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [dark, setDark] = usePersistentState<boolean | null>(DARK_KEY, null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      document.title = `${process.env.NODE_ENV.slice(0, 3)} - ${document.title}`;
    }
  }, []);

  const darkMode = dark === null ? prefersDarkMode : dark;

  const theme = React.useMemo(() => createMuiTheme(darkMode ? darkTheme : lightTheme), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} changeDarkMode={setDark} />
      <Container maxWidth="lg" classes={{ root: classes.containerRoot }}>
        <Router />
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={debug}
        message="Debug mode"
        className={classes.debug}
        ContentProps={{ classes: { root: classes.debugRoot }, elevation: darkMode ? 1 : 0 }}
      />
    </ThemeProvider>
  );
}
