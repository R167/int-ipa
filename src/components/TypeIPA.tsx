import React from "react";
import { Box, Grid, IconButton, InputAdornment, TextField, makeStyles } from "@material-ui/core";

import Keyboard from "./keyboard/Keyboard";

import useKeyboard from "./keyboard/useKeyboard";

import BackspaceOutlinedIcon from "@material-ui/icons/BackspaceOutlined";

const useStyles = makeStyles((theme) => ({
  sticky: {
    position: "sticky",
    top: "-8px",
  },
  search: {
    backgroundColor: theme.palette.background.default,
    borderRadius: "8px",
  },
}));

const TypeIPA = () => {
  const classes = useStyles();
  const { handleKeyboard, handleDelete, setValue, value, ref } = useKeyboard();

  return (
    <div>
      <Box paddingY={2} className={classes.sticky}>
        <Grid container alignItems="center" justify="center" spacing={2}>
          <Grid item xs md={8} className={classes.search}>
            <TextField
              id="filled-multiline-flexible"
              fullWidth
              inputRef={ref}
              value={value}
              onChange={setValue}
              variant="outlined"
              inputProps={{ spellCheck: "false", style: { lineHeight: "3" } }}
              label="Type IPA"
              color="secondary"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="delete" color="secondary" onClick={handleDelete}>
                      <BackspaceOutlinedIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Keyboard onClick={handleKeyboard} />
    </div>
  );
};

export default TypeIPA;
