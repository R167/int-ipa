import { IconButton, InputAdornment, TextField, makeStyles } from "@material-ui/core";
import React, { KeyboardEvent, RefObject, useCallback } from "react";
import BackspaceOutlinedIcon from "@material-ui/icons/BackspaceOutlined";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles((theme) => ({
  label: {
    "&:not(.MuiInputLabel-shrink)": {
      fontSize: "1.5rem",
    },
  },
  input: {
    fontSize: "1.5rem",
    "&> fieldset > legend > span": {
      fontSize: "0.75rem",
    },
  },
  noRightMargin: {
    marginRight: 0,
  },
}));

interface Props {
  inputRef: RefObject<HTMLInputElement>;
  value: string;
  onType: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  // optional header stuff
  header?: React.ReactNode;
  onCheck?: (val: string) => void;
  checkDescription?: string;

  error?: boolean;
  helpText?: string;
}

const IPAInput = (props: Props) => {
  const classes = useStyles();
  const {
    value,
    onType,
    onDelete,
    inputRef,
    header,
    onCheck,
    checkDescription,
    error,
    helpText,
  } = props;

  // This should be fine (famous last words...)
  const handleSubmit = useCallback(() => {
    onCheck && onCheck(inputRef.current?.value || "");
  }, [onCheck]);

  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const check = onCheck && (
    <IconButton
      aria-label="check"
      color="secondary"
      title={checkDescription || "Validate input"}
      onClick={handleSubmit}
    >
      <CheckIcon />
    </IconButton>
  );

  // TODO: refactor so this uses the individual components rather than just TextField
  //       honestly, it's starting to get pretty unwieldy and then I can have more control

  return (
    <TextField
      InputLabelProps={{ className: classes.label }}
      id="ipa-typer"
      fullWidth
      inputRef={inputRef}
      value={value}
      onChange={onType}
      variant="outlined"
      inputProps={{
        spellCheck: "false",
        autoCorrect: "off",
        autoComplete: "off",
        style: { lineHeight: 2 },
      }}
      label="Type IPA"
      InputProps={{
        className: classes.input,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="delete" title="Delete" onClick={onDelete} color="inherit">
              <BackspaceOutlinedIcon />
            </IconButton>
            {check}
          </InputAdornment>
        ),
        startAdornment: header && (
          <InputAdornment
            disablePointerEvents
            disableTypography
            position="start"
            classes={{ positionStart: classes.noRightMargin }}
          >
            {header}
          </InputAdornment>
        ),
      }}
      onKeyPress={handleEnter}
      error={error}
      helperText={helpText}
    />
  );
};

export default IPAInput;
