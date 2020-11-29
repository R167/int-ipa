import React from "react";
import Md, { MarkdownToJSX } from "markdown-to-jsx";
import { Typography } from "@material-ui/core";
import CodeBlock from "./CodeBlock";

interface Props {
  children: string;
}

type Var = Parameters<typeof Typography>[0]["variant"];

const typeTag = (v: Var) =>
  ({
    component: Typography,
    props: { variant: v, component: "p", gutterBottom: true },
  } as const);

const opts: MarkdownToJSX.Options = {
  disableParsingRawHTML: true,
  overrides: {
    h1: typeTag("h1"),
    h2: typeTag("h2"),
    h3: typeTag("h3"),
    h4: typeTag("h4"),
    h5: typeTag("h5"),
    h6: typeTag("h6"),
    p: typeTag("body1"),
    pre: { component: CodeBlock, props: { block: true } },
    code: { component: CodeBlock },
  },
};

const Markdown = (props: Props) => {
  const { children } = props;

  return <Md children={children} options={opts} />;
};

export default Markdown;
