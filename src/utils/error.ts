import { Document } from "yaml";
import { StructError } from "superstruct";

export class IPAError extends Error {}

interface Line {
  num: number;
  contents: string;
  error: boolean;
}

const indexToLines = (str: string, idx: number, context: number = 1) => {
  const lines = str.split("\n");

  // Yes, we need this here from function
  const line = lines.findIndex(
    function (this: { pos: number }, ln) {
      this.pos += ln.length + 1;
      return idx < this.pos;
    },
    { pos: 0 }
  );

  const start = Math.max(line - context, 0);
  const errorLine = Math.max(line, line - context) - start;

  if (line < 0) {
    return [];
  } else {
    return lines.slice(line - context, line + context + 1).map((contents, i) => ({
      num: start + i + 1,
      contents,
      error: i === errorLine,
    }));
  }
};

export class ValidateError extends IPAError {
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
