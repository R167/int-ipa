import React, { useCallback, useEffect, useMemo, useReducer } from "react";
import AudioContext from "../../utils/AudioContext";

import { TaskDef } from "../../utils/parsers/task";
import {
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import WordInput from "./WordInput";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import { useDebugContext } from "../../utils/Debug";
import SubmitCode from "./SubmitCode";

interface TaskProps {
  baseUrl: string;
  task: TaskDef;
}

enum Op {
  DismissModal,
  Submit,
  ModalExit,
}

interface State {
  modalWord: number;
  currWord: number;
  wordCount: number;
  showModal: boolean;
  showWord: boolean;
}

const reducer = (state: State, action: Op): State => {
  const { currWord, wordCount } = state;
  switch (action) {
    case Op.DismissModal:
      const nextWord = currWord + 1;
      if (nextWord < wordCount) {
        return { ...state, showModal: false, currWord: currWord + 1 };
      } else {
        return { ...state, showModal: false, showWord: false };
      }
    case Op.Submit:
      return { ...state, showModal: true };
    case Op.ModalExit:
      // Modal text needs to be delayed by one
      return { ...state, modalWord: currWord };
  }
};

const useDispatch = <T,>(dispatch: React.Dispatch<T>, op: T) =>
  useCallback(() => dispatch(op), [op, dispatch]);

const Task = React.memo((props: TaskProps) => {
  const { task, baseUrl } = props;
  const { title, words, instructions } = task;

  const [{ currWord, modalWord, showModal, showWord }, dispatch] = useReducer(reducer, {
    modalWord: 0,
    currWord: 0,
    wordCount: words.length,
    showModal: false,
    showWord: true,
  });

  const debug = useDebugContext();
  const word = words[currWord];

  const handleSubmit = useDispatch(dispatch, Op.Submit);
  const dismissModal = useDispatch(dispatch, Op.DismissModal);
  const handleModalExit = useDispatch(dispatch, Op.ModalExit);

  const lastWord = words.length - 1;

  useEffect(() => {
    const create = () => {
      document.removeEventListener("click", create);
      new AudioContext({
        latencyHint: "interactive",
      });
    };
    document.addEventListener("click", create);
  }, []);

  const audioFile = useMemo(() => {
    if (word.audio) {
      const audioUrl = new URL(word.audio, baseUrl).toString();
      const element = new Audio(audioUrl);
      return element;
    }
  }, [word.audio, baseUrl]);

  const playAudio = useCallback(() => {
    if (audioFile) {
      try {
        audioFile.currentTime = 0;
        audioFile.play();
      } catch {
        console.error({ message: "unable to play url", src: audioFile.src });
      }
    }
  }, [audioFile]);

  return (
    <div>
      <Typography variant="h3" component="h2" gutterBottom align="center">
        {title}
      </Typography>

      <Collapse in={showWord}>
        <Typography variant="body1" gutterBottom>
          {instructions}
        </Typography>
        <Typography variant="h4" component="p" align="center">
          {currWord + 1}/{words.length}: Transcribe "{word.display}"{" "}
          <Button
            variant="contained"
            color="secondary"
            startIcon={<PlayCircleFilledIcon />}
            onClick={playAudio}
            disabled={!audioFile}
          >
            Play
          </Button>
        </Typography>
        <WordInput word={word} onSubmit={handleSubmit} />
      </Collapse>
      <Collapse in={!showWord}>
        <SubmitCode salt={task.salt} debug={debug} />
      </Collapse>

      <Dialog
        open={showModal}
        onClose={dismissModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableRestoreFocus={!debug}
        onExited={handleModalExit}
      >
        <DialogTitle id="alert-dialog-title">Congrats! You got it correct</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You did a good job of getting the word correct!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={dismissModal}
            variant="contained"
            color="primary"
            disabled={!showModal}
            autoFocus
            disableFocusRipple
          >
            {modalWord < lastWord ? "Next word" : "Finish"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default Task;
