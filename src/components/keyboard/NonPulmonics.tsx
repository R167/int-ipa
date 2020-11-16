import React from "react";

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
import { CLICKS, EJECTIVES, IMPLOSIVES } from "../../utils/ipa";

const useStyles = makeStyles((theme) => ({
  symbol: {
    padding: theme.spacing(0.75, 1),
    textAlign: "center",
    userSelect: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    borderLeft: `1px solid ${borderColor(theme)}`,
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

interface Props extends Clickable {}

const NonPulmonics = (props: Props) => {
  const classes = useStyles();
  const { onClick = () => {} } = props;

  const sounds = React.useMemo(() => {
    const clicks = Array.from(CLICKS.entries());
    const implosives = Array.from(IMPLOSIVES.entries());
    const ejectives = Array.from(EJECTIVES.entries());

    return clicks.map((click, i) => [click, implosives[i], ejectives[i]]);
  }, []);

  const Cell = React.useCallback(
    ({ symbol, name }: { symbol: string; name: string }) => {
      return (
        <>
          <TableCell className={classes.symbol} onClick={() => onClick(symbol)}>
            {symbol}
          </TableCell>
          <TableCell className={classes.descr}>{name}</TableCell>
        </>
      );
    },
    [classes, onClick]
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

export default NonPulmonics;
