import { useCallback, useEffect, useMemo } from "react";

import { makeStyles } from "@material-ui/core";

import useKeyboard from "../keyboard/useKeyboard";
import StickyIPA from "../keyboard/StickyIPA";

import { Word, matchSegment, KeyboardDef } from "../../utils/parsers/task";
import { useDebugContext } from "../../utils/Debug";
import { Op, useWordInput } from "./useWordInput";

const useStyles = makeStyles((theme) => ({
  correct: {
    color: theme.palette.type === "dark" ? theme.palette.success.main : theme.palette.success.dark,
  },
}));

interface Props {
  word: Word;
  onSubmit: () => void;
  keys?: KeyboardDef;
}

const WordInput = (props: Props) => {
  const classes = useStyles();
  const debug = useDebugContext();

  const { word, onSubmit: handleSubmit, keys } = props;
  const { handleKeyboard, handleDelete, handleType, setValue, value, ref } = useKeyboard();
  const [state, dispatch] = useWordInput(word);

  useEffect(() => dispatch({ type: Op.SoftReset, value: word }), [word, dispatch]);
  useEffect(() => dispatch({ type: Op.ClearError }), [value, dispatch]);

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
    [word, state.segment, setValue, handleSubmit, debug, dispatch]
  );

  const { header, error, errorMessage } = state;

  const headerValue = useMemo(
    () => header && <span className={classes.correct}>{header}</span>,
    [header, classes.correct]
  );

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
      keys={keys}
    />
  );
};

export default WordInput;
