import { Infer, array, boolean, object, optional, string } from "superstruct";

export type ManifestDef = Infer<typeof ManifestFile>;

export const ManifestFile = object({
  classes: array(
    object({
      name: string(),
      folder: string(),
      hidden: optional(boolean()),
    })
  ),
});
