import YAML from "yaml";
import { Struct, validate } from "superstruct";
import { IPAError, ParseError, ValidateError } from "../error";

export const parse = <T, S>(contents: string, struct: Struct<T, S>): T => {
  const doc = YAML.parseDocument(contents, { prettyErrors: true });

  doc.warnings.forEach((warning) => console.warn(warning));

  if (doc.errors.length > 0) {
    // Log all of the errors, but only throw the first one.
    doc.errors.forEach((err) => console.error(err));
    throw new ParseError(contents, doc.errors[0]);
  }
  const fileContents = doc.toJSON();

  const [err, valid] = validate(fileContents, struct);
  if (!valid) {
    if (!err) {
      throw new IPAError("Bad state. Both No valid and no error!");
    }
    throw new ValidateError(contents, doc, err);
  }

  return valid;
};
