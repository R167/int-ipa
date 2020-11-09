import React from "react";
import Container from "@material-ui/core/Container";

import Router from "./Router";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { blue, indigo } from "@material-ui/core/colors";
import { useMediaQuery } from "@material-ui/core";

import KonamiCode from "konami-code";

const konami = new KonamiCode();

konami.listen(() => {
  alert("Hello, world!");
});

const lightTheme = createMuiTheme({
  palette: {
    // type: "dark",
    secondary: {
      main: blue[900],
    },
    primary: {
      main: indigo[700],
    },
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    secondary: {
      main: blue[500],
    },
    primary: {
      main: indigo[700],
    },
  },
});

const DARK_KEY = "useDarkMode";

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [dark, setDark] = React.useState<boolean | null>(() => {
    const value = window.localStorage.getItem(DARK_KEY);
    return value ? value === "true" : null;
  });

  const changeDarkMode = React.useCallback(
    (dark: boolean) => {
      window.localStorage.setItem(DARK_KEY, dark.toString());
      setDark(dark);
    },
    [setDark]
  );

  const darkMode = dark === null ? prefersDarkMode : dark;

  const theme = React.useMemo(() => createMuiTheme(darkMode ? darkTheme : lightTheme), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} changeDarkMode={changeDarkMode} />
      <Container maxWidth="lg">
        <Router />
      </Container>
    </ThemeProvider>
  );
}
