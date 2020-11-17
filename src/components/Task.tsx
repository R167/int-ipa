import { Box, Grid, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import IPAInput from "./keyboard/IPAInput";
import Keyboard from "./keyboard/Keyboard";
import useKeyboard from "./keyboard/useKeyboard";

const useStyles = makeStyles((theme) => ({
  sticky: {
    zIndex: 10,
    position: "sticky",
    top: `${theme.spacing(-1)}px`,
  },
  search: {
    backgroundColor: theme.palette.background.default,
    borderRadius: "8px",
  },
  correct: {
    color: theme.palette.success.dark,
  },
}));

interface Props {
  taskFile: string;
}

const Task = (props: Props) => {
  const { taskFile } = props;
  const { handleKeyboard, handleDelete, handleType, setValue, value, ref } = useKeyboard();
  const classes = useStyles();

  const [header, setHeader] = useState("");

  const handleCheck = () => {
    setHeader((lastHeader) => lastHeader + value);
    setValue("");
  };

  const headerValue = header && <span className={classes.correct}>{header}</span>;

  return (
    <div>
      <Box paddingY={2} className={classes.sticky}>
        <Grid container alignItems="center" justify="center" spacing={2}>
          <Grid item xs md={8} className={classes.search}>
            <IPAInput
              value={value}
              onDelete={handleDelete}
              onType={handleType}
              inputRef={ref}
              onCheck={handleCheck}
              header={headerValue}
            />
          </Grid>
        </Grid>
      </Box>

      <Keyboard onClick={handleKeyboard} />
    </div>
  );
};

export default Task;
