import React from "react";
import { Box, Grid, Paper, Typography } from "@material-ui/core";

import Pulmonics from "./Pulmonics";
import { Clickable } from "./common";
import NonPulmonics from "./NonPulmonics";
import Vowels from "./Vowels";

// import BackspaceOutlinedIcon from "@material-ui/icons/BackspaceOutlined";

interface Props extends Clickable {}

const Keyboard = (props: Props) => {
  const { onClick } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box component={Paper} p={1} width="auto">
          <Typography variant="h6" component="p" gutterBottom>
            Consonants (Pulmonics)
          </Typography>
          <Pulmonics onClick={onClick} />
          <Typography variant="caption" align="center" component="p">
            Symbols to the right in a cell are voiced, to the left are voiceless. Shaded areas
            denote articulations judged impossible.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} /*g={5}*/>
        <Box component={Paper} p={1} width="auto">
          <Typography variant="h6" component="p" gutterBottom>
            Consonants (Non-pulmonics)
          </Typography>
          <NonPulmonics onClick={onClick} />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box component={Paper} p={1} width="auto">
          <Vowels />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Keyboard;
