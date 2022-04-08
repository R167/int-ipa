import { ReactNode, useRef } from "react";

interface Props {
  visible: boolean;
  children: ReactNode;
}

/**
 * Lazy load elements, but once loaded, keep them on the page and just mark as invisible
 */
const LoadOnce = (props: Props) => {
  const seen = useRef<boolean>(props.visible);
  const hasBeenShown = props.visible || seen.current;

  if (hasBeenShown) {
    seen.current = true;
    return <div hidden={!props.visible}>{props.children}</div>;
  } else {
    return <div hidden></div>;
  }
};

export default LoadOnce;
