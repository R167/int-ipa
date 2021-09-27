import { Infer, array, boolean, object, optional, string } from "superstruct";

export type ManifestDef = Infer<typeof ManifestFile>;

export const ManifestFile = object({
  homepage: object({ title: string(), body: string() }),
  classes: array(
    object({
      name: string(),
      folder: string(),
      hidden: optional(boolean()),
    })
  ),
  ipaPlayer: optional(
    object({
      enabled: boolean(),
      // Like everything, this is resolved relative to the base of the install
      url: string(),
    })
  ),
});
