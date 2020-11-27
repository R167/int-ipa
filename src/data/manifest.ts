import { Infer, array, boolean, object, optional, string, type } from "superstruct";

export type ManifestDef = Infer<typeof ManifestFile>;

export const ManifestFile = type({
  classes: array(
    object({
      name: string(),
      folder: string(),
      hidden: optional(boolean()),
    })
  ),
});
