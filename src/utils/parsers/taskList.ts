import { TaskListDef, TaskListFile } from "../../data/taskList";
import { parse } from "./parse";

export type { TaskListDef } from "../../data/taskList";

export const parseTaskList = (contents: string): TaskListDef => parse(contents, TaskListFile);
