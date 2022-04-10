import { RefObject, useCallback, useDebugValue, useLayoutEffect, useReducer, useRef } from "react";

interface Action<T> {
  type: T;
}

interface ValueAction<T> extends Action<T> {
  value: string;
}

enum Op {
  Delete,
  Append,
  Set,
  Type,
}

type Actions =
  | Action<Op.Delete>
  | ValueAction<Op.Append>
  | ValueAction<Op.Set>
  | ValueAction<Op.Type>;

interface State {
  cursor: number;
  value: string;
  ref: RefObject<HTMLInputElement>;
}

function reducer(state: State, action: Actions): State {
  const { value } = state;
  // make broad assumptions about never having a large cursor selection
  const cursor = state.ref?.current?.selectionStart || 0;
  // console.log({ src: "ref", cursor: state.ref?.current?.selectionStart });
  // console.log({ src: "reducer", cursor: cursor });
  const cursorAfter = state.ref?.current?.selectionEnd || cursor;
  switch (action.type) {
    case Op.Delete:
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
    case Op.Append:
      return {
        ...state,
        cursor: cursor + action.value.length,
        value: value.slice(0, cursor) + action.value + value.slice(cursorAfter, value.length),
      };
    case Op.Set:
      return { ...state, value: action.value, cursor: action.value.length };
    case Op.Type:
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
    (char: string) => dispatch({ type: Op.Append, value: char }),
    []
  );
  const handleType = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: Op.Type, value: e.target.value }),
    []
  );
  const handleDelete = useCallback(() => dispatch({ type: Op.Delete }), []);
  const setValue = useCallback((val: string) => dispatch({ type: Op.Set, value: val }), []);

  useLayoutEffect(() => {
    // Current hypothesis is that the value can end up getting updated after the element
    // changes. If this happens, then chrome ends up with the cursor stuck at 0 ~half the time
    // Edit: Still broken.
    // I tried both ways (leaving the text focused or not) and blur was a better experience
    const oldFocus = document.activeElement as HTMLInputElement;
    inputRef.current?.focus({ preventScroll: true });
    inputRef.current?.setSelectionRange(cursor, cursor);
    inputRef.current?.blur();
    oldFocus?.focus({ preventScroll: true });
  }, [cursor]);

  useDebugValue({ cursor: cursor, value: value });

  return { handleKeyboard, handleDelete, handleType, setValue, value, ref: inputRef };
};

export default useKeyboard;
