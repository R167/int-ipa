import { Box, Grid, Paper, makeStyles, useTheme } from "@material-ui/core";

import IPAInput, { Props as InputProps } from "./IPAInput";
import useKeyboard from "./useKeyboard";

// const Keyboard = React.lazy(() => import("./Keyboard"));
import Keyboard from "./Keyboard";
import { Subset } from "./common";
import { KeyboardDef } from "../../utils/parsers";

const useStyles = makeStyles((theme) => ({
  sticky: {
    pointerEvents: "none", // Prevent background centering overlapping content
    zIndex: 10,
    position: "sticky",
    top: `${theme.spacing(-1)}px`,
    marginBottom: `${theme.spacing(theme.palette.type === "dark" ? 0 : 1)}px`,
  },
  input: {
    pointerEvents: "auto", // Restore pointer events
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.background.default
        : theme.palette.background.paper,
    borderRadius: "8px",
  },
}));

interface Props extends InputProps {
  handleKeyboard: ReturnType<typeof useKeyboard>["handleKeyboard"];
  subset?: Subset;
  keys?: KeyboardDef;
}

const StickyIPA = (props: Props) => {
  const theme = useTheme();
  const classes = useStyles();

  const { handleKeyboard, subset, keys, ...inputProps } = props;

  // Testing revealed an elevated paper was preferred in light mode and contrastive flat in dark mode
  const elevation = theme.palette.type === "dark" ? 0 : 3;

  return (
    <div>
      <Box paddingY={2} className={classes.sticky}>
        <Grid container alignItems="center" justify="center" spacing={2}>
          <Grid item xs md={8} component={Paper} elevation={elevation} className={classes.input}>
            <IPAInput {...inputProps} />
          </Grid>
        </Grid>
      </Box>

      <Keyboard onClick={handleKeyboard} subset={subset} keys={keys} />
    </div>
  );
};

export default StickyIPA;
