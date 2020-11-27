import YAML from "yaml";
import { Struct, validate } from "superstruct";
import { IPAError, ValidateError } from "../error";

export const parse = <T, S>(contents: string, struct: Struct<T, S>): T => {
  const fileContents = YAML.parse(contents, { prettyErrors: true });

  const [err, valid] = validate(fileContents, struct);
  if (!valid) {
    if (!err) {
      throw new IPAError("Bad state. Both No valid and no error!");
    }
    throw new ValidateError(contents, YAML.parseDocument(contents), err);
  }

  return valid;
};
