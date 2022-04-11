import { createContext, useContext, useEffect } from "react";
import { buildHandler } from "./konami";
import { usePersistentState } from "./usePersistentState";

const DebugContext = createContext(false);

export const useDebugContext = () => useContext(DebugContext);

const Debug = (props: { children: React.ReactNode }) => {
  const [debug, setDebug] = usePersistentState("debug_mode", false);

  useEffect(() => {
    const incorrect = buildHandler(() => alert("You really tried that? Really?"));
    const handler = (e: KeyboardEvent) => {
      if (e.key === "." && e.metaKey && e.shiftKey) {
        setDebug((d) => !d);
      }
      incorrect(e);
    };
    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [setDebug]);

  // Register a way to toggle debugging for iOS, etc. disable in production
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      window.toggleDebug = () => setDebug((d) => !d);
    }
  }, [setDebug]);

  return <DebugContext.Provider value={debug}>{props.children}</DebugContext.Provider>;
};

export default Debug;
