import { Box, Grid, Typography } from "@material-ui/core";
import Markdown from "./Markdown";
import { useManifest } from "../Manifest";

const Homepage = () => {
  const { result, loading } = useManifest();

  if (result) {
    const { title, body } = result.homepage;
    return (
      <Box paddingY={2}>
        <Typography align="center" variant="h3" component="h2" gutterBottom>
          {title}
        </Typography>
        <Grid container justify="center">
          <Grid item xs md={10} lg={8}>
            <Markdown children={body} paragraph="h5" />
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return (
      <Typography variant="h3" align="center">
        {loading ? "Loading" : "Error"}
      </Typography>
    );
  }
};

export default Homepage;
