import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAsync } from "react-async-hook";
import { Button, Grid, TextField, Tooltip, Typography } from "@material-ui/core";
import { computeHash } from "../../utils/validation";

import AssignmentIcon from "@material-ui/icons/Assignment";

interface Props {
  prompt?: string;
  salt?: string;
  debug?: boolean;
}

const DEFAULTS = {
  prompt: "Name",
  salt: "R167",
  debug: false,
} as const;

const SubmitCode = (props: Props) => {
  const { salt, debug, prompt } = { ...DEFAULTS, ...props };
  const [name, setName] = useState<string | undefined>();
  const [run, setRun] = useState(false);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>();
  const timer = useRef<number | undefined>();

  const { result } = useAsync(computeHash, [name, salt, run]);

  const displayValue = result ? result : name;

  const copyText = useCallback(() => {
    if (inputRef.current) {
      const e = inputRef.current;
      e.select();
      e.setSelectionRange(0, e.value.length);
      document.execCommand("copy");
      setOpen(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setOpen(false), 2000);
    }
  }, []);

  const button = run ? (
    <Button variant="contained" color="primary" onClick={copyText} startIcon={<AssignmentIcon />}>
      Copy
    </Button>
  ) : (
    <Button type="submit" variant="contained" color="primary">
      Submit
    </Button>
  );

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRun(true);
  }, []);

  useEffect(() => {
    if (run && result) {
      copyText();
    }
  }, [result, run, copyText]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Typography variant="h6" component="p" gutterBottom>
            Congratulations on finishing this assignment! Type your {prompt} below and hit submit to
            receive a unique code for completion.
          </Typography>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={<Typography variant="subtitle2">Copied code!</Typography>}
          >
            <TextField
              label={prompt}
              variant="filled"
              InputProps={{
                readOnly: !!result,
              }}
              inputRef={inputRef}
              fullWidth
              onChange={(e) => setName(e.target.value)}
              value={displayValue}
            />
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid item>{button}</Grid>
            {debug && (
              <Grid item>
                <Button variant="contained" color="primary" onClick={() => setRun(false)}>
                  Reset
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default SubmitCode;
