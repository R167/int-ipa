import { memo, useCallback } from "react";

import clsx from "clsx";
import { ClickableSubset, borderColor, useSubset } from "./common";

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
  symbol: {
    padding: theme.spacing(0, 0.5),
    userSelect: "none",
    fontSize: "1.5rem",
    color: theme.palette.action.disabled,
  },
  clickable: {
    color: theme.palette.text.primary,
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
    minWidth: "56px",
    borderLeft: `1px solid ${borderColor(theme)}`,
    borderRight: `1px solid ${borderColor(theme)}`,
  },
}));

interface Props extends ClickableSubset {}

const Pulmonics = (props: Props) => {
  const classes = useStyles();
  const { onClick, subset } = props;
  const canClick = useSubset(subset);
  const clickCallback = useCallback(
    (char) =>
      char !== IMPOSSIBLE && char !== NOT_USED && onClick && canClick(char)
        ? () => onClick(char)
        : undefined,
    [onClick, canClick]
  );

  const preventDefault = useCallback((e) => e.preventDefault(), []);

  // TODO: Fix this at some point
  const Cell = useCallback(
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
              voiceless && canClick(voiceless) && classes.clickable,
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
              voiced && canClick(voiced) && classes.clickable,
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
    [canClick, classes, clickCallback, preventDefault]
  );

  return (
    <TableContainer>
      <Table size="small" aria-label="Consonants (Pulmonics)">
        <TableHead>
          <TableRow>
            <TableCell>{/* Filler for articulation row */}</TableCell>
            {PLACES.map((place) => (
              <TableCell
                key={`keyboard-place-${place}`}
                align="center"
                className={clsx(classes.header, classes.caps)}
                colSpan={2}
                padding="none"
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

export default memo(Pulmonics);
