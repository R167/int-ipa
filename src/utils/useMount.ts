import { useEffect, useRef } from "react";

const useMount = () => {
  const mountRef = useRef(true);
  useEffect(() => {
    mountRef.current = false;
  }, []);
  return mountRef.current;
};

export default useMount;
