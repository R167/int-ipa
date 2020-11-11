import React from "react";
import Container from "@material-ui/core/Container";

import Router from "./Router";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { blue, indigo } from "@material-ui/core/colors";
import { Box, Theme, makeStyles, useMediaQuery } from "@material-ui/core";
import { notchGutters } from "./utils/styles";

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

const useStyles = makeStyles((theme: Theme) => ({
  notchPadding: {
    // paddingLeft: NOTCH_LEFT,
    // paddingRight: NOTCH_RIGHT,
    paddingBottom: "env(safe-area-inset-bottom, 0px)",
  },
  // Copied from source
  // https://github.com/mui-org/material-ui/blob/v4.11.0/packages/material-ui/src/Container/Container.js
  containerRoot: {
    width: "100%",
    marginLeft: "auto",
    boxSizing: "border-box",
    marginRight: "auto",
    display: "block", // Fix IE 11 layout when used with main.
    ...notchGutters(theme),
  },
}));

const DARK_KEY = "useDarkMode";

export default function App() {
  const classes = useStyles();

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
      <Box className={classes.notchPadding}>
        <Container maxWidth="lg" classes={{ root: classes.containerRoot }}>
          <Router />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
