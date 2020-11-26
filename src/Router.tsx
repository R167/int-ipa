import React from "react";
import { Route, Switch } from "react-router-dom";

import ClassPage from "./components/ClassPage";
import Homepage from "./components/Homepage";
import NotFound from "./components/NotFound";
import { RouteTask } from "./components/Task";
import TypeIPA from "./components/TypeIPA";

const Router = () => {
  return (
    <Switch>
      <Route path="/type" exact component={TypeIPA} />
      <Route path="/" exact component={Homepage} />
      <Route path="/class/:klass" exact component={ClassPage} />
      <Route path="/class/:klass/:assignment" exact component={RouteTask} />

      {/* Catchall */}
      <Route component={NotFound} />
    </Switch>
  );
};

export default Router;
