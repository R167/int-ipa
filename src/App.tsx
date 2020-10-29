import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ProTip from "./components/ProTip";

import Router from "./Router";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Header siteTitle="Hello" />
      <Router />
    </>
  );
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App v4-beta example with TypeScript
        </Typography>
        <ProTip />
      </Box>
    </Container>
  );
}
