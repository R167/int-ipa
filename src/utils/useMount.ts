import { useEffect, useRef } from "react";

export const useMount = () => {
  const mountRef = useRef(true);
  useEffect(() => {
    mountRef.current = false;
  }, []);
  return mountRef.current;
};
