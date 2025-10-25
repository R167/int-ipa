import { createContext, useContext, useEffect, useState } from "react";
import { useAsync } from "react-async-hook";
import { YAMLError } from "yaml/util";

import { MANIFEST_FILE } from "./constants";
import { ValidateError } from "./utils/error";
import { ManifestDef, parseManifest } from "./utils/parsers";
import { secureGetItem, secureSetItem } from "./utils/secureStorage";

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
  const { result, error, loading } = useAsync(fetchManifest, []);
  const [cachedManifest, setCachedManifest] = useState<ManifestDef | undefined>(undefined);

  // Load cached manifest on mount
  useEffect(() => {
    const loadCache = async () => {
      try {
        const cached = await secureGetItem<string>(MANIFEST_KEY);
        if (cached) {
          const parsed = parseManifest(cached);
          setCachedManifest(parsed);
        }
      } catch (err) {
        console.warn("Failed to load cached manifest:", err);
      }
    };

    loadCache();
  }, []);

  // Save manifest to cache when loaded
  useEffect(() => {
    const saveCache = async () => {
      if (result?.raw) {
        try {
          await secureSetItem(MANIFEST_KEY, result.raw);
        } catch (err) {
          console.warn("Failed to cache manifest:", err);
        }
      }
    };

    saveCache();
  }, [result]);

  // Handle errors
  useEffect(() => {
    if (error && !errorShown) {
      errorShown = true;
      console.error(error);
      if (error instanceof YAMLError) {
        alert(
          `Error: Your manifest.yaml contains invalid syntax. Please check the console for more info.`
        );
      } else if (error instanceof ValidateError) {
        alert(`Issue parsing manifest.yaml: ${error.message}`);
      } else {
        alert("There was an error loading your manifest.yaml");
      }
    }
  }, [error]);

  const manifest = {
    loading: loading && !cachedManifest,
    error,
    fetched: !loading || !!result,
    result: result?.manifest || cachedManifest,
  };

  return <ManifestContext.Provider value={manifest}>{children}</ManifestContext.Provider>;
};

export default Manifest;
