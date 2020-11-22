import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { KeyboardEvent, RefObject, useCallback } from "react";
import BackspaceOutlinedIcon from "@material-ui/icons/BackspaceOutlined";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles((theme) => ({
  label: {
    "&:not(.MuiInputLabel-shrink)": {
      [theme.breakpoints.up("lg")]: {
        fontSize: "2rem",
      },
      fontSize: "1.5rem",
    },
  },
  input: {
    [theme.breakpoints.up("lg")]: {
      fontSize: "2rem",
    },
    fontSize: "1.5rem",
    "&> fieldset > legend > span": {
      fontSize: "0.75rem",
    },
  },
  noRightMargin: {
    marginRight: 0,
  },
  helpTextSize: {
    fontSize: "1rem",
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.5rem",
    },
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
  placeholder?: string;
}

const IPAInput = (props: Props) => {
  const classes = useStyles();
  const {
    placeholder = "Type IPA",
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
  }, [onCheck, inputRef]);

  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const preventDefault = useCallback((e) => e.preventDefault(), []);

  const check = onCheck && (
    <Tooltip title={checkDescription || "Submit IPA Symbol or End Word"} enterDelay={500}>
      <IconButton aria-label="check" onMouseDown={preventDefault} onClick={handleSubmit}>
        <CheckIcon />
      </IconButton>
    </Tooltip>
  );

  const helperText = helpText && (
    <Typography variant="body2" component="span" className={classes.helpTextSize}>
      {helpText}
    </Typography>
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
      label={placeholder}
      InputProps={{
        className: classes.input,
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title="Delete" enterDelay={500}>
              <IconButton aria-label="delete" onMouseDown={preventDefault} onClick={onDelete}>
                <BackspaceOutlinedIcon />
              </IconButton>
            </Tooltip>
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
      helperText={helperText}
    />
  );
};

export default IPAInput;
