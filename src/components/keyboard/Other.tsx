import { memo } from "react";
import { ClickableSubset } from "./common";
import { MISC } from "../../utils/ipa";
import GridDisplay from "./GridDisplay";

export const breakpoints = { sm: 6 } as const;

const Other = (props: ClickableSubset) => {
  return <GridDisplay {...props} content={MISC} breakpoints={breakpoints} />;
};

export default memo(Other);
