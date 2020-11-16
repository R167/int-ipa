import React from "react";
import { Box, Grid, makeStyles, Paper, Typography } from "@material-ui/core";

import Pulmonics from "./Pulmonics";
import { Clickable } from "./common";
import NonPulmonics from "./NonPulmonics";
import Vowels from "./Vowels";

// import BackspaceOutlinedIcon from "@material-ui/icons/BackspaceOutlined";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    height: "100%",
  },
}));

interface Props extends Clickable {}

const Keyboard = (props: Props) => {
  const classes = useStyles();
  const { onClick } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h6" component="p" gutterBottom>
            Consonants (Pulmonics)
          </Typography>
          <Pulmonics onClick={onClick} />
          <Typography variant="caption" align="center" component="p">
            Symbols to the right in a cell are voiced, to the left are voiceless. Shaded areas
            denote articulations judged impossible.
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <Typography variant="h6" component="p" gutterBottom>
            Consonants (Non-pulmonics)
          </Typography>
          <NonPulmonics onClick={onClick} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <Vowels onClick={onClick} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Keyboard;
