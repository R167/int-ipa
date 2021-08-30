import { useEffect, useMemo } from "react";

import { Container, CssBaseline, Snackbar } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { ThemeOptions, createMuiTheme } from "@material-ui/core/styles";
import { blue, indigo } from "@material-ui/core/colors";
import { Theme, makeStyles, useMediaQuery } from "@material-ui/core";

import Router from "./Router";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { notchGutters } from "./utils/styles";
import { useDebugContext } from "./utils/Debug";
import { usePersistentState } from "./utils/usePersistentState";

import AudioContext from "./utils/AudioContext";

import MetaTags from "react-meta-tags";

const lightTheme: ThemeOptions = {
  palette: {
    type: "light",
    primary: {
      main: blue[900],
    },
    secondary: {
      main: indigo[700],
    },
  },
};

const darkTheme: ThemeOptions = {
  palette: {
    type: "dark",
    primary: {
      main: blue[500],
    },
    secondary: {
      main: indigo[700],
    },
  },
};

const useStyles = makeStyles((theme: Theme) => ({
  // Modified from source
  // https://github.com/mui-org/material-ui/blob/v4.11.0/packages/material-ui/src/Container/Container.js
  containerRoot: {
    marginTop: `${theme.spacing(1)}px`,
    width: "100%",
    boxSizing: "border-box",
    display: "block", // Fix IE 11 layout when used with main.
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
  siteRoot: {
    marginBottom: "env(safe-area-inset-bottom, 0px)",
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
  },
  siteContent: {
    flex: 1,
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

  // Create an audio context on first user interaction. Reduces audio playing delay
  useEffect(() => {
    const create = () => {
      document.removeEventListener("click", create);
      new AudioContext({
        latencyHint: "interactive",
      });
    };
    document.addEventListener("click", create);
  }, []);

  const darkMode = dark === null ? prefersDarkMode : dark;

  const theme = useMemo(() => createMuiTheme(darkMode ? darkTheme : lightTheme), [darkMode]);

  return (
    <div className={classes.siteRoot}>
      <ThemeProvider theme={theme}>
        <MetaTags>
          <meta name="theme-color" content={theme.palette.secondary.main} />
        </MetaTags>

        <CssBaseline />
        <Header darkMode={darkMode} changeDarkMode={setDark} />
        <Container
          maxWidth="lg"
          classes={{ root: classes.containerRoot }}
          className={classes.siteContent}
        >
          <Router />
        </Container>
        <Footer />
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
    </div>
  );
}
