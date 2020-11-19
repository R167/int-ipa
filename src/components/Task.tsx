import React from "react";

import { useAsync } from "react-async-hook";
import { parseTask } from "../utils/parsers/task";
import { Typography } from "@material-ui/core";
import WordInput from "./WordInput";

interface Props {
  taskFileUrl: string;
}

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
  <Typography variant="h3" component="h1" gutterBottom align="center">
    {error && "Error: "}
    {msg}
  </Typography>
);
const Task = (props: Props) => {
  const { taskFileUrl } = props;
  const task = useAsync(fetchTask, [taskFileUrl]);

  /**
   * Cases:
   * if classTasks.result : Good
   * while loading class && manifest: Class name
   * while loading manifest: Loading...
   * if (classTasks.error) : "cannot load class X"
   *
   */

  if (task.result) {
    const { title, words } = task.result;
    console.log(task.result);
    return (
      <div>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          {title}
        </Typography>
        <WordInput word={words[0]} />
      </div>
    );
  } else if (task.loading) {
    return (
      <div>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Loading...
        </Typography>
      </div>
    );
  } else if (task.error) {
    console.log(task.error);
    return <Status error msg="Cannot load task file" />;
  } else {
    return <Status error msg="Unreachable state???" />;
  }
};

export default Task;
