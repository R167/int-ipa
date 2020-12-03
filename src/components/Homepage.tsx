import { Box, Link, Typography } from "@material-ui/core";
import React from "react";
import { Link as RLink } from "react-router-dom";

const Homepage = () => {
  return (
    <Box paddingY={2}>
      <Typography align="center" variant="h3" component="h1" gutterBottom>
        Welcome to Int IPA
      </Typography>
      <Typography variant="h5" component="p">
        This is just some place holder text right now. I'm not really sure what you want on this
        page. One possible option is a self description, etc. I don't really know. Here's a link to
        the{" "}
        <Link component={RLink} to="/keyboard" color="primary">
          the IPA keyboard
        </Link>
        .
      </Typography>
    </Box>
  );
};

export default Homepage;
