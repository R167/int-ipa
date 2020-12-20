import { memo } from "react";
import Md from "markdown-to-jsx";
import { Checkbox, Link, LinkProps, Typography, TypographyProps } from "@material-ui/core";
import AppLink from "./Link";
import CodeBlock from "./CodeBlock";

type AnyURL = string | URL;

const URL_PATTERN = /^(https?:)?\/\//i;

interface Props {
  baseUrl?: AnyURL;
  paragraph?: Var;
  children: string;
  allowTags?: boolean;
}

type Var = TypographyProps["variant"];

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
  // eslint-disable-next-line
  return <img {...imgProps} src={imgSrc} />;
};

const SmartLink = (props: LinkProps) => {
  const { href, ...rest } = props;
  if (href?.match(URL_PATTERN)) {
    return <Link href={href} {...rest} />;
  } else {
    return <AppLink to={href || "#"} {...rest} />;
  }
};

const CustomInput = (props: React.ComponentProps<"input">) => {
  if (props.type === "checkbox") {
    return <Checkbox checked={props.checked} readOnly={props.readOnly} disabled={props.readOnly} />;
  } else {
    return <input {...props} />;
  }
};

const Markdown = (props: Props) => {
  const { children, baseUrl, allowTags, paragraph = "body1" } = props;
  const options = {
    disableParsingRawHTML: !allowTags,
    forceBlock: true,
    overrides: {
      img: { component: RelativeImg, props: { baseUrl } },
      h1: typeTag("h1"),
      h2: typeTag("h2"),
      h3: typeTag("h3"),
      h4: typeTag("h4"),
      h5: typeTag("h5"),
      h6: typeTag("h6"),
      p: typeTag(paragraph),
      a: { component: SmartLink },
      pre: { component: CodeBlock, props: { block: true } },
      code: { component: CodeBlock },
      input: { component: CustomInput },
    },
  };

  return <Md children={children} options={options} />;
};

export default memo(Markdown);
