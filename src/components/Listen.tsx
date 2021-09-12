import Keyboard from "./keyboard/Keyboard";

const validKeys = ["p", "b", "d", "z", "i"];

const Listen = () => {
  return <Keyboard subset={validKeys} />;
};

export default Listen;
