import { memo, useCallback } from "react";
import { ClickableSubset, borderColor, shadowBorder, useSubset } from "./common";

import clsx from "clsx";

import { Grid, GridProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MiscList } from "../../utils/ipa";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
  symbol: {
    userSelect: "none",
    textAlign: "center",
    fontSize: "1.5rem",
    cursor: "default",
    color: theme.palette.action.disabled,
  },
  clickable: {
    color: theme.palette.action.active,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  description: {
    padding: "2px",
    fontSize: "0.8rem",
  },
  descriptionParent: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
  },
  bordered: {
    boxShadow: shadowBorder("1px", borderColor(theme)),
  },
}));

type Breakpoints = Pick<GridProps, "xs" | "sm" | "md" | "lg" | "xl">;

interface Props extends ClickableSubset {
  content: MiscList;
  genSym?: (ipa: string) => string;
  breakpoints?: Breakpoints;
  combine?: boolean;
}

const GridDisplay = (props: Props) => {
  const classes = useStyles();
  const { onClick, content, breakpoints = {}, genSym = (ipa) => ipa, combine, subset } = props;
  const canClick = useSubset(subset);
  const preventDefault = useCallback((e) => e.preventDefault(), []);

  const clickCallback = useCallback(
    (symbol) => (onClick && canClick(symbol) ? () => onClick(symbol) : undefined),
    [canClick, onClick]
  );

  return (
    <Grid container spacing={0}>
      {content.map(({ ipa, sym, description, examples }) => (
        <Grid item xs={12} {...breakpoints} key={description} className={classes.bordered}>
          <Grid container>
            <Grid
              item
              xs={2}
              className={clsx(classes.symbol, canClick(ipa) && classes.clickable)}
              onClick={clickCallback(ipa)}
              onMouseDown={preventDefault}
            >
              {sym || genSym(ipa)}
            </Grid>
            <Grid item xs>
              <div className={classes.descriptionParent}>
                <div className={classes.description}>{description}</div>
              </div>
            </Grid>
            {/* Forgive me father, for I have sinned. I never should have used this much indentation */}
            {examples?.map((char) => {
              const combined = combine ? `${char}${ipa}` : char;
              return (
                <Grid
                  key={combined}
                  item
                  xs={2}
                  className={clsx(classes.symbol, canClick(combined) && classes.clickable)}
                  onClick={clickCallback(combined)}
                  onMouseDown={preventDefault}
                >
                  {combined}
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default memo(GridDisplay);
