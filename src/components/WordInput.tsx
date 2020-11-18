import { Box, Grid, makeStyles } from "@material-ui/core";
import React, { useCallback, useEffect, useReducer } from "react";
import useMount from "../utils/useMount";
import IPAInput from "./keyboard/IPAInput";
import Keyboard from "./keyboard/Keyboard";
import useKeyboard from "./keyboard/useKeyboard";

import escapeStringRegexp from "escape-string-regexp";

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

type Explanations = Map<string, string>;
type Wildcard = [string, string];

interface WordSegment {
  correct: string[];
  explanations: Explanations;
  wildcards?: Wildcard[];
}

interface Word {
  display: string;
  audio?: string;
  segments: WordSegment[];
}

interface Props {
  word: Word;
}

enum Op {
  Reset,
  SoftReset,
  SetHeader,
  NextSegment,
  ClearError,
}

interface State {
  word: Word;
  segment: number;
  header: string;
  error: boolean;
}

interface Action<T> {
  type: T;
}

interface SetAction<T, V> extends Action<T> {
  value: V;
}

type Act =
  | SetAction<Op.Reset, Word>
  | SetAction<Op.SoftReset, Word>
  | SetAction<Op.SetHeader, string>
  | SetAction<Op.NextSegment, string>
  | Action<Op.ClearError>;

const reset = (word: Word) => {
  return {
    word,
    segment: 0,
    header: "",
    error: false,
  };
};

const reducer = (state: State, action: Act): State => {
  switch (action.type) {
    case Op.SoftReset:
      if (Object.is(action.value, state.word)) {
        return state;
      } else {
        return reset(action.value);
      }
    case Op.Reset:
      return reset(action.value);
    case Op.SetHeader:
      return { ...state, header: action.value };
    case Op.NextSegment: // Inc segment and add value to header
      return { ...state, segment: state.segment + 1, header: state.header + action.value };
    case Op.ClearError:
      return { ...state, error: false };
  }
};

interface SegmentMatch {
  correct: boolean;
  message?: string;
}

const DEFAULT_MESSAGE = "Whoops, that's not right. Try again!";
const REGEX_REPLACE = escapeStringRegexp("...");

const wildcardToRegex = (wildcard: string) => {
  const str = escapeStringRegexp(wildcard);
  return new RegExp(`^${str.replaceAll(REGEX_REPLACE, ".*")}$`, "u");
};

/**
 * Attempt to match a word segment
 * @param input The user inputted value to check
 * @param segment The word segment we are matching
 */
const matchSegment = (input: string, segment?: WordSegment): SegmentMatch => {
  if (!segment) {
    return { correct: false, message: DEFAULT_MESSAGE };
  }

  let message: string | undefined;
  if (segment.correct.includes(input)) {
    return { correct: true };
  } else if ((message = segment.explanations.get(input))) {
    return { correct: false, message: message };
  } else if (segment.wildcards) {
    // Do the wildcard lookup :(
    const match = segment.wildcards.find(([wildcard, message]) => {
      return wildcardToRegex(wildcard).test(message);
    });
    if (match) {
      return { correct: false, message: match[1] };
    }
  }

  return { correct: false, message: DEFAULT_MESSAGE };
};

const WordInput = (props: Props) => {
  const isMount = useMount();
  const classes = useStyles();

  const { word } = props;
  const { handleKeyboard, handleDelete, handleType, setValue, value, ref } = useKeyboard();
  const [state, dispatch] = useReducer(reducer, word, reset);

  useEffect(() => dispatch({ type: Op.SoftReset, value: word }), [word]);

  // Run validation logic. If the
  const handleCheck = useCallback(
    (currentValue: string) => {
      const segment = word.segments[state.segment];
      const match = matchSegment(currentValue, segment);
      dispatch({ type: Op.NextSegment, value: currentValue });
      setValue(""); // Clear the text box
    },
    [word, state.segment, setValue]
  );

  const { header } = state;

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

export default WordInput;
