const [up, down, left, right] = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"] as const;
const Pattern = [up, up, down, down, left, right, left, right, "b", "a"] as const;

export const buildHandler = (action: () => void) => {
  let curr = 0;
  let reset: NodeJS.Timeout;

  return (e: KeyboardEvent) => {
    if (e.key === Pattern[curr]) {
      clearTimeout(reset);
      reset = setTimeout(() => (curr = 0), 1000);
      curr += 1;
      if (curr === Pattern.length) {
        action();
        curr = 0;
      }
    } else {
      curr = 0;
    }
  };
};

export const register = (func: () => void) => {
  const handler = buildHandler(func);
  document.addEventListener("keydown", handler);
  return () => document.removeEventListener("keydown", handler);
};
