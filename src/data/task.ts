import {
  Infer,
  array,
  boolean,
  object,
  optional,
  record,
  refine,
  string,
  union,
} from "superstruct";

export type TaskFileDef = Infer<typeof TaskFile>;
export type TaskFileWord = Infer<typeof Word>;
export type TaskFileMacros = Infer<typeof Macros>;
export type TaskFileSegment = Infer<typeof Segment>;

const Macros = record(string(), array(string()));

const Segment = record(string(), union([boolean(), string()]));

const ValidateSegment = refine(Segment, "Segment", (segment, context) => {
  const index = context.path[context.path.length - 1];
  const parent = context.branch[context.branch.length - 1];

  // Slightly hacky way of checking for current segment number and if last segment
  if (typeof index === "string" || !Array.isArray(parent)) {
    return "Segments may only occur in arrays";
  }

  for (const key in segment) {
    if ((key.includes("...") || key.includes("%")) && segment[key] === true) {
      return "Correct options are not allowed to use wildcards";
    }
  }

  if (index < parent.length - 1) {
    if (segment[""] === true) {
      return `You may only terminate with "" on the last segment`;
    }

    if (Object.values(segment).reduce((run: boolean, curr) => run && curr !== true, true)) {
      return `There must be at least one valid value in segment`;
    }
  } else {
    // Last segment
    if (segment[""] === true) {
      for (const key in segment) {
        if (key !== "" && segment[key] === true) {
          return "You cannot have both a termination and another valid option in the last segment";
        }
      }
    }
  }
  // Validation successful
  return true;
});

const Word = object({
  display: string(),
  audio: optional(string()),
  instructions: optional(string()),
  segments: array(ValidateSegment),
});

export const TaskFile = object({
  author: string(),
  title: string(),
  salt: optional(string()),
  instructions: optional(string()),
  macros: optional(Macros),
  words: array(Word),
});
