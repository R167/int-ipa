import { RefObject, useCallback, useEffect, useMemo, useReducer, useRef } from "react";

interface Action<T> {
  type: T;
}

interface ValueAction<T> extends Action<T> {
  type: T;
  value: string;
}

type Actions = Action<"delete"> | ValueAction<"append"> | ValueAction<"set">;
interface State {
  cursor: number;
  value: string;
  ref: RefObject<HTMLInputElement>;
}

function reducer(state: State, action: Actions): State {
  const { value } = state;
  // make broad assumptions about never having a large cursor selection
  const cursor = state.ref?.current?.selectionStart || 0;
  const cursorAfter = state.ref?.current?.selectionEnd || cursor;
  switch (action.type) {
    case "delete":
      if (cursor !== cursorAfter) {
        return {
          ...state,
          cursor: cursor,
          value: value.slice(0, cursor) + value.slice(cursorAfter, value.length),
        };
      } else if (cursor === 0) {
        return state;
      } else {
        return {
          ...state,
          cursor: cursor - 1,
          value: value.slice(0, cursor - 1) + value.slice(cursor, value.length),
        };
      }
    case "append":
      return {
        ...state,
        cursor: cursor + action.value.length,
        value: value.slice(0, cursor) + action.value + value.slice(cursorAfter, value.length),
      };
    case "set":
      return { ...state, value: action.value };
  }
}

const useKeyboard = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [{ cursor, value }, dispatch] = useReducer(reducer, {
    cursor: 0,
    value: "",
    ref: inputRef,
  });

  const handleKeyboard = useCallback(
    (char: string) => dispatch({ type: "append", value: char }),
    []
  );
  const setValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: "set", value: e.target.value }),
    []
  );
  const handleDelete = useCallback(() => dispatch({ type: "delete" }), []);

  useEffect(() => {
    // Current hypothesis is that the value can end up getting updated after the element
    // changes. If this happens, then chrome ends up with the cursor stuck at 0 ~half the time
    setTimeout(() => {
      // I tried both ways (leaving the text focused or not) and blur was a better experience
      inputRef?.current?.setSelectionRange(cursor, cursor);
      inputRef?.current?.blur();
    }, 0);
  }, [cursor]);

  return { handleKeyboard, handleDelete, setValue, value, ref: inputRef };
};

export default useKeyboard;
