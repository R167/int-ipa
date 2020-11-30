import React from "react";

import clsx from "clsx";

import CodeBlock from "./CodeBlock";
import { IPAError, isContextError } from "../utils/error";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fileDump: {
    fontSize: theme.typography.h6.fontSize,
    lineHeight: 1.3,
  },
  line: {
    "&::before": {
      content: 'attr(data-line) "| "',
    },
  },
  errorLine: {
    color: theme.palette.error.main,
  },
}));

interface Props {
  error: IPAError | Error;
  context?: number;
  defaultHeader?: string;
}

const ErrorMessage = (props: Props) => {
  const classes = useStyles();

  const { defaultHeader, error, context = 2 } = props;

  console.error(error);

  if (isContextError(error)) {
    const issue = error.context(context);
    return (
      <div>
        <Typography variant="h3" component="p" gutterBottom>
          {error.headline}
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          {error.message}
        </Typography>
        <CodeBlock block children={error.message} />
        <CodeBlock block>
          <code className={classes.fileDump}>
            {issue.map(({ num, contents, error }) => (
              <span
                className={clsx(classes.line, error && classes.errorLine)}
                key={num}
                data-line={num.toString().padStart(3, "0")}
              >
                {contents}
                {"\n"}
              </span>
            ))}
          </code>
        </CodeBlock>
      </div>
    );
  } else {
    return (
      <>
        <Typography variant="h3" component="p" gutterBottom>
          {defaultHeader}
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          {error.message}
        </Typography>
      </>
    );
  }
};

export default ErrorMessage;
