import React from "react";
import { useParams } from "react-router-dom";
import { fileUrl } from "../../constants";
import LoadTask from "./LoadTask";

const RouteTask = () => {
  const { klass, assignment } = useParams<{ klass: string; assignment: string }>();
  return <LoadTask taskFileUrl={fileUrl(klass, `${assignment}.yaml`)} />;
};

export default RouteTask;
