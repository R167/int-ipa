import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const DebugContext = React.createContext(false);

export const useDebugContext = () => React.useContext(DebugContext);

const Debug = (props: { children: React.ReactNode }) => {
  const [debug, setDebug] = useLocalStorage("debug_mode", false);

  React.useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "." && e.metaKey && e.shiftKey) {
        setDebug((d) => !d);
      }
    });
  }, [setDebug]);

  return <DebugContext.Provider value={debug}>{props.children}</DebugContext.Provider>;
};

export default Debug;