import React, { useContext } from "react";
import { UseAsyncReturn, useAsync } from "react-async-hook";
import { YAMLError } from "yaml/util";
import { MANIFEST_FILE } from "./constants";
import { ValidateError } from "./utils/error";

import { ManifestDef, parseManifest } from "./utils/parsers";

const ManifestContext = React.createContext<UseAsyncReturn<ManifestDef, never[]> | null>(null);

const fetchManifest = async (): Promise<ManifestDef> => {
  // TODO: Change to force fetch even when cached
  const req = await fetch(MANIFEST_FILE);
  const body = await req.text();
  // console.log(YAML.parseDocument(body, { prettyErrors: true }));
  return parseManifest(body);
};

export const useManifest = () => {
  const asyncManifest = useContext(ManifestContext);
  if (!asyncManifest) {
    // Absurd
    throw new Error("Error: you must create an initial manifest object");
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
    console.error(manifest.error);
    if (manifest.error instanceof YAMLError) {
      // This is a YAML error
      alert(
        `Error: Your manifest.yaml contains invalid syntax. Please check the console for more info.`
      );
    } else if (manifest.error instanceof ValidateError) {
      alert(`Issue parsing manifest.yaml: ${manifest.error.message}`);
    } else {
      alert("There was an error loading your manifest.yaml");
    }
  }
  return <ManifestContext.Provider value={manifest}>{children}</ManifestContext.Provider>;
};

export default Manifest;
