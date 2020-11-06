import React from "react";
import { Switch, Route } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Quiz from "./components/Quiz";

export default () => {
  return (
    <Switch>
      <Route path="/class/:klass" component={Quiz} />
      <Route path="/">
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App v4-beta example with TypeScript
        </Typography>
      </Route>
    </Switch>
  );
};
