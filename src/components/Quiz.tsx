import React from "react";
import Typography from "@material-ui/core/Typography";
import { RouteComponentProps } from "react-router";
import { useManifest } from "../Manifest";

import normalize from "../normalize";

interface MatchParams {
  klass: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const Quiz = (props: Props) => {
  const { result, loading } = useManifest();
  if (result) {
    const { classes } = result;

    return (
      <Typography variant="h4" component="h1" gutterBottom>
        {normalize("tʃt͡ʃd͡ʒəɹɚa˞")} my class is{" "}
        {classes.find(({ folder }) => props.match.params.klass === folder)?.name}
      </Typography>
    );
  } else {
    return (
      <Typography variant="h4" component="h1" gutterBottom>
        Loading...
      </Typography>
    );
  }
};

export default Quiz;
