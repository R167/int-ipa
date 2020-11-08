import React, { useContext } from "react";
import { useAsync, UseAsyncReturn } from "react-async-hook";
import YAML from "yaml";
import { MANIFEST_FILE } from "./constants";

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
  return YAML.parse(body, { prettyErrors: true });
};

export const useManifest = () => {
  const asyncManifest = useContext(ManifestContext);
  if (!asyncManifest) {
    // Absurd
    throw "Error: you must create an initial manifest object";
  }
  return asyncManifest;
};

type Props = {
  children: React.ReactNode;
};

// Only show the error once
let errorShown = false;

const Manifest = ({ children }: Props) => {
  const manifest = useAsync(fetchManifest, []);
  if (manifest.error && !errorShown) {
    errorShown = true;
    console.log(manifest.error.message);
    console.log(manifest.error);
    if (manifest.error.name.match(/^YAML/)) {
      // This is a YAML error
      alert(
        `Error: Your manifest.yaml contains invalid syntax. Please check the console for more info.`
      );
    } else {
      alert("There was an error loading your manifest.yaml");
    }
  }
  return <ManifestContext.Provider value={manifest}>{children}</ManifestContext.Provider>;
};

export default Manifest;
