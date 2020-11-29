import { Document } from "yaml";
import { StructError } from "superstruct";
import { YAMLError } from "yaml/util";

export class IPAError extends Error {}

interface Line {
  num: number;
  contents: string;
  error: boolean;
}

// Note: line is assumed one indexed
const getLines = (lines: string | string[], lineIdx: number, context: number): Line[] => {
  const lineArr = typeof lines === "string" ? lines.split("\n") : lines;
  const line = lineIdx - 1;

  const start = Math.max(line - context, 0);
  const errorLine = Math.max(line, line - context) - start;

  if (line < 0) {
    return [];
  } else {
    return lineArr.slice(line - context, line + context + 1).map((contents, i) => ({
      num: start + i + 1,
      contents,
      error: i === errorLine,
    }));
  }
};

const indexToLines = (str: string, idx: number, context: number): Line[] => {
  const lines = str.split("\n");

  // Yes, we need this here from function
  const line = lines.findIndex(
    function (this: { pos: number }, ln) {
      this.pos += ln.length + 1;
      return idx < this.pos;
    },
    { pos: 0 }
  );

  return getLines(lines, line + 1, context);
};

interface ContextError {
  context(n?: number): Line[];
}

export const isContextError = (o: any): o is ContextError => {
  return o instanceof IPAError && "context" in o;
};

export class ParseError extends IPAError implements ContextError {
  dat: string;
  err: YAMLError;

  constructor(data: string, err: YAMLError) {
    super(err.message);
    this.dat = data;
    this.err = err;
  }

  context(n = 1) {
    const linePos = this.err.linePos?.start;
    if (linePos) {
      return getLines(this.dat, linePos.line, n);
    } else {
      return [];
    }
  }
}

export class ValidateError extends IPAError implements ContextError {
  dat: string;
  doc: Document;
  err: StructError;

  constructor(data: string, document: Document, err: StructError) {
    super(err.message);
    this.dat = data;
    this.doc = document;
    this.err = err;
  }

  context(n = 1) {
    const node = this.doc.getIn(this.err.path, true);
    return indexToLines(this.dat, node.range[0], n);
  }
}
