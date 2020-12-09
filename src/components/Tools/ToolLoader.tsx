import React, { Suspense, lazy } from "react";
import { RouteComponentProps } from "react-router-dom";

const ToolList = lazy(() => import("./ToolList"));

interface Props extends RouteComponentProps {}

const ToolLoader = (props: Props) => (
  <Suspense fallback={null}>
    <ToolList match={props.match} />
  </Suspense>
);

export default ToolLoader;
