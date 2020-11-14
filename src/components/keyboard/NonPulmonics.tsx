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
    userSelect: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  sideBorder: {
    borderLeft: `1px solid ${borderColor(theme)}`,
    borderRight: `1px solid ${borderColor(theme)}`,
  },
  caps: {
    textTransform: "capitalize",
    padding: "6px 5.5px",
  },
  descr: {
    paddingLeft: "4px",
    fontSize: "0.8rem",
    verticalAlign: "middle",
  },
  header: {
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
        <TableCell
          className={clsx(classes.symbol, classes.sideBorder)}
          onClick={() => onClick(symbol)}
        >
          {symbol} <span className={classes.descr}>{name}</span>
        </TableCell>
      );
    },
    [classes, onClick]
  );

  return (
    <TableContainer>
      <Table size="small" aria-label="Consonants (Pulmonics)">
        <TableHead>
          <TableRow>
            <TableCell align="center" className={classes.header}>
              Clicks
            </TableCell>
            <TableCell align="center" className={classes.header}>
              Voiced implosives
            </TableCell>
            <TableCell align="center" className={classes.header}>
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
