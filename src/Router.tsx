import React from "react";
import { Route, Switch } from "react-router-dom";

import ClassPage from "./components/ClassPage";
import Homepage from "./components/Homepage";
import TypeIPA from "./components/TypeIPA";

const Router = () => {
  return (
    <Switch>
      <Route path="/type" exact component={TypeIPA} />
      <Route path="/" exact component={Homepage} />
      <Route path="/class/:klass" component={ClassPage} />
    </Switch>
  );
};

export default Router;
