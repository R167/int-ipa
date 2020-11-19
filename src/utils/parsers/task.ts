import YAML from "yaml";
import escapeStringRegexp from "escape-string-regexp";
import normalize from "../normalize";

export interface TaskDef {
  author: string;
  title: string;
  instructions?: string;
  salt?: string;
  answer?: string;
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
}

export interface Word {
  display: string;
  audio?: string;
  segments: WordSegment[];
}

interface SegmentMatch {
  correct: boolean;
  message?: string;
}

export const DEFAULT_MESSAGE = "Whoops, that's not right. Try again!";
export const END_MESSAGE = "Hmmm... Are you sure there's more sounds here?";
const REGEX_REPLACE = escapeStringRegexp("...");

export const wildcardToRegex = (wildcard: string) => {
  const str = escapeStringRegexp(wildcard);
  return new RegExp(`^${str.replaceAll(REGEX_REPLACE, ".*")}$`, "u");
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

const pickValues = <T extends { [k: string]: boolean }>(
  values: any,
  ops: T
): { [K in keyof T]: T[K] extends true ? string : string | undefined } => {
  let result: any = {};
  for (const key in ops) {
    if (ops[key] && !values.hasOwnProperty(key)) {
      throw new Error(`Missing required property ${key}`);
    }
    result[key] = values[key];
  }
  return result;
};

const getMacros = (macros: any): Macros => {
  if (macros) {
    // TODO: add real type safety here
    let result: Macros = {};
    for (const key in macros) {
      result[normalize(key)] = macros[key].map(normalize);
    }

    return result;
  } else {
    return {};
  }
};

// I am not proud of this method...
const getSegments = (segments: any, macros: Macros): WordSegment[] => {
  if (segments && Array.isArray(segments)) {
    const validSegments = segments.map(
      (segment: any, i): WordSegment => {
        let correct: string[] = [];
        let wildcards: Wildcard[] = [];
        const explanations = new Map<string, string>();

        for (const key in segment) {
          const sym = normalize(key);
          const value = segment[key];
          if (value === true) {
            correct = correct.concat(expandMacro(sym, macros));
          } else if (sym.includes("...")) {
            // wildcard matcher
            wildcards.push({ matcher: sym, message: value });
          } else {
            // We just have a normal explanation
            expandMacro(sym, macros).forEach((expand) => {
              explanations.set(expand, value);
            });
          }
        }

        if (i < segments.length - 1 && correct.includes("")) {
          throw new Error("You can only have the empty string as a key in the last segment");
        }

        return { correct, explanations, wildcards };
      }
    );

    // Ensure we have a final element listed
    const lastElement = validSegments[validSegments.length - 1];
    if (lastElement.correct.length === 0) {
      // Add the terminating element if it doesn't exist
      lastElement.correct.push("");
      lastElement.final = true;
    } else if (lastElement.correct.includes("")) {
      lastElement.final = true;
    } else {
      validSegments.push({ correct: [""], explanations: new Map(), final: true });
    }

    return validSegments;
  } else {
    throw new Error("Segments must be an array");
  }
};

// TODO: Actually do validations and make this type safe
export const parseTask = (contents: string): TaskDef => {
  const fileContents = YAML.parse(contents, { prettyErrors: true });
  // TODO: Write a more robust type checker than this
  const metadata = pickValues(fileContents, {
    author: true,
    title: true,
    salt: false,
    instructions: false,
    answer: false,
  });

  const macros = getMacros(fileContents.macros);
  const words = fileContents.words.map(
    (word: any): Word => {
      const meta = pickValues(word, { display: true, audio: false });
      const segments = getSegments(word.segments, macros);

      return { ...meta, segments };
    }
  );

  return { ...metadata, macros, words };
};
