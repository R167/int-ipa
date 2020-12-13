import { memo } from "react";
import { Clickable } from "./common";
import { SUPRASEGMENTALS } from "../../utils/ipa";
import GridDisplay from "./GridDisplay";

const Suprasegmentals = (props: Clickable) => {
  return (
    <GridDisplay {...props} content={SUPRASEGMENTALS} breakpoints={{ md: 12, sm: 6, xs: 12 }} />
  );
};

export default memo(Suprasegmentals);
