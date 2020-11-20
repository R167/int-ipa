import React, { useCallback, useMemo, useState } from "react";
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
import WordInput from "../WordInput";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

interface TaskProps {
  baseUrl: string;
  task: TaskDef;
}

const Task = React.memo((props: TaskProps) => {
  const { task, baseUrl } = props;
  const [currWord, setCurrWord] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showWord, setShowWord] = useState(true);

  const { title, words, instructions } = task;
  const word = words[currWord];

  const handleSubmit = useCallback(() => {
    setShowModal(true);
  }, []);

  const lastWord = task.words.length - 1;

  const dismissModal = useCallback(() => {
    if (currWord === lastWord) {
      // Display the new stuff
      setShowWord(false);
    } else {
      setCurrWord((prev) => prev + 1);
    }
    setShowModal(false);
  }, [currWord, lastWord]);

  const audioContext = useMemo(
    () =>
      new AudioContext({
        latencyHint: "interactive",
      }),
    []
  );

  const audioFile = useMemo(() => {
    if (word.audio) {
      const audioUrl = new URL(word.audio, baseUrl).toString();
      const element = new Audio(audioUrl);
      const track = audioContext.createMediaElementSource(element);
      track.connect(audioContext.destination);
      return element;
    }
  }, [word.audio, audioContext]);

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

  /**
   * Cases:
   * if classTasks.result : Good
   * while loading class && manifest: Class name
   * while loading manifest: Loading...
   * if (classTasks.error) : "cannot load class X"
   *
   */

  const dismissText = currWord < lastWord ? "Next word" : "Finish";

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
          Transcribe "{word.display}"{" "}
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
      {showWord || (
        <>
          <Typography variant="h3" component="h3" gutterBottom align="center">
            You're done!
          </Typography>
        </>
      )}

      <Dialog
        open={showModal}
        onClose={dismissModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableRestoreFocus
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
            autoFocus
            disableFocusRipple
          >
            {dismissText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default Task;
