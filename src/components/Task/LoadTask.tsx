import { CircularProgress, Fade, Typography } from "@material-ui/core";
import { useAsync } from "react-async-hook";
import { parseTask } from "../../utils/parsers/task";
import Task from "./Task";
import { fullBaseUrl } from "../../constants";

import ErrorMessage from "../ErrorMessage";
import { ResourceError } from "../../utils/error";

const fetchTask = async (taskFileUrl: string) => {
  if (!taskFileUrl) {
    // Absurd. klass will actually always be defined
    console.log("empty task");
    return;
  }

  const req = await fetch(taskFileUrl).catch((error) => {
    if (error instanceof TypeError) {
      console.error(error);
      throw new ResourceError(
        `Cannot fetch resource. Permissions may not be correctly configured.`,
        error.message
      );
    } else {
      throw error;
    }
  });

  if (req.status !== 200) {
    throw new ResourceError(`${req.statusText}: Resource cannot be retrieved`);
  }

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
    return <ErrorMessage error={task.error} context={3} defaultHeader="Cannot load task file" />;
  } else {
    return <Status error children="Unreachable state???" />;
  }
};

export default LoadTask;
