import React, { useCallback } from "react";
import { Clickable, borderColor, shadowBorder } from "./common";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DIACRITICS, FILLER } from "../../utils/ipa";

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

const Diacritics = (props: Clickable) => {
  const classes = useStyles();
  const { onClick = () => {} } = props;
  const preventDefault = useCallback((e) => e.preventDefault(), []);

  return (
    <Grid container spacing={0}>
      {DIACRITICS.map(({ ipa, description, examples }) => (
        <Grid item xs={6} sm={4} key={`diacritics-${description}`} className={classes.bordered}>
          <Grid container>
            <Grid
              item
              xs={2}
              className={classes.symbol}
              onClick={() => onClick(ipa)}
            >{`${FILLER}${ipa}`}</Grid>
            <Grid item xs>
              <div className={classes.descriptionParent}>
                <div className={classes.description}>{description}</div>
              </div>
            </Grid>
            {/* Forgive me father, for I have sinned. I never should have used this much indentation */}
            {examples.map((char) => {
              const combined = `${char}${ipa}`;
              return (
                <Grid
                  key={combined}
                  item
                  xs={2}
                  className={classes.symbol}
                  onClick={() => onClick(combined)}
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

export default React.memo(Diacritics);
