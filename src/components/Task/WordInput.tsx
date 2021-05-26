import { useCallback, useEffect, useMemo, useReducer } from "react";

import { makeStyles } from "@material-ui/core";

import useKeyboard from "../keyboard/useKeyboard";
import StickyIPA from "../keyboard/StickyIPA";

import { Word, matchSegment } from "../../utils/parsers/task";
import { useDebugContext } from "../../utils/Debug";

const ATTEMPTS_BEFORE_HINT = 5;

const useStyles = makeStyles((theme) => ({
  correct: {
    color: theme.palette.type === "dark" ? theme.palette.success.main : theme.palette.success.dark,
  },
}));

interface Props {
  word: Word;
  onSubmit: () => void;
}

enum Op {
  Reset,
  SoftReset,
  SetHeader,
  NextSegment,
  ErrorMessage,
  ClearError,
}

interface State {
  word: Word;
  segment: number;
  header: string;
  errorMessage?: string;
  error: boolean;
  attempt: number;
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
  | SetAction<Op.ErrorMessage, string | undefined>
  | Action<Op.ClearError>;

const reset = (word: Word) => {
  return {
    word,
    segment: 0,
    header: "",
    error: false,
    attempt: 0,
  };
};

const reducer = (state: State, action: Act): State => {
  switch (action.type) {
    case Op.SoftReset:
      return Object.is(action.value, state.word) ? state : reset(action.value);
    case Op.Reset:
      return reset(action.value);
    case Op.SetHeader:
      return { ...state, header: action.value };
    case Op.NextSegment: // Inc segment and add value to header
      return {
        ...state,
        segment: state.segment + 1,
        header: state.header + action.value,
        attempt: 0,
      };
    case Op.ClearError:
      return state.error ? { ...state, error: false } : state;
    case Op.ErrorMessage:
      const { attempt } = state;
      const { hint } = state.word.segments[state.segment];
      // if the user has failed too many times, display the hint instead of error message if it exists
      const errorMessage = attempt >= ATTEMPTS_BEFORE_HINT && hint ? hint : action.value;
      return { ...state, error: true, errorMessage, attempt: attempt + 1 };
  }
};

const WordInput = (props: Props) => {
  const classes = useStyles();
  const debug = useDebugContext();

  const { word, onSubmit: handleSubmit } = props;
  const { handleKeyboard, handleDelete, handleType, setValue, value, ref } = useKeyboard();
  const [state, dispatch] = useReducer(reducer, word, reset);

  useEffect(() => dispatch({ type: Op.SoftReset, value: word }), [word]);
  useEffect(() => dispatch({ type: Op.ClearError }), [value]);

  // Run validation logic. If the
  const handleCheck = useCallback(
    (currentValue: string) => {
      // Make life easier with debug mode
      if (debug && currentValue === "winston") {
        setValue("");
        dispatch({ type: Op.SetHeader, value: currentValue });
        handleSubmit();
        return;
      }

      // IDEA:  add an optional "accept_multiple" that will allow submission
      //        of multiple segments at once.
      const segment = word.segments[state.segment];
      const match = matchSegment(currentValue, segment);
      if (match.correct) {
        dispatch({ type: Op.NextSegment, value: currentValue });
        setValue(""); // Clear the text box
        if (segment.final) {
          handleSubmit();
        }
      } else {
        // If not a match, set the error text
        dispatch({ type: Op.ErrorMessage, value: match.message });
      }
    },
    [word, state.segment, setValue, handleSubmit, debug]
  );

  const { header, error, errorMessage } = state;

  const headerValue = useMemo(() => header && <span className={classes.correct}>{header}</span>, [
    header,
    classes.correct,
  ]);

  return (
    <StickyIPA
      placeholder={`Transcribe "${word.display}"`}
      value={value}
      onDelete={handleDelete}
      onType={handleType}
      inputRef={ref}
      onCheck={handleCheck}
      header={headerValue}
      error={error}
      helpText={errorMessage}
      headerTooltip="Correct!"
      handleKeyboard={handleKeyboard}
    />
  );
};

export default WordInput;
