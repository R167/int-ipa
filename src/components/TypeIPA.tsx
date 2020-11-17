import React from "react";
import { Box, Grid, makeStyles } from "@material-ui/core";

import Keyboard from "./keyboard/Keyboard";

import useKeyboard from "./keyboard/useKeyboard";

import IPAInput from "./keyboard/IPAInput";

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
}));

const TypeIPA = () => {
  const { handleKeyboard, handleDelete, handleType, value, ref } = useKeyboard();
  const classes = useStyles();

  return (
    <div>
      <Box paddingY={2} className={classes.sticky}>
        <Grid container alignItems="center" justify="center" spacing={2}>
          <Grid item xs md={8} className={classes.search}>
            <IPAInput value={value} inputRef={ref} onType={handleType} onDelete={handleDelete} />
          </Grid>
        </Grid>
      </Box>
      <Keyboard onClick={handleKeyboard} />
    </div>
  );
};

export default TypeIPA;
