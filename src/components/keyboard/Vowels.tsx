import { memo, useCallback, useMemo } from "react";
import clsx from "clsx";
import { ClickableSubset, useSubset } from "./common";

import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Coords, VOWELS, VOWEL_FRONTEDNESS, VOWEL_HEIGHTS, VowelLiteral } from "../../utils/ipa";

import { ReactComponent as Trapezium } from "./trapezium.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
  outerQuad: {
    padding: theme.spacing(1, 3),
    fontSize: "1.5rem",
    position: "relative",
    height: "100%",
    minHeight: "275px",
    minWidth: "270px",
  },
  fullRel: {
    height: "100%",
    width: "100%",
    position: "relative",
  },
  trapezium: {
    position: "absolute",
    height: "100%",
    width: "100%",
    stroke: theme.palette.text.primary,
  },
  quad: {
    position: "absolute",
    height: "95%",
    width: "95%",
    left: "2.5%",
    top: "2.75%",
  },
  element: {
    userSelect: "none",
    cursor: "default",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    overflow: "visible",
    width: "1.2em",
    textAlign: "center",
    "& > div": {
      display: "inline-block",
    },
  },
  rounded: {
    position: "absolute",
    width: "1.2em",
    left: "0.75em",
  },
  unrounded: {
    position: "absolute",
    width: "1.2em",
    right: "0.75em",
  },
  mid: {
    width: "100%",
  },
  clickable: {
    cursor: "pointer",
    "&:hover": {
      borderRadius: "3px",
      backgroundColor: theme.palette.action.hover,
    },
  },
  disabled: { color: theme.palette.action.disabled },
  paperBack: {
    "&::before": {
      zIndex: "-1",
      left: "0",
      content: "''",
      borderRadius: "3px",
      position: "absolute",
      display: "inline-block",
      width: "1.2em",
      height: "100%",
      backgroundColor: theme.palette.background.paper,
    },
  },
  fullHeight: {
    height: "100%",
  },
  vowelPos: {
    padding: theme.spacing(0, 2),
  },
  vowelHeight: {
    padding: theme.spacing(0.5, 0),
  },
}));

interface Props extends ClickableSubset {}

const vowelCoords = ([x, y]: Coords): { left: string; top: string } => {
  const offset = y * 0.5;
  const val = offset + (1 - offset) * x;
  return { left: `${val * 100}%`, top: `${y * 100}%` };
};

/**
 * Vowel chart
 */
const Vowels = (props: Props) => {
  const classes = useStyles();
  const { onClick, subset } = props;
  const canClick = useSubset(subset);

  const preventDefault = useCallback((e) => e.preventDefault(), []);
  const clickCallback = useCallback(
    (symbol) => (onClick && canClick(symbol) ? () => onClick(symbol) : undefined),
    [canClick, onClick]
  );
  const clickable = useCallback(
    (symbol) => (canClick(symbol) ? classes.clickable : classes.disabled),
    [canClick, classes]
  );

  const VowelElement = useCallback(
    ({ vowels, coords }: { vowels: VowelLiteral; coords: Coords }) => {
      if (typeof vowels === "string") {
        const vowel = vowels;
        return (
          <Box className={clsx(classes.element, classes.paperBack)} style={vowelCoords(coords)}>
            <div
              className={clsx(classes.mid, clickable(vowel))}
              onClick={clickCallback(vowel)}
              onMouseDown={preventDefault}
            >
              {vowel}
            </div>
          </Box>
        );
      } else {
        const noCenter = vowels.join("").length < 2;
        // Zero width space or dot
        const center = noCenter ? "\u00A0" : "•";
        const [unrounded, rounded] = vowels;
        return (
          <Box
            className={clsx(classes.element, { [classes.paperBack]: !noCenter })}
            style={vowelCoords(coords)}
          >
            {center}
            <div
              className={clsx(classes.unrounded, clickable(unrounded), classes.paperBack)}
              onClick={clickCallback(unrounded)}
              onMouseDown={preventDefault}
            >
              {unrounded}
            </div>
            <div
              className={clsx(classes.rounded, clickable(rounded), classes.paperBack)}
              onClick={clickCallback(rounded)}
              onMouseDown={preventDefault}
            >
              {rounded}
            </div>
          </Box>
        );
      }
    },
    [clickable, classes, clickCallback, preventDefault]
  );

  const vowelChart = useMemo(
    () => (
      <Box className={classes.outerQuad}>
        <div className={classes.fullRel}>
          <Trapezium className={classes.trapezium} />
          <div className={classes.quad}>
            {VOWELS.map(([vowels, coords]) => (
              <VowelElement key={`vowelbox-${vowels}`} vowels={vowels} coords={coords} />
            ))}
          </div>
        </div>
      </Box>
    ),
    [classes, VowelElement]
  );

  return (
    <Box id="vowelQuad" className={classes.root}>
      <Grid container className={classes.fullHeight} wrap="nowrap">
        <Grid item>
          <Grid container direction="column" className={clsx(classes.fullHeight)}>
            <Typography variant="body1" component="p">
              &#8203;
            </Typography>
            <Grid item xs>
              <Grid
                container
                direction="column"
                justify="space-between"
                className={clsx(classes.fullHeight, classes.vowelHeight)}
              >
                {VOWEL_HEIGHTS.map((height) => (
                  <Typography key={height} variant="body1" component="p">
                    {height}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container direction="column" className={classes.fullHeight}>
            <Grid item>
              <Grid container justify="space-between" className={classes.vowelPos}>
                {VOWEL_FRONTEDNESS.map((pos) => (
                  <Typography key={pos} variant="body1" component="p">
                    {pos}
                  </Typography>
                ))}
              </Grid>
            </Grid>
            <Grid item xs>
              {vowelChart}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(Vowels);
