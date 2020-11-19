import React from "react";
import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";

import Pulmonics from "./Pulmonics";
import { Clickable } from "./common";
import NonPulmonics from "./NonPulmonics";
import Vowels from "./Vowels";
import Diacritics from "./Diacritics";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

// import BackspaceOutlinedIcon from "@material-ui/icons/BackspaceOutlined";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    height: "100%",
  },
  childOrder: {
    // Allow reordering the children of this element.
    // This has the additional benefit of allowing an "IPA" setting
    ...orderChildren(1, 3, 2, 4),
    [theme.breakpoints.up("lg")]: orderChildren(1, 2, 3, 4),
  },
}));

const orderChildren = (...children: number[]) => {
  let styles: CSSProperties = { "& > *": { order: 100 } };
  children.forEach((child, i) => {
    styles[`& > :nth-child(${i + 1})`] = { order: child };
  });
  return styles;
};

interface Props extends Clickable {}

/**
 * Accepts an onClick option. This is assumed to be memoized.
 */
const Keyboard = (props: Props) => {
  const classes = useStyles();
  const { onClick } = props;

  return (
    <Grid container spacing={2} className={classes.childOrder}>
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
      <Grid item xs={12} md={8}>
        <Paper className={classes.paper}>
          <Typography variant="h6" component="p" gutterBottom>
            Diacritics
          </Typography>
          <Diacritics onClick={onClick} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default React.memo(Keyboard);
