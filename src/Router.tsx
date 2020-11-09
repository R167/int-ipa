import React from "react";
import { Switch, Route } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import ClassPage from "./components/ClassPage";
import Homepage from "./components/Homepage";

const Router = () => {
  return (
    <Switch>
      <Route path="/class/:klass" component={ClassPage} />
      <Route path="/" exact component={Homepage} />
    </Switch>
  );
};

export default Router;
