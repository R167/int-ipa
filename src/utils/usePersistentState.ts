import { useCallback, useDebugValue, useEffect, useRef, useState } from "react";

type JSONSafe = string | number | boolean | null;

export const usePersistentState = <T = JSONSafe>(
  key: string,
  defaultValue: T,
  persistOnLoad = false
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const mount = useRef(false);
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    if (stored === null) {
      return defaultValue;
    } else {
      return JSON.parse(stored) as T;
    }
  });

  useDebugValue({ [key]: value });

  const setter = useCallback((prevState: React.SetStateAction<T>) => {
    setValue(prevState);
  }, []);

  useEffect(() => {
    if (mount.current || persistOnLoad) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      mount.current = true;
    }
  }, [key, value, persistOnLoad]);

  return [value, setter];
};
