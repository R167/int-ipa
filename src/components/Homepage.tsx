import { Typography } from "@material-ui/core";
import React from "react";

import Keyboard from "./keyboard/Keyboard";

const Homepage = () => {
  const [name, setName] = React.useState("");

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Create React App v4-beta example with TypeScript↗ d͡ʒitɐ˞ ◌˞n̪d̥{name}
      </Typography>
      <Keyboard
        onClick={(char) => {
          setName(name + char);
        }}
      />
    </div>
  );
};

export default Homepage;
