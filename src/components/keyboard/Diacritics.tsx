import { memo } from "react";
import { ClickableSubset } from "./common";
import { DIACRITICS, FILLER } from "../../utils/ipa";
import GridDisplay from "./GridDisplay";

export const breakpoints = { md: 4, sm: 6 } as const;

const Diacritics = (props: ClickableSubset) => {
  return (
    <GridDisplay
      {...props}
      content={DIACRITICS}
      breakpoints={breakpoints}
      genSym={(ipa) => `${FILLER}${ipa}`}
      combine
    />
  );
};

export default memo(Diacritics);
