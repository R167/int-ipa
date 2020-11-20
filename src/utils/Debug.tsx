import React from "react";

const DebugContext = React.createContext(false);

export const useDebugContext = () => React.useContext(DebugContext);

const Debug = (props: { children: React.ReactNode }) => {
  const [debug, setDebug] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && e.metaKey) {
        setDebug((d) => !d);
      }
    });
  }, []);

  return <DebugContext.Provider value={debug}>{props.children}</DebugContext.Provider>;
};

export default Debug;
