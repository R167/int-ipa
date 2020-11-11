import React from "react";
import { Box, Paper, Typography } from "@material-ui/core";

import Pulmonics from "./Pulmonics";
import { Clickable } from "./common";

// import BackspaceOutlinedIcon from "@material-ui/icons/BackspaceOutlined";

interface Props extends Clickable {}

const Keyboard = (props: Props) => {
  const { onClick } = props;

  return (
    <Box component={Paper} p={1} width="auto">
      <Typography variant="h6" component="p" gutterBottom>
        Consonants (Pulmonics)
      </Typography>
      <Pulmonics onClick={onClick} />
      <Typography variant="caption" align="center" component="p">
        Symbols to the right in a cell are voiced, to the left are voiceless. Shaded areas denote
        articulations judged impossible.
      </Typography>
    </Box>
  );
};

export default Keyboard;
