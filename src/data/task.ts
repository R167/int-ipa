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

// ensure the segment is a member of the parent (guard against version changes)
// and get typescript guarantees later on.
const isParentSegmentList = (list: any, segment: TaskFileSegment): list is TaskFileSegment[] =>
  Array.isArray(list) && list.includes(segment);

const ValidateSegment = refine(Segment, "Segment", (segment, context) => {
  const index = context.path[context.path.length - 1];
  // Grab the parent object so we can check against it for certain rules
  const parent = context.branch[context.branch.length - 2];

  // Slightly hacky way of checking for current segment number and if last segment
  if (typeof index === "string" || !isParentSegmentList(parent, segment)) {
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
      return `There must be at least one valid value per segment`;
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
