import { memo } from "react";
import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";

import Pulmonics from "./Pulmonics";
import { Clickable } from "./common";
import NonPulmonics from "./NonPulmonics";
import Vowels from "./Vowels";
import Diacritics from "./Diacritics";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import Other from "./Other";
import Suprasegmentals from "./Suprasegmentals";

// import BackspaceOutlinedIcon from "@material-ui/icons/BackspaceOutlined";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    height: "100%",
  },
  childOrder: {
    // Allow reordering the children of this element.
    // This has the additional benefit of allowing an "IPA" setting
    // On larger screens, show "other" left of "vowels"
    [theme.breakpoints.up("md")]: orderChildren(1, 3, 2),
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
    // 1
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
      {/* 2 */}
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <Vowels onClick={onClick} />
        </Paper>
      </Grid>
      {/* 3 */}
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <Typography variant="h6" component="p" gutterBottom>
            Other
          </Typography>
          <Other onClick={onClick} />
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

      <Grid item xs={12} md={4}>
        <Paper className={classes.paper}>
          <Typography variant="h6" component="p" gutterBottom>
            Suprasegmentals
          </Typography>
          <Suprasegmentals onClick={onClick} />
        </Paper>
      </Grid>

      {/* Ugh... non-pulmonics are the worst... */}
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <Typography variant="h6" component="p" gutterBottom>
            Consonants (Non-pulmonics)
          </Typography>
          <NonPulmonics onClick={onClick} />
        </Paper>
      </Grid>

      {/* Placeholder for adding phonology symbols? */}
      <Grid item xs={12} md={6} hidden>
        <Paper className={classes.paper}>
          <Typography variant="h6" component="p" gutterBottom>
            Common non-IPA symbols
          </Typography>
          <Typography>Coming soon...</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default memo(Keyboard);
