import React from "react";

import { Typography } from "@material-ui/core";
import { useAsync } from "react-async-hook";
import { parseTask } from "../../utils/parsers/task";
import Task from "./Task";
import { fullBaseUrl } from "../../constants";

import { StructError } from "superstruct";

const fetchTask = async (taskFileUrl: string) => {
  if (!taskFileUrl) {
    // Absurd. klass will actually always be defined
    console.log("empty task");
    return;
  }

  const req = await fetch(taskFileUrl);
  const body = await req.text();

  return parseTask(body);
};

interface StatusProps {
  msg: string;
  error?: boolean;
}

const Status = ({ msg, error }: StatusProps) => (
  <Typography variant="h3" component="p" gutterBottom align="center">
    {error && "Error: "}
    {msg}
  </Typography>
);

interface LoadProps {
  taskFileUrl: string;
}

/**
 * Wrapper around the Task with loading state
 */
const LoadTask = (props: LoadProps) => {
  const { taskFileUrl } = props;
  const task = useAsync(fetchTask, [taskFileUrl]);
  const baseUrl = new URL(taskFileUrl, fullBaseUrl()).toString();

  if (task.result) {
    return <Task task={task.result} baseUrl={baseUrl} />;
  } else if (task.loading) {
    return (
      <div>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Loading...
        </Typography>
      </div>
    );
  } else if (task.error) {
    console.error(task.error);
    if (task.error instanceof StructError) {
      return <Status error msg={task.error.message} />;
    } else {
      return <Status error msg="Cannot load task file" />;
    }
  } else {
    return <Status error msg="Unreachable state???" />;
  }
};

export default LoadTask;
