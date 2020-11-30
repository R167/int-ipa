import React from "react";

import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  codeBlock: {
    fontSize: "1rem",
    padding: `${theme.spacing(1)}px`,
  },
  inline: {
    padding: theme.spacing(0.25, 0.5),
    "pre &": {
      padding: 0,
      boxShadow: "none",
      borderRadius: 0,
    },
  },
}));

interface Props {
  block?: boolean;
  children: React.ReactNode;
}

const CodeBlock = (props: Props) => {
  const classes = useStyles();
  const { block, children } = props;

  const comp = block ? "pre" : "code";
  const klass = block ? classes.codeBlock : classes.inline;

  return (
    <Paper className={klass} component={comp}>
      {children}
    </Paper>
  );
};

export default React.memo(CodeBlock);
