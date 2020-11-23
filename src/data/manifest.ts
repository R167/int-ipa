import { object, array, boolean, string, optional, Infer } from "superstruct";

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
