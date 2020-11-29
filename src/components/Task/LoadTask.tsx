import React from "react";

import { Box, CircularProgress, Fade, Typography } from "@material-ui/core";
import { useAsync } from "react-async-hook";
import { parseTask } from "../../utils/parsers/task";
import Task from "./Task";
import { fullBaseUrl } from "../../constants";

import { isContextError } from "../../utils/error";

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
  children: React.ReactNode;
  error?: boolean;
}

const Status = ({ children, error }: StatusProps) => (
  <Typography variant="h3" component="p" gutterBottom align="center">
    {error && "Error: "}
    {children}
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
      <Fade
        in
        style={{
          transitionDelay: "500ms",
        }}
        unmountOnExit
      >
        <Typography variant="h4" component="h1" align="center">
          <CircularProgress />
        </Typography>
      </Fade>
    );
  } else if (task.error) {
    if (isContextError(task.error)) {
      const issue = task.error.context(2);
      return (
        <div>
          <Typography variant="h3" component="p" gutterBottom>
            {task.error.message}
          </Typography>
          <Box component="pre" fontSize="h6.fontSize" lineHeight="1.3">
            {issue.map(({ num, contents, error }) => (
              <code style={error ? { color: "red" } : {}} key={num}>
                {num.toString().padStart(3, "0")}| {contents}
                {"\n"}
              </code>
            ))}
          </Box>
        </div>
      );
    } else {
      return <Status error children="Cannot load task file" />;
    }
  } else {
    return <Status error children="Unreachable state???" />;
  }
};

export default LoadTask;
