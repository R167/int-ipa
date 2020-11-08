import React from "react";
import Typography from "@material-ui/core/Typography";
import { RouteComponentProps } from "react-router";
import { Class, useManifest } from "../Manifest";

import normalize from "../utils/normalize";

import Player from "./Player";
import { useAsync } from "react-async-hook";

interface MatchParams {
  klass: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const fetchClassTasks = async (klass: Class | undefined) => {
  if (!klass) {
    // Absurd. klass will actually always be defined
    console.log("empty class");
    return;
  }
  const url = `/${klass.folder}/tasks.yaml`;

  const req = await fetch(url);

  return null;
};

const ClassPage = (props: Props) => {
  const classId = props.match.params.klass;

  const { result: manifest, loading: classLoading } = useManifest();
  const klass = manifest?.classes?.find(({ folder }) => classId === folder);
  const classTasks = useAsync(fetchClassTasks, [klass]);

  if (klass) {
    return (
      <Typography variant="h4" component="h1" gutterBottom>
        {normalize("tʃt͡ʃd͡ʒəɹɚa˞")} my class is {klass.name}
        <Player folder="ex-lign101" sound="horse.wav" />
      </Typography>
    );
  } else if (classLoading) {
    return (
      <Typography variant="h4" component="h1" gutterBottom>
        Loading...
      </Typography>
    );
  } else {
    return (
      <Typography variant="h4" component="h1" gutterBottom>
        Error...
      </Typography>
    );
  }
};

export default ClassPage;
