import { memo, useCallback, useEffect, useReducer, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Grid,
  IconButton,
  ListSubheader,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { useDebugContext } from "../../utils/Debug";
import { TaskDef } from "../../utils/parsers/task";

import SubmitCode from "./SubmitCode";
import WordInput from "./WordInput";
import ConfirmDialog from "../ConfirmDialog";
import { usePersistentState } from "../../utils/usePersistentState";
import PlayButton from "./PlayButton";

import Markdown from "../Markdown";

interface TaskProps {
  baseUrl: string;
  task: TaskDef;
  noPersist?: boolean;
}

enum Op {
  FullReset,
  ShowReset,
  WordReset,
  CloseReset,
  DismissModal,
  Submit,
  ModalExit,
}

interface State {
  modalWord: number;
  currWord: number;
  showModal: boolean;
  resetModal: boolean;
  inputKey: string;
}

const reducer = (state: State, action: Op): State => {
  const { currWord } = state;
  switch (action) {
    case Op.DismissModal:
      return { ...state, showModal: false, currWord: currWord + 1 };
    case Op.Submit:
      return { ...state, showModal: true, modalWord: currWord + 1 };
    case Op.ModalExit:
      // Callback unused, but still here.
      return state;
    case Op.ShowReset:
      return { ...state, resetModal: true };
    case Op.CloseReset:
      return { ...state, resetModal: false };
    case Op.WordReset:
      return { ...state, inputKey: Math.random().toString(36) };
    case Op.FullReset:
      // Reset back to start
      return {
        modalWord: 0,
        currWord: 0,
        showModal: false,
        resetModal: false,
        inputKey: Math.random().toString(36), // Force the keyboard input to reload. avoids page refresh
      };
  }
};

const useDispatch = <T,>(dispatch: React.Dispatch<T>, op: T) =>
  useCallback(() => dispatch(op), [op, dispatch]);

const Task = (props: TaskProps) => {
  const { task, baseUrl, noPersist } = props;
  const { title, words, instructions } = task;

  const persistKey = noPersist ? null : `persist-${baseUrl}`;

  const [persist, setPersist] = usePersistentState(persistKey, { word: 0, name: "" });

  const [{ currWord, modalWord, showModal, resetModal, ...rest }, dispatch] = useReducer(reducer, {
    modalWord: persist.word, // Modal needs to lag behind a word because of exit button
    currWord: persist.word,
    showModal: false,
    resetModal: false,
    inputKey: "original", // This is a hacky way to force the inputWord to refresh on reset
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const debug = useDebugContext();
  const showWord = currWord < words.length;

  const word = showWord ? words[currWord] : words[words.length - 1];

  const handleSubmit = useDispatch(dispatch, Op.Submit);
  const dismissModal = useDispatch(dispatch, Op.DismissModal);
  const handleModalExit = useDispatch(dispatch, Op.ModalExit);
  const resetWord = useCallback(() => {
    setAnchorEl(null);
    dispatch(Op.WordReset);
  }, []);
  const handleShowReset = useCallback(() => {
    setAnchorEl(null);
    dispatch(Op.ShowReset);
  }, []);
  const handleReset = useCallback((reset: boolean) => {
    dispatch(reset ? Op.FullReset : Op.CloseReset);
  }, []);

  const handleClickMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMore = () => {
    setAnchorEl(null);
  };

  // Scroll back to top at start of each word
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
    setPersist((s) => {
      // Make sure name is cleared when we reset
      const name = modalWord === 0 ? "" : s.name;
      return { name, word: modalWord };
    });
  }, [modalWord, setPersist]);

  const controls = (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClickMore}
        title="More options"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        TransitionComponent={Fade}
        onClose={handleCloseMore}
        MenuListProps={{ subheader: <ListSubheader>Options</ListSubheader> }}
      >
        <MenuItem onClick={handleShowReset}>Reset assignment</MenuItem>
        <MenuItem onClick={resetWord}>Reset transcription</MenuItem>
      </Menu>
    </>
  );

  const wordInstructions = word.instructions && (
    <Grid container justify="center" spacing={2}>
      <Grid item xs md={8}>
        <Markdown children={word.instructions} />
      </Grid>
    </Grid>
  );

  return (
    <div>
      <Typography variant="h3" component="h2" gutterBottom align="center">
        {title}
      </Typography>

      <Collapse in={showWord}>
        <Box mb={2}>
          <Markdown children={instructions || ""} baseUrl={baseUrl} />
        </Box>
        <Grid container spacing={1} justify="center" alignItems="center">
          <Grid item>
            <Typography variant="h4" component="p" align="center">
              {Math.min(currWord + 1, words.length)}/{words.length}: Transcribe "{word.display}"
            </Typography>
          </Grid>
          <Grid item>
            <PlayButton file={word.audio} baseUrl={baseUrl} />
          </Grid>
          <Grid item>{controls}</Grid>
        </Grid>

        {wordInstructions}

        {/* Setting key here lets us force clear the nested state when we need to */}
        <WordInput word={word} onSubmit={handleSubmit} key={rest.inputKey} />
      </Collapse>

      {/* Finish splash screen. The mount/unmount are required for persist to work correctly */}
      <Collapse in={!showWord} mountOnEnter unmountOnExit>
        <SubmitCode
          salt={task.salt}
          debug={debug}
          onSubmit={(name) => setPersist((s) => ({ ...s, name: name }))}
          name={persist.name}
          controls={controls}
        />
      </Collapse>

      <NextWord
        show={showModal}
        dismiss={dismissModal}
        onExited={handleModalExit}
        action={modalWord < words.length ? "Next word" : "Finish"}
      />
      <ConfirmDialog
        open={resetModal}
        onClose={handleReset}
        title="Reset Assignment"
        body="Are you sure you want to reset all progress on this assignment?"
      />
    </div>
  );
};

interface NextWordProps {
  show: boolean;
  dismiss: () => void;
  onExited: () => void;
  action: string;
}
const NextWord = memo(function NextWord(props: NextWordProps) {
  return (
    <Dialog
      open={props.show}
      onClose={props.dismiss}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onExited={props.onExited}
    >
      <DialogTitle id="alert-dialog-title">Congrats! You got it correct</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You did a good job of getting the word correct!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.dismiss}
          variant="contained"
          color="primary"
          disabled={!props.show}
          autoFocus
          disableFocusRipple
        >
          {props.action}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default memo(Task);
