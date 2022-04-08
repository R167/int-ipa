import { createContext, useContext } from "react";
import { useAsync } from "react-async-hook";
import { YAMLError } from "yaml/util";

import { MANIFEST_FILE } from "./constants";
import { ValidateError } from "./utils/error";

import { ManifestDef, parseManifest } from "./utils/parsers";

interface AsyncManifest {
  error: Error | undefined;
  loading: boolean;
  fetched: boolean;
  result: ManifestDef | undefined;
}

const ManifestContext = createContext<AsyncManifest | null>(null);

const fetchManifest = async () => {
  const req = await fetch(MANIFEST_FILE, { credentials: "same-origin" });
  const body = await req.text();
  // console.log(YAML.parseDocument(body, { prettyErrors: true }));
  return { manifest: parseManifest(body), raw: body };
};

export const useManifest = () => {
  const asyncManifest = useContext(ManifestContext);
  if (!asyncManifest) {
    // Absurd
    throw new Error("Error: you must wrap in a <Manifest> context");
  }
  return asyncManifest;
};

type Props = {
  children: React.ReactNode;
};

const MANIFEST_KEY = "cached_manifest";

// Only show the error once. Globals are terrible, but this context can only exist once
let errorShown = false;

const Manifest = ({ children }: Props) => {
  // TODO: Setup to use localStorage as the default and fetch asynchronously to check for updates
  const { result, error, loading } = useAsync(fetchManifest, []);

  const manifest = {
    loading,
    error,
    fetched: true,
    result: result?.manifest,
  };

  if (loading && !error) {
    // Cache load logic
    try {
      const cachedBody = localStorage.getItem(MANIFEST_KEY);
      if (cachedBody) {
        manifest.result = parseManifest(cachedBody);
        manifest.fetched = false;
        manifest.loading = false;
      }
    } catch {
      // Silently ignore a failed cache load and fallback to manifest loading
    }
  } else if (error && !errorShown) {
    // Error handling logic
    errorShown = true;
    console.error(error);
    if (error instanceof YAMLError) {
      // This is a YAML error
      alert(
        `Error: Your manifest.yaml contains invalid syntax. Please check the console for more info.`
      );
    } else if (error instanceof ValidateError) {
      alert(`Issue parsing manifest.yaml: ${error.message}`);
    } else {
      alert("There was an error loading your manifest.yaml");
    }
  } else if (result?.raw) {
    // Cache save logic
    localStorage.setItem(MANIFEST_KEY, result.raw);
  }

  return <ManifestContext.Provider value={manifest}>{children}</ManifestContext.Provider>;
};

export default Manifest;
