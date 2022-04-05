import { Redirect, Route, Switch } from "react-router-dom";

import ClassPage from "./components/ClassPage";
import Homepage from "./components/Homepage";
import NotFound from "./components/NotFound";
import { RouteRemoteTask, RouteTask } from "./components/Task";
import TypeIPA from "./components/TypeIPA";
import ToolLoader from "./components/Tools/ToolLoader";

import { allowRemote } from "./config";
import Listen from "./components/Listen/ListenWrapper";

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/keyboard" exact component={TypeIPA} />
      <Route path="/class/:klass" exact component={ClassPage} />
      {/* Allow slashes for nested assignments */}
      <Route path="/class/:klass/:assignment+" exact component={RouteTask} />
      {allowRemote && <Route path="/remote" exact component={RouteRemoteTask} />}
      <Route path="/ipa-player" exact component={Listen} />

      {/* Old routes which have been moved */}
      <Redirect from="/type" exact to="/keyboard" />
      <Redirect from="/listen" exact to="/ipa-player" />

      <Route path="/tools" component={ToolLoader} />

      {/* Catchall */}
      <Route component={NotFound} />
    </Switch>
  );
};

export default Router;
