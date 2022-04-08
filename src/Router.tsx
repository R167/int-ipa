import { Redirect, Route, Switch } from "react-router-dom";

import ClassPage from "./components/ClassPage";
import Homepage from "./components/Homepage";
import NotFound from "./components/NotFound";
import { RouteRemoteTask, RouteTask } from "./components/Task";
import ToolLoader from "./components/Tools/ToolLoader";

import { allowRemote } from "./config";
import Listen from "./components/Listen/ListenWrapper";
import ChartRouter from "./components/Chart/ChartRouter";

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/class/:klass" exact component={ClassPage} />
      {/* Allow slashes for nested assignments */}
      <Route path="/class/:klass/:assignment+" exact component={RouteTask} />
      {allowRemote && <Route path="/remote" exact component={RouteRemoteTask} />}

      <Route path="/keyboard/:page?" exact component={ChartRouter} />

      {/* Old routes which have been moved */}
      <Redirect from="/type" exact to="/keyboard" />
      <Redirect from="/listen" exact to="/keyboard/audio" />
      <Redirect from="/ipa-player" exact to="/keyboard/audio" />

      <Route path="/tools" component={ToolLoader} />

      {/* Catchall */}
      <Route component={NotFound} />
    </Switch>
  );
};

export default Router;
