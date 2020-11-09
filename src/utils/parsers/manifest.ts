import YAML from "yaml";

export interface Class {
  name: string;
  folder: string;
  hidden?: boolean;
}

export type ClassList = Class[];

export interface ManifestType {
  classes: ClassList;
}

export const parseManifest = () => {};
