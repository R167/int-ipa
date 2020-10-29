import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Header from "./components/Header";

export default () => {
  return (
    <Switch>
      <Route path="/about">
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App v4-beta example with TypeScript
        </Typography>
      </Route>
      <Route path="/topics">
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App v4-beta example with TypeScript
        </Typography>
      </Route>
      <Route path="/">
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App v4-beta example with TypeScript
        </Typography>
      </Route>
    </Switch>
  );
};
