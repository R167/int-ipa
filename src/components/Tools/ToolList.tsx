import React from "react";

import { Route, Switch, match } from "react-router-dom";
import NotFound from "../NotFound";
import Validator from "./Validator";

interface Props {
  match: match;
}

const ToolList = ({ match }: Props) => {
  return (
    <Switch>
      <Route exact path={match.url} render={() => "Home!"} />
      <Route path={`${match.url}/test`} render={() => "Test!"} />
      <Route path={`${match.url}/validate`} component={Validator} />

      {/* Catchall */}
      <Route component={NotFound} />
    </Switch>
  );
};

export default ToolList;
