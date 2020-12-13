import { memo } from "react";
import { Clickable } from "./common";
import { DIACRITICS, FILLER } from "../../utils/ipa";
import GridDisplay from "./GridDisplay";

const Diacritics = (props: Clickable) => {
  return (
    <GridDisplay
      {...props}
      content={DIACRITICS}
      breakpoints={{ md: 4, sm: 6 }}
      genSym={(ipa) => `${FILLER}${ipa}`}
      combine
    />
  );
};

export default memo(Diacritics);
