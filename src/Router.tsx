import React from "react";
import { Route, Switch } from "react-router-dom";

import ClassPage from "./components/ClassPage";
import Homepage from "./components/Homepage";
import Task from "./components/Task";
import TypeIPA from "./components/TypeIPA";

const Router = () => {
  return (
    <Switch>
      <Route path="/type" exact component={TypeIPA} />
      <Route path="/" exact component={Homepage} />
      <Route path="/class/:klass" component={ClassPage} />
      <Route path="/ex/:file+" render={(r) => <Task taskFileUrl={r.match.params.file} />} />
    </Switch>
  );
};

export default Router;
