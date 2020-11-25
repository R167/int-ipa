import React from "react";

import useKeyboard from "./keyboard/useKeyboard";

import StickyIPA from "./keyboard/StickyIPA";

const TypeIPA = () => {
  const { handleKeyboard, handleDelete, handleType, value, ref } = useKeyboard();

  return (
    <StickyIPA
      value={value}
      inputRef={ref}
      onType={handleType}
      onDelete={handleDelete}
      handleKeyboard={handleKeyboard}
    />
  );
};

export default TypeIPA;
