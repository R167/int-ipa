import { memo } from "react";
import Md from "markdown-to-jsx";
import { Typography } from "@material-ui/core";
import CodeBlock from "./CodeBlock";

type AnyURL = string | URL;

interface Props {
  baseUrl?: AnyURL;
  children: string;
}

type Var = Parameters<typeof Typography>[0]["variant"];

const typeTag = (v: Var) =>
  ({
    component: Typography,
    props: { variant: v, component: "p", gutterBottom: true },
  } as const);

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  baseUrl?: AnyURL;
}

const RelativeImg = (props: ImgProps) => {
  const { baseUrl, src, ...imgProps } = props;

  const imgSrc = baseUrl && src ? new URL(src, baseUrl).toString() : src;
  return <img {...imgProps} src={imgSrc} />;
};

const Markdown = (props: Props) => {
  const { children, baseUrl } = props;
  const options = {
    disableParsingRawHTML: true,
    overrides: {
      img: { component: RelativeImg, props: { baseUrl } },
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

  return <Md children={children} options={options} />;
};

export default memo(Markdown);
