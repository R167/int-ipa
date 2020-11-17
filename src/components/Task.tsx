import { Typography } from "@material-ui/core";
import React from "react";
import useKeyboard from "./keyboard/useKeyboard";

interface Props {
  taskFile: string;
}

const Task = (props: Props) => {
  const { taskFile } = props;
  const { handleKeyboard, handleDelete, handleType, setValue, value, ref } = useKeyboard();

  return <Typography>{taskFile}</Typography>;
};

export default Task;
