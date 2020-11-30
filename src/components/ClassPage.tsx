import React from "react";
import { RouteComponentProps } from "react-router";
import { useManifest } from "../Manifest";

import { useAsync } from "react-async-hook";
import { TASK_FILE, fileUrl } from "../constants";
import { Typography } from "@material-ui/core";
import { TaskList } from "./Task";

import { parseTaskList } from "../utils/parsers";
import { ResourceError } from "../utils/error";
import ErrorMessage from "./ErrorMessage";

interface MatchParams {
  klass: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const fetchClassTasks = async (classId: string) => {
  if (!classId) {
    // Absurd. klass will actually always be defined. but just in case
    console.log("empty class");
    return;
  }
  const url = fileUrl(classId, TASK_FILE);

  const req = await fetch(url).catch((error) => {
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

  return parseTaskList(body);
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
const ClassPage = (props: Props) => {
  const classId = props.match.params.klass;

  const manifest = useManifest();
  const klass = manifest?.result?.classes?.find(({ folder }) => classId === folder);
  // classTasks can begin loading before we confirm classId
  const classTasks = useAsync(fetchClassTasks, [classId]);

  /**
   * Cases:
   * if classTasks.result : Good
   * while loading class && manifest: Class name
   * while loading manifest: Loading...
   * if (classTasks.error) : "cannot load class X"
   *
   */

  if (classTasks.result) {
    const { title, description, tasks } = classTasks.result;
    return (
      <div>
        <div>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            {title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom align="center">
            {description}
          </Typography>
        </div>
        <Typography variant="h5" gutterBottom>
          Assignments:
        </Typography>
        <TaskList tasks={tasks} path={props.location.pathname} />
      </div>
    );
  } else if (classTasks.loading && klass) {
    return (
      <div>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Loading {klass.name}...
        </Typography>
      </div>
    );
  } else if (manifest.loading || classTasks.loading) {
    return (
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Loading...
      </Typography>
    );
  } else if (classTasks.error) {
    return (
      <ErrorMessage error={classTasks.error} context={3} defaultHeader="No such class exists" />
    );
  } else {
    return <Status error msg="Unreachable state???" />;
  }
};

export default ClassPage;
