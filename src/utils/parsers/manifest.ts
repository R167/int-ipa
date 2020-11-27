import { ManifestDef, ManifestFile } from "../../data/manifest";
import { parse } from "./parse";

export type { ManifestDef } from "../../data/manifest";

export const parseManifest = (contents: string): ManifestDef => parse(contents, ManifestFile);
