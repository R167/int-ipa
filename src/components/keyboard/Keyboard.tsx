import { ReactElement, memo } from "react";
import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";

import Pulmonics from "./Pulmonics";
import { Clickable, ClickableSubset, colToWidth, subsetFunc } from "./common";
import NonPulmonics from "./NonPulmonics";
import Vowels from "./Vowels";
import Diacritics from "./Diacritics";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import Other from "./Other";
import Suprasegmentals from "./Suprasegmentals";
import React from "react";
import { KeyboardDef } from "../../utils/parsers";
import GridDisplay from "./GridDisplay";

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

interface Props extends ClickableSubset {
  // Optional set of keys which are allowed. Replaces the subset argument.
  keys?: KeyboardDef;
}
interface BaseProps extends Props {
  children?: ClickableNode;
}
export const BaseKeyboard = (props: BaseProps) => {
  const classes = useStyles();
  const { onClick, subset, children } = props;

  return (
    // 1
    <Grid container spacing={2} className={classes.childOrder}>
      <ApplyClickableSubset subset={subset} onClick={onClick}>
        <Item
          size="full"
          header="Consonants (Pulmonics)"
          footer="Symbols to the right in a cell are voiced, to the left are voiceless. Shaded areas denote articulations judged impossible."
        >
          <Pulmonics />
        </Item>
        <Item size="half">
          <Vowels />
        </Item>
        <Item size="half" header="Other">
          <Other />
        </Item>
      </ApplyClickableSubset>
      <ApplyClickableSubset subset={subset} onClick={onClick}>
        {children}
      </ApplyClickableSubset>
    </Grid>
  );
};

type ClickableElement = ReactElement<ClickableSubset> | undefined;
type ClickableNode = ClickableElement | ClickableElement[] | undefined;
interface ApplyProps extends ClickableSubset {
  children: ClickableNode;
}
const ApplyClickableSubset = (props: ApplyProps) => {
  const { onClick, subset, children } = props;
  return (
    <>
      {React.Children.map(
        children,
        (child) => child && React.cloneElement(child, { subset, onClick })
      )}
    </>
  );
};

const SubsetKeyboard = (props: Clickable & { keys: KeyboardDef }) => {
  const { onClick, keys } = props;

  const sections: ClickableElement[] = [];
  if (keys.nonPulmonics) {
    sections.push(
      <Item size="half" header="Consonants (Non-pulmonics)">
        <NonPulmonics />
      </Item>
    );
  }
  const ipa = [...keys.symbols];
  keys.sections?.forEach(({ symbols, columns, name }) => {
    symbols.forEach(({ ipa: s }) => ipa.push(s));
    const list = symbols.map(({ ipa, description }) => ({
      ipa,
      sym: ipa,
      description,
    }));

    const width = colToWidth(columns);

    sections.push(
      <Item size="half" header={name} key={name}>
        <GridDisplay content={list} breakpoints={{ xs: width }} />
      </Item>
    );
  });
  const subset = subsetFunc(ipa);
  return <BaseKeyboard onClick={onClick} subset={subset} children={sections} />;
};

/**
 * Accepts an onClick option. This is assumed to be memoized.
 * If you don't memoize onClick, you WILL have a bad day.
 */
const Keyboard = (props: Props) => {
  const { onClick, subset, keys } = props;
  if (keys && keys.symbols.length > 0) {
    return <SubsetKeyboard onClick={onClick} keys={keys} />;
  }

  return (
    // 1
    <BaseKeyboard onClick={onClick} subset={subset}>
      <Item size="more" header="Diacritics">
        <Diacritics />
      </Item>

      <Item size="less" header="Suprasegmentals">
        <Suprasegmentals />
      </Item>

      <Item size="half" header="Consonants (Non-pulmonics)">
        <NonPulmonics />
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

interface ItemProps extends ClickableSubset {
  header?: string;
  footer?: string;
  children: ReactElement<ClickableSubset>;
  size: keyof typeof sizes;
}
export const Item = ({ header, footer, children, size, subset, onClick }: ItemProps) => {
  const classes = useStyles();

  const child = React.Children.only(children);
  return (
    <Grid item xs={12} md={size && sizes[size]}>
      <Paper className={classes.paper}>
        {header && (
          <Typography variant="h6" component="p" gutterBottom>
            {header}
          </Typography>
        )}
        {React.cloneElement(child, { subset, onClick })}
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
