import React, { RefObject, useCallback, useEffect, useReducer, useRef } from "react";
import { Box, Grid, IconButton, makeStyles, TextField } from "@material-ui/core";

import clsx from "clsx";

import Keyboard from "./keyboard/Keyboard";

import BackspaceOutlinedIcon from "@material-ui/icons/BackspaceOutlined";

interface Action<T> {
  type: T;
}

interface ValueAction<T> extends Action<T> {
  type: T;
  value: string;
}

type Actions = Action<"delete"> | ValueAction<"append"> | ValueAction<"set">;
interface State {
  cursor: number;
  value: string;
  ref: RefObject<HTMLInputElement>;
}

function reducer(state: State, action: Actions): State {
  const { value } = state;
  // make broad assumptions about never having a large cursor selection
  const cursor = state.ref?.current?.selectionStart || 0;
  switch (action.type) {
    case "delete":
      if (cursor === 0) {
        return state;
      } else {
        return {
          ...state,
          cursor: cursor - 1,
          value: value.slice(0, cursor - 1) + value.slice(cursor, value.length),
        };
      }
    case "append":
      return {
        ...state,
        cursor: cursor + action.value.length,
        value: value.slice(0, cursor) + action.value + value.slice(cursor, value.length),
      };
    case "set":
      return { ...state, value: action.value };
  }
}

const useStyles = makeStyles((theme) => ({
  sticky: {
    position: "sticky",
    top: "-8px",
  },
  search: {
    backgroundColor: theme.palette.background.default,
    borderRadius: "8px",
  },
  deleteKey: {
    borderTopLeftRadius: "2px",
    borderBottomLeftRadius: "2px",
  },
}));

const TypeIPA = () => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer(reducer, { cursor: 0, value: "", ref: inputRef });
  const keyboardClick = useCallback((char: string) => dispatch({ type: "append", value: char }), [
    dispatch,
  ]);
  const setValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: "set", value: e.target.value }),
    [dispatch]
  );
  const deleteClick = useCallback(() => dispatch({ type: "delete" }), [dispatch]);

  const { cursor } = state;

  // minor side effect: the textbox is auto selected on page load which is kinda alright
  useEffect(() => {
    inputRef?.current?.setSelectionRange(cursor, cursor);
  }, [cursor]);

  return (
    <div>
      <Box paddingY={2} className={classes.sticky}>
        <Grid container alignItems="center" justify="center" spacing={2}>
          <Grid item xs md={8} className={classes.search}>
            <TextField
              id="filled-multiline-flexible"
              fullWidth
              rowsMax={4}
              inputRef={inputRef}
              value={state.value}
              onChange={setValue}
              variant="outlined"
              inputProps={{ spellCheck: "false", style: { lineHeight: "3" } }}
              label="Type IPA"
              color="secondary"
            />
          </Grid>
          <Grid item className={clsx(classes.search, classes.deleteKey)}>
            <IconButton aria-label="delete" color="secondary" onClick={deleteClick}>
              <BackspaceOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Keyboard onClick={keyboardClick} />
    </div>
  );
};

export default TypeIPA;
