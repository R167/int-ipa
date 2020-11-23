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

const SegmentList = refine(array(Segment), "SegmentList", (segments) => {
  // Only iterate up to the last element
  for (let i = 0; i < segments.length - 1; i++) {
    const curr = segments[i];

    if (curr[""] === true) {
      return `Error in segment ${i}: You may only terminate with "" on the last segment`;
    }

    if (Object.values(curr).reduce((run: boolean, curr) => run && curr !== true, true)) {
      return `There must be at least one valid value in segment ${i}`;
    }
  }

  const lastSegment = segments[segments.length - 1];
  if (lastSegment[""] === true) {
    for (const key in lastSegment) {
      if (key !== "" && lastSegment[key] === true) {
        return "You must not have both a termination and another valid option in the last segment";
      }
    }
  }

  // Validation successful
  return true;
});

const Word = object({
  display: string(),
  audio: optional(string()),
  segments: SegmentList,
});

export const TaskFile = object({
  author: string(),
  title: string(),
  salt: optional(string()),
  instructions: optional(string()),
  macros: optional(Macros),
  words: array(Word),
});
