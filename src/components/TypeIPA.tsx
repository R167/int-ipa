import React, { useCallback, useState } from "react";
import { Box, Grid, IconButton, InputAdornment, TextField, makeStyles } from "@material-ui/core";

import Keyboard from "./keyboard/Keyboard";

import useKeyboard from "./keyboard/useKeyboard";

import BackspaceOutlinedIcon from "@material-ui/icons/BackspaceOutlined";

const useStyles = makeStyles((theme) => ({
  sticky: {
    zIndex: 10,
    position: "sticky",
    top: "-8px",
  },
  search: {
    backgroundColor: theme.palette.background.default,
    borderRadius: "8px",
  },
  label: {
    "&:not(.MuiInputLabel-shrink)": {
      fontSize: "1.5rem",
    },
  },
  input: {
    fontSize: "1.5rem",
    "&> fieldset > legend > span": {
      fontSize: "0.75rem",
    },
  },
}));

const TypeIPA = () => {
  const classes = useStyles();
  const { handleKeyboard, handleDelete, handleType, value, ref } = useKeyboard();

  // const [header, setHeader] = useState("");
  // const handleEnter = useCallback(
  //   (e) => {
  //     if (e.key === "Enter") {
  //       setHeader(header + value);
  //       setValue("");
  //     }
  //   },
  //   [header, value]
  // );

  return (
    <div>
      <Box paddingY={2} className={classes.sticky}>
        <Grid container alignItems="center" justify="center" spacing={2}>
          <Grid item xs md={8} className={classes.search}>
            <TextField
              InputLabelProps={{ className: classes.label }}
              id="ipa-typer"
              fullWidth
              inputRef={ref}
              value={value}
              onChange={handleType}
              variant="outlined"
              inputProps={{
                spellCheck: "false",
                autoCorrect: "false",
                style: { lineHeight: 2 },
              }}
              label="Type IPA"
              color="secondary"
              InputProps={{
                className: classes.input,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="delete" color="secondary" onClick={handleDelete}>
                      <BackspaceOutlinedIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                // This was initially just a test for making sure the concept works for the real form
                // startAdornment: header && (
                //   <InputAdornment
                //     disablePointerEvents
                //     disableTypography
                //     position="start"
                //     classes={{ positionStart: classes.noRightMargin }}
                //   >
                //     {header}
                //   </InputAdornment>
                // ),
              }}
              // onKeyPress={handleEnter}
            />
          </Grid>
        </Grid>
      </Box>
      <Keyboard onClick={handleKeyboard} />
    </div>
  );
};

export default TypeIPA;
