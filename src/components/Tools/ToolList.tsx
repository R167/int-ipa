import React from "react";

import { Route, RouteComponentProps, Switch, match } from "react-router-dom";
import NotFound from "../NotFound";

interface Props {
  match: match;
}

const ToolList = ({ match }: Props) => {
  return (
    <Switch>
      <Route exact path={match.url} render={() => "Home!"} />
      <Route path={`${match.url}/test`} render={() => "Test!"} />

      {/* Catchall */}
      <Route component={NotFound} />
    </Switch>
  );
};

export default ToolList;
