import { object, array, boolean, string, optional, Infer } from "superstruct";

export type TaskListDef = Infer<typeof TaskListFile>;
export type TaskInfoDef = Infer<typeof TaskInfo>;

const TaskInfo = object({
  name: string(),
  description: string(),
  file: string(),
  hidden: optional(boolean()),
});

export const TaskListFile = object({
  title: string(),
  description: string(),
  tasks: array(TaskInfo),
});
