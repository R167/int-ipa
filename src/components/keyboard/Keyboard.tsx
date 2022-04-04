import { memo, ReactNode } from "react";
import { Grid, Paper, Typography, makeStyles, GridSize } from "@material-ui/core";

import Pulmonics from "./Pulmonics";
import { ClickableSubset, useSubset } from "./common";
import NonPulmonics from "./NonPulmonics";
import Vowels from "./Vowels";
import Diacritics from "./Diacritics";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import Other from "./Other";
import Suprasegmentals from "./Suprasegmentals";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    height: "100%",
  },
  childOrder: {
    // Allow reordering the children of this element.
    // This has the additional benefit of allowing an "IPA" setting
    // On larger screens, show "other" left of "vowels"
    [theme.breakpoints.up("md")]: orderChildren(1, 3, 2),
  },
}));

const orderChildren = (...children: number[]) => {
  let styles: CSSProperties = { "& > *": { order: 100 } };
  children.forEach((child, i) => {
    styles[`& > :nth-child(${i + 1})`] = { order: child };
  });
  return styles;
};

interface Props extends ClickableSubset {}
interface BaseProps extends Props {
  children?: ReactNode;
}
export const BaseKeyboard = (props: BaseProps) => {
  const classes = useStyles();
  const { onClick, subset, children } = props;
  const handleSubset = useSubset(subset);

  return (
    // 1
    <Grid container spacing={2} className={classes.childOrder}>
      <Item
        size="full"
        header="Consonants (Pulmonics)"
        footer="Symbols to the right in a cell are voiced, to the left are voiceless. Shaded areas denote articulations judged impossible."
      >
        <Pulmonics onClick={onClick} subset={handleSubset} />
      </Item>
      {/* 2 */}
      <Item size="half">
        <Vowels onClick={onClick} subset={handleSubset} />
      </Item>
      {/* 3 */}
      <Item size="half" header="Other">
        <Other onClick={onClick} subset={handleSubset} />
      </Item>
      {children}
    </Grid>
  );
};

/**
 * Accepts an onClick option. This is assumed to be memoized.
 */
const Keyboard = (props: Props) => {
  const { onClick, subset } = props;
  const handleSubset = useSubset(subset);

  return (
    // 1
    <BaseKeyboard>
      <Item size="more" header="Diacritics">
        <Diacritics onClick={onClick} subset={handleSubset} />
      </Item>

      <Item size="less" header="Suprasegmentals">
        <Suprasegmentals onClick={onClick} subset={handleSubset} />
      </Item>

      <Item size="half" header="Consonants (Non-pulmonics)">
        <NonPulmonics onClick={onClick} subset={handleSubset} />
      </Item>
    </BaseKeyboard>
  );
};

const sizes = {
  full: undefined,
  more: 8,
  half: 6,
  less: 4,
} as const;

interface ItemProps {
  header?: string;
  footer?: string;
  children: ReactNode;
  size: keyof typeof sizes;
}
const Item = ({ header, footer, children, size }: ItemProps) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={size && sizes[size]}>
      <Paper className={classes.paper}>
        {header && (
          <Typography variant="h6" component="p" gutterBottom>
            {header}
          </Typography>
        )}
        {children}
        {footer && (
          <Typography variant="caption" align="center" component="p">
            {footer}
          </Typography>
        )}
      </Paper>
    </Grid>
  );
};

export default memo(Keyboard);
