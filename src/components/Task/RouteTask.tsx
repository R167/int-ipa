import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fileUrl } from "../../constants";
import LoadTask from "./LoadTask";

import { decode, encode } from "js-base64";

import { Link } from "react-router-dom";
import { Button, Grid, InputAdornment, TextField, Typography } from "@material-ui/core";
import { SHORT_DOMAIN } from "../../config";

const RouteTask = () => {
  const { klass, assignment } = useParams<{ klass: string; assignment: string }>();
  return <LoadTask taskFileUrl={fileUrl(klass, `${assignment}.yaml`)} />;
};

export const RouteRemoteTask = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const config = params.get("config");

  if (config) {
    const url = decode(config);
    const target = url.includes("://") ? url : `https://${url}`;

    return <LoadTask taskFileUrl={target} />;
  } else {
    return <BuildTaskLink />;
  }
};

const BuildTaskLink = () => {
  const [url, setUrl] = useState("");
  const params = new URLSearchParams({ config: encode(url, true) }).toString();

  const base = new URL(window.location.href);
  if (SHORT_DOMAIN) {
    base.hostname = SHORT_DOMAIN;
  }
  const resultUrl = `${base}?${params}`;

  return (
    <Grid container spacing={2} alignItems="center" justify="center">
      <Grid item xs={12} sm md={8}>
        <Typography variant="h6" component="p" gutterBottom>
          Enter the URL of a task file below.
        </Typography>
        <TextField
          label="Resource"
          variant="filled"
          fullWidth
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  color="primary"
                  variant="contained"
                  component={Link}
                  to={{ search: params }}
                >
                  Go!
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" align="center">
          {resultUrl}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default RouteTask;
