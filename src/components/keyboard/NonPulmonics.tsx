import { memo, useCallback, useMemo } from "react";
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
import { CLICKS, EJECTIVES, IMPLOSIVES } from "../../utils/ipa";

const useStyles = makeStyles((theme) => ({
  symbol: {
    padding: theme.spacing(0.75, 1),
    textAlign: "center",
    userSelect: "none",
    fontSize: "1.5rem",
    borderLeft: `1px solid ${borderColor(theme)}`,
  },
  disabled: {
    color: theme.palette.action.disabled,
  },
  hover: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  descr: {
    fontSize: "0.8rem",
    verticalAlign: "middle",
    padding: theme.spacing(0, 0.5),
    borderRight: `1px solid ${borderColor(theme)}`,
  },
  header: {
    padding: theme.spacing(0.75, 1.5),
    borderLeft: `1px solid ${borderColor(theme)}`,
    borderRight: `1px solid ${borderColor(theme)}`,
  },
}));

interface Props extends ClickableSubset {}

const NonPulmonics = (props: Props) => {
  const classes = useStyles();
  const { onClick, subset } = props;
  const canClick = useSubset(subset);

  const sounds = useMemo(() => {
    return CLICKS.map((click, i) => [click, IMPLOSIVES[i], EJECTIVES[i]]);
  }, []);

  const preventDefault = useCallback((e) => e.preventDefault(), []);

  const Cell = useCallback(
    ({ symbol, name }: { symbol: string; name: string }) => {
      const handleClick = onClick && canClick(symbol) ? () => onClick(symbol) : undefined;
      return (
        <>
          <TableCell
            className={clsx(classes.symbol, canClick(symbol) ? classes.hover : classes.disabled)}
            onClick={handleClick}
            onMouseDown={preventDefault}
          >
            {symbol}
          </TableCell>
          <TableCell className={classes.descr}>{name}</TableCell>
        </>
      );
    },
    [classes, onClick, preventDefault, canClick]
  );

  return (
    <TableContainer>
      <Table size="small" aria-label="Consonants (Pulmonics)">
        <colgroup span={2}></colgroup>
        <colgroup span={2}></colgroup>
        <colgroup span={2}></colgroup>
        <TableHead>
          <TableRow>
            <TableCell align="center" className={classes.header} colSpan={2}>
              Clicks
            </TableCell>
            <TableCell align="center" className={classes.header} colSpan={2}>
              Voiced implosives
            </TableCell>
            <TableCell align="center" className={classes.header} colSpan={2}>
              Ejectives
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sounds.map((row, i) => (
            <TableRow key={`keyboard-nonpulmonic-${i}`}>
              {row.map(([symbol, name], j) => (
                <Cell key={`keyboard-nonpulmonic-${i}-${j}`} symbol={symbol} name={name} />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(NonPulmonics);
