import { KeyboardEvent, RefObject, useCallback, useEffect, useState } from "react";

import {
  Collapse,
  Fade,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Tooltip,
  Typography,
  makeStyles,
} from "@material-ui/core";
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

const preventDefault = (e: any) => e.preventDefault();

export interface Props {
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
  headerTooltip?: string;
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
    headerTooltip,
  } = props;

  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    if (header && headerTooltip) {
      setOpen(true);
      window.setTimeout(() => setOpen(false), 1500);
    }
  }, [header, headerTooltip]);

  const headerContent = header && (
    <InputAdornment
      disablePointerEvents
      disableTypography
      position="start"
      classes={{ positionStart: classes.noRightMargin }}
    >
      {headerTooltip ? (
        <Tooltip
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          placement="bottom-end"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}
          title={<Typography variant="subtitle2">{headerTooltip}</Typography>}
        >
          <span>{header}</span>
        </Tooltip>
      ) : (
        header
      )}
    </InputAdornment>
  );

  return (
    <FormControl fullWidth error={error} variant="outlined">
      <InputLabel htmlFor="ipa-typer" className={classes.label}>
        {placeholder}
      </InputLabel>
      <OutlinedInput
        id="ipa-typer"
        label={placeholder}
        onKeyPress={handleEnter}
        className={classes.input}
        onChange={onType}
        value={value}
        inputRef={inputRef}
        inputProps={{
          spellCheck: "false",
          autoCorrect: "off",
          autoComplete: "off",
          style: { lineHeight: 2 },
        }}
        endAdornment={
          <InputAdornment position="end">
            <Tooltip title="Delete" enterDelay={500}>
              <IconButton aria-label="delete" onMouseDown={preventDefault} onClick={onDelete}>
                <BackspaceOutlinedIcon />
              </IconButton>
            </Tooltip>
            {check}
          </InputAdornment>
        }
        startAdornment={headerContent}
      />
      {/* Look into changing this to be a tool tip possibly */}
      <Collapse in={error}>
        <FormHelperText error variant="outlined">
          {helperText}
        </FormHelperText>
      </Collapse>
    </FormControl>
  );
};

export default IPAInput;
