import {
  Box,
  Chip,
  Grid,
  Paper,
  TextField,
  Theme,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { DragEventHandler, useState } from "react";
import Keyboard from "../keyboard/Keyboard";
import { PulmonicDescriptions } from "../../utils/ipaDescription";

const Matcher = () => {
  const [files, setFiles] = useState<string[]>([]);

  return <FileDrop files={files} setFiles={setFiles} />;
};

const preventDefault: DragEventHandler<HTMLElement> = (e) => e.preventDefault();

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

interface FileDropProps {
  files: string[];
  setFiles: (updater: (old: string[]) => string[]) => void;
}
const FileDrop = ({ files, setFiles }: FileDropProps) => {
  const classes = useStyles();
  const [names, setNames] = useState("");
  const [filter, setFilter] = useState("");

  const handleDelete = (key: string) => () => {
    setFiles((files) => files.filter((name) => name !== key));
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Box
          p={2}
          component={Paper}
          // onDrop={callback}
          // onDragOver={preventDefault}
        >
          <TextField
            multiline
            rows={6}
            rowsMax={15}
            fullWidth
            label="Filter"
            variant="outlined"
            value={names}
            onChange={(e) => setNames(e.target.value)}
          />
        </Box>
      </Grid>
      <Grid item hidden={files.length === 0}>
        <Box p={2} component={Paper}>
          <TextField
            multiline
            rowsMax={15}
            fullWidth
            label="Filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </Box>
      </Grid>
      <Grid item hidden={files.length === 0}>
        <Box
          p={2}
          component={Paper}
          justifyContent="center"
          flexWrap="wrap"
          display="flex"
          className={classes.root}
        >
          {files
            .filter((name) => name.includes(filter))
            .map((name) => (
              <Chip size="small" label={name} onDelete={handleDelete(name)} key={name} />
            ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Matcher;
