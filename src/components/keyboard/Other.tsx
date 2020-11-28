import React from "react";
import { Clickable } from "./common";
import { MISC } from "../../utils/ipa";
import GridDisplay from "./GridDisplay";

const Other = (props: Clickable) => {
  return <GridDisplay {...props} content={MISC} breakpoints={{ sm: 6 }} />;
};

export default React.memo(Other);
