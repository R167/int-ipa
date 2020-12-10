import React, { useCallback, useState } from "react";

import { checkHash } from "../../utils/validation";
import { useAsync } from "react-async-hook";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  makeStyles,
} from "@material-ui/core";

import CorrectIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";

const computeHashes = async (hashes: string, salt: string) => {
  if (hashes) {
    const values = hashes.split(/[\s,]+/m).filter((el) => el.length > 0);
    return Promise.all(
      values.map(async (hash) => {
        return { ...(await checkHash(hash, salt)), hash };
      })
    );
  } else {
    return [];
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: `${theme.spacing(1)}px`,
  },
  correct: {
    color: theme.palette.success.main,
  },
  table: {
    marginBottom: `${theme.spacing(2)}px`,
  },
}));

const noAutoComplete = {
  spellCheck: "false",
  autoCorrect: "off",
  autoComplete: "off",
} as const;

const FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const Validator = () => {
  const classes = useStyles();
  const [names, setNames] = useState("");
  const [salt, setSalt] = useState("");
  const [display, setDisplay] = useState({ names, salt });
  const hashes = useAsync(computeHashes, [display.names, display.salt]);

  const handleText = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setNames(event.target.value),
    []
  );

  const hashList = hashes.result?.map(({ hash, message, name, date, correct }) => (
    <TableRow key={hash}>
      <TableCell>{name}</TableCell>
      <TableCell>{FORMATTER.format(date)}</TableCell>
      <TableCell>
        <Tooltip title={message}>
          {correct ? <CorrectIcon className={classes.correct} /> : <ErrorIcon color="error" />}
        </Tooltip>
      </TableCell>
    </TableRow>
  ));

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item md={6} sm={12}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
              label="Validation Names"
              variant="filled"
              multiline
              fullWidth
              inputProps={noAutoComplete}
              value={names}
              onChange={handleText}
            />
          </Grid>
          <Grid item lg={8} md={6} xs>
            <TextField
              label="Salt (optional)"
              variant="filled"
              fullWidth
              inputProps={noAutoComplete}
              value={salt}
              onChange={(e) => setSalt(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => setDisplay({ names, salt })}>
              Check
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs>
        <TableContainer component={Paper} className={classes.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Submit Time</TableCell>
                <TableCell>Valid</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{hashList}</TableBody>
          </Table>
        </TableContainer>
        <Typography variant="body1">
          Enter a list of submission codes and the salt used for the assignment. If you didn't set a
          salt, leave this blank.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Validator;
