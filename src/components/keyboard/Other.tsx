import React, { useCallback } from "react";
import { Clickable, borderColor, shadowBorder } from "./common";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MISC } from "../../utils/ipa";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
  symbol: {
    userSelect: "none",
    textAlign: "center",
    cursor: "pointer",
    fontSize: "1.5rem",
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

const Other = (props: Clickable) => {
  const classes = useStyles();
  const { onClick = () => {} } = props;
  const preventDefault = useCallback((e) => e.preventDefault(), []);

  return (
    <Grid container spacing={0}>
      {MISC.map(({ ipa, sym, description, examples }) => (
        <Grid item xs={12} sm={6} key={description} className={classes.bordered}>
          <Grid container>
            <Grid
              item
              xs={2}
              className={classes.symbol}
              onClick={() => onClick(ipa)}
              onMouseDown={preventDefault}
            >
              {sym}
            </Grid>
            <Grid item xs>
              <div className={classes.descriptionParent}>
                <div className={classes.description}>{description}</div>
              </div>
            </Grid>
            {/* Forgive me father, for I have sinned. I never should have used this much indentation (the second time) */}
            {examples?.map((char, i) => {
              return (
                <Grid
                  key={`${char}-${i}`}
                  item
                  xs={2}
                  className={classes.symbol}
                  onClick={() => onClick(char)}
                  onMouseDown={preventDefault}
                >
                  {char}
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default React.memo(Other);
