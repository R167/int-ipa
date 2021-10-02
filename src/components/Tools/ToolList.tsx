import { Breadcrumbs } from "@material-ui/core";

import { Route, Switch, match, useLocation } from "react-router-dom";
import Link from "../Link";
import NotFound from "../NotFound";
import Matcher from "./Matcher";
import Validator from "./Validator";

const links = [
  { path: "test", name: "Test" },
  { path: "validate", name: "Validate" },
  { path: "matcher", name: "Matcher" },
];

const Home = ({ match }: Props) => {
  return (
    <ul>
      {links.map(({ path, name }) => (
        <li>
          <Link to={`${match.url}/${path}`} key={path}>
            {name}
          </Link>
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
          <Link key={path} color={i === urls.length - 1 ? "textPrimary" : "inherit"} to={path}>
            {name.replace(/\b\w/g, (c) => c.toUpperCase())}
          </Link>
        ))}
      </Breadcrumbs>
      <Switch>
        <Route exact path={match.url} component={Home} />
        <Route path={`${match.url}/test`} render={() => "Test!"} />
        <Route path={`${match.url}/validate`} component={Validator} />
        <Route path={`${match.url}/matcher`} component={Matcher} />

        {/* Catchall */}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default ToolList;
