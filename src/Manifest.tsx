import React, { useContext } from "react";
import { useAsync, UseAsyncReturn } from "react-async-hook";
import YAML from "yaml";

const MANIFEST_FILE = "/manifest.yaml";

export interface Class {
  name: string;
  folder: string;
  hidden?: boolean;
}

export type ClassList = Class[];

export interface ManifestType {
  classes: ClassList;
}

const ManifestContext = React.createContext<UseAsyncReturn<ManifestType, never[]> | null>(null);

const fetchManifest = async (): Promise<ManifestType> => {
  const req = await fetch(MANIFEST_FILE, {
    method: "GET",
    credentials: "include",
    mode: "no-cors",
  });
  const body = await req.text();
  return YAML.parse(body);
};

export const useManifest = () => {
  const asyncManifest = useContext(ManifestContext);
  if (!asyncManifest) {
    throw "Error: you must create an initial manifest object";
  }
  return asyncManifest;
};

type Props = {
  children: React.ReactNode;
};

const Manifest = ({ children }: Props) => {
  const manifest = useAsync(fetchManifest, []);
  return <ManifestContext.Provider value={manifest}>{children}</ManifestContext.Provider>;
};

export default Manifest;
