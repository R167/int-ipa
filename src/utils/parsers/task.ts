import escapeStringRegexp from "escape-string-regexp";
import normalize from "../normalize";
import { TaskFile, TaskFileMacros, TaskFileSegment } from "../../data/task";
import { parse } from "./parse";

export interface TaskDef {
  author: string;
  title: string;
  instructions?: string;
  salt?: string;
  macros: Macros;
  words: Word[];
}

type Explanations = Map<string, string>;
interface Wildcard {
  matcher: string;
  message: string;
}

export interface WordSegment {
  final?: boolean;
  correct: string[];
  explanations: Explanations;
  wildcards?: Wildcard[];
  hint?: string;
}

export interface Word {
  display: string;
  audio?: string;
  instructions?: string;
  segments: WordSegment[];
}

interface SegmentMatch {
  correct: boolean;
  message?: string;
}

export const DEFAULT_MESSAGE = "Whoops, that's not right. Try again!";
export const END_MESSAGE = "Hmmm... Are you sure there's more sounds here?";
// replaceAll is not supported in Github actions because we need node 15.x for that :'(
const KLEENE_REPLACE = new RegExp(escapeStringRegexp(escapeStringRegexp("...")), "g");
const ANY_REPLACE = new RegExp(escapeStringRegexp(escapeStringRegexp("%")), "g");

export const wildcardToRegex = (wildcard: string) => {
  const str = escapeStringRegexp(wildcard);
  const kleene = str.replace(KLEENE_REPLACE, ".*").replace(ANY_REPLACE, ".");
  return new RegExp(`^${kleene}$`, "u");
};

/**
 * Attempt to match a word segment
 * @param input The user inputted value to check
 * @param segment The word segment we are matching
 */
export const matchSegment = (rawInput: string, segment?: WordSegment): SegmentMatch => {
  if (!segment) {
    return { correct: false, message: END_MESSAGE };
  }

  const input = normalize(rawInput);

  let message: string | undefined;
  if (segment.correct.includes(input)) {
    return { correct: true };
  } else if ((message = segment.explanations.get(input))) {
    return { correct: false, message: message };
  } else if (segment.wildcards) {
    // Do the wildcard lookup :(
    const match = segment.wildcards.find(({ matcher }) => {
      return wildcardToRegex(matcher).test(input);
    });
    if (match) {
      return { correct: false, message: match.message };
    }
  }

  // Return a the end message if there are no correct options
  return { correct: false, message: segment.correct.length === 0 ? END_MESSAGE : DEFAULT_MESSAGE };
};

type Macro = string;

interface Macros {
  [k: string]: string[];
}

export const expandMacro = (str: Macro, macros: Macros, encountered: string[] = []): string[] => {
  if (macros.hasOwnProperty(str)) {
    // Key exists
    const newEncountered = [...encountered, str];
    let results: string[] = [];

    macros[str].forEach((value) => {
      if (macros.hasOwnProperty(value) && !newEncountered.includes(value)) {
        // If we find another macro we haven't encountered, append it's expansion
        const expanded = expandMacro(value, macros, newEncountered);
        results = results.concat(expanded);
      } else {
        results.push(value);
      }
    });
    return results;
  } else {
    // Resolve the base case of no macros
    return [str];
  }
};

const pickValues = <T, K extends keyof T>(values: T, ops: K[]): Pick<T, K> => {
  let result = {} as Pick<T, K>;
  ops.forEach((key) => {
    result[key] = values[key];
  });
  return result;
};

const getMacros = (macros: TaskFileMacros | undefined): Macros => {
  if (macros) {
    let result: Macros = {};
    // iterate over record
    for (const key in macros) {
      // Todo: raise an error if a key is defined twice
      result[normalize(key)] = macros[key].map(normalize);
    }
    return result;
  } else {
    return {};
  }
};

const getSegments = (segments: TaskFileSegment[], macros: Macros): WordSegment[] => {
  const validSegments = segments.map((segment, i): WordSegment => {
    let correct: string[] = [];
    let wildcards: Wildcard[] = [];
    const explanations = new Map<string, string>();
    let hint: string | undefined;

    // Record iteration
    for (const key in segment) {
      const sym = normalize(key);
      const value = segment[key];
      if (value === true) {
        // Correct value(s)
        correct = correct.concat(expandMacro(sym, macros));
      } else if (sym.includes("...") || sym.includes("%")) {
        // Wildcard matcher
        wildcards.push({ matcher: sym, message: value || DEFAULT_MESSAGE });
      } else if (sym === "HINT" && typeof value === "string") {
        // Require the optional hint to be all caps
        hint = value;
      } else {
        // We just have a normal explanation
        expandMacro(sym, macros).forEach((expand) => {
          explanations.set(expand, value || DEFAULT_MESSAGE);
        });
      }
    }
    return { correct, explanations, wildcards, hint };
  });

  // Ensure we have a final element listed
  const lastElement = validSegments[validSegments.length - 1];
  if (lastElement.correct.length === 0) {
    // Final element exists, but we don't have a termination identifier
    lastElement.correct.push("");
    lastElement.final = true;
  } else if (lastElement.correct.includes("")) {
    // All data is good. Mark as final
    lastElement.final = true;
  } else {
    // No final element existed, so we create one
    validSegments.push({ correct: [""], explanations: new Map(), final: true });
  }

  return validSegments;
};

// TODO: Actually do validations and make this type safe
export const parseTask = (contents: string): TaskDef => {
  const valid = parse(contents, TaskFile);

  const metadata = pickValues(valid, ["author", "title", "salt", "instructions"]);
  const macros = getMacros(valid.macros);
  const words = valid.words.map((word): Word => {
    const meta = pickValues(word, ["display", "audio", "instructions"]);
    const segments = getSegments(word.segments, macros);
    return { ...meta, segments };
  });

  return { ...metadata, macros, words };
};
