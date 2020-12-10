import React from "react";

import { Breadcrumbs, Link as MatLink } from "@material-ui/core";

import { Route, Switch, match, Link, useLocation } from "react-router-dom";
import NotFound from "../NotFound";
import Validator from "./Validator";

const links = [
  { path: "test", name: "Test" },
  { path: "validate", name: "Validate" },
];

const Home = ({ match }: Props) => {
  return (
    <ul>
      {links.map(({ path, name }) => (
        <li>
          <MatLink component={Link} to={`${match.url}/${path}`} key={path}>
            {name}
          </MatLink>
        </li>
      ))}
    </ul>
  );
};

interface Props {
  match: match;
}

const ToolList = ({ match }: Props) => {
  const location = useLocation();

  const urls = location.pathname
    .split("/")
    .map((val, i, path) => {
      return { path: path.slice(0, i + 1).join("/"), name: val };
    })
    .filter((el) => el.name.length !== 0);

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        {urls.map(({ path, name }, i) => (
          <MatLink
            key={path}
            component={Link}
            color={i === urls.length - 1 ? "textPrimary" : "inherit"}
            to={path}
          >
            {name.replace(/\b\w/g, (c) => c.toUpperCase())}
          </MatLink>
        ))}
      </Breadcrumbs>
      <Switch>
        <Route exact path={match.url} component={Home} />
        <Route path={`${match.url}/test`} render={() => "Test!"} />
        <Route path={`${match.url}/validate`} component={Validator} />

        {/* Catchall */}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default ToolList;
