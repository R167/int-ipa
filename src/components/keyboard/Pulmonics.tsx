import React, { useCallback, useMemo } from "react";

import clsx from "clsx";
import { Clickable, borderColor } from "./common";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { IMPOSSIBLE, MANNERS, NOT_USED, PLACES, PULMONICS } from "../../utils/ipa";

const useStyles = makeStyles((theme) => ({
  voiceless: {
    cursor: "pointer",
    width: "50%",
    float: "left",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  voiced: {
    height: "100%",
    cursor: "pointer",
    width: "50%",
    float: "right",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  impossible: {
    backgroundColor: theme.palette.action.disabledBackground,
    color: "transparent",
    cursor: "default",
    "&:hover": {
      backgroundColor: theme.palette.action.disabledBackground,
    },
  },
  symbol: {
    userSelect: "none",
    fontSize: "1.5rem",
  },
  sideBorder: {
    borderLeft: `1px solid ${borderColor(theme)}`,
    borderRight: `1px solid ${borderColor(theme)}`,
  },
  caps: {
    padding: "6px 5.5px",
    // "td&": {
    //   padding: "0px 5.5px",
    // },
  },
  header: {
    borderLeft: `1px solid ${borderColor(theme)}`,
    borderRight: `1px solid ${borderColor(theme)}`,
  },
}));

interface Props extends Clickable {}

const Pulmonics = (props: Props) => {
  const classes = useStyles();
  const { onClick } = props;
  const clickCallback = useCallback(
    (char) =>
      (char !== IMPOSSIBLE && char !== NOT_USED && onClick && (() => onClick(char))) || undefined,
    [onClick]
  );

  const preventDefault = useCallback((e) => e.preventDefault(), []);

  const Cell = React.useCallback(
    ({ x, y }: { x: number; y: number }) => {
      const voiceless = PULMONICS[y]?.[x * 2];
      const voiced = PULMONICS[y]?.[x * 2 + 1];

      const hasBorders = x < 2 || x > 4 || y === 4;

      return (
        <TableCell
          align="center"
          className={clsx(classes.symbol, hasBorders && classes.sideBorder)}
          padding="none"
        >
          <span
            className={clsx(classes.voiceless, voiceless === IMPOSSIBLE && classes.impossible)}
            onClick={clickCallback(voiceless)}
            onMouseDown={preventDefault}
          >
            {voiceless}
          </span>
          <span
            className={clsx(classes.voiced, voiced === IMPOSSIBLE && classes.impossible)}
            onClick={clickCallback(voiced)}
            onMouseDown={preventDefault}
          >
            {voiced}
          </span>
        </TableCell>
      );
    },
    [classes, clickCallback, preventDefault]
  );

  return (
    <TableContainer>
      <Table size="small" aria-label="Consonants (Pulmonics)">
        <TableHead>
          <TableRow>
            <TableCell>{/* Filler for articulation */}</TableCell>
            {PLACES.map((place) => (
              <TableCell
                key={`keyboard-place-${place}`}
                align="center"
                className={clsx(classes.header, classes.caps)}
              >
                {place}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {MANNERS.map((manner, y) => (
            <TableRow key={`keyboard-manner-${manner}`}>
              <TableCell className={classes.caps}>{manner}</TableCell>
              {PLACES.map((place, x) => (
                <Cell key={`keyboard-l-${manner}-${place}`} x={x} y={y} />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(Pulmonics);
