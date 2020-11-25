import React, { useCallback } from "react";

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
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  voiced: {
    cursor: "pointer",
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
  leftSideBorder: {
    borderLeft: `1px solid ${borderColor(theme)}`,
  },
  rightSideBorder: {
    borderRight: `1px solid ${borderColor(theme)}`,
  },
  caps: {
    padding: "6px 5.5px",
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

  // TODO: Fix this at some point
  const Cell = React.useCallback(
    ({ x, y }: { x: number; y: number }) => {
      const voiceless = PULMONICS[y]?.[x * 2];
      const voiced = PULMONICS[y]?.[x * 2 + 1];

      const hasBorders = x < 2 || x > 4 || y === 4;

      return (
        <>
          <TableCell
            align="center"
            className={clsx(
              classes.symbol,
              voiceless && classes.voiceless,
              voiceless === IMPOSSIBLE && classes.impossible,
              hasBorders && classes.leftSideBorder
            )}
            padding="none"
            onClick={clickCallback(voiceless)}
            onMouseDown={preventDefault}
          >
            {voiceless}
          </TableCell>
          <TableCell
            align="center"
            className={clsx(
              classes.symbol,
              voiced && classes.voiced,
              voiced === IMPOSSIBLE && classes.impossible,
              hasBorders && classes.rightSideBorder
            )}
            padding="none"
            onClick={clickCallback(voiced)}
            onMouseDown={preventDefault}
          >
            {voiced}
          </TableCell>
        </>
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
                colSpan={2}
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
