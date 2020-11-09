import React from "react";
import { Box, Paper, Typography } from "@material-ui/core";

import Pulmonics from "./Pulmonics";
import { Clickable } from "./common";

interface Props extends Clickable {}

const Keyboard = (props: Props) => {
  const { onClick } = props;

  return (
    <Box component={Paper} p={1} width="auto">
      <Typography variant="h6" component="p" gutterBottom>
        Consonants (Pulmonics)
      </Typography>
      <Pulmonics onClick={onClick} />
    </Box>
  );
};

export default Keyboard;
