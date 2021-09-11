import { memo } from "react";
import { ClickableSubset } from "./common";
import { SUPRASEGMENTALS } from "../../utils/ipa";
import GridDisplay from "./GridDisplay";

export const breakpoints = { md: 12, sm: 6, xs: 12 } as const;

const Suprasegmentals = (props: ClickableSubset) => {
  return <GridDisplay {...props} content={SUPRASEGMENTALS} breakpoints={breakpoints} />;
};

export default memo(Suprasegmentals);
