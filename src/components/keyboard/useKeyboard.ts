import { RefObject, useCallback, useDebugValue, useLayoutEffect, useReducer, useRef } from "react";

interface Action<T> {
  type: T;
}

interface ValueAction<T, V = string> extends Action<T> {
  value: V;
}

enum Op {
  Delete,
  Append,
  Set,
  Type,
  MoveCursor,
}

type Actions =
  | Action<Op.Delete>
  | ValueAction<Op.Append>
  | ValueAction<Op.Set>
  | ValueAction<Op.Type>
  | Action<Op.MoveCursor>;

interface State {
  cursor: number;
  cursorAfter: number;
  value: string;
  ref: RefObject<HTMLInputElement>;
}

function reducer(state: State, action: Actions): State {
  const { value } = state;

  const focused = state.ref.current === document.activeElement || action.type === Op.MoveCursor;
  // make broad assumptions about never having a large cursor selection
  const cursor = focused ? state.ref.current?.selectionStart || 0 : state.cursor;
  const cursorAfter = focused ? state.ref.current?.selectionEnd || cursor : state.cursorAfter;

  const newState = (updates: Partial<State>): State => {
    const cursorAfter =
      updates.cursorAfter !== undefined
        ? updates.cursorAfter
        : updates.cursor !== undefined
        ? updates.cursor
        : state.cursorAfter;
    return { ...state, ...updates, cursorAfter };
  };

  switch (action.type) {
    case Op.Delete:
      if (cursor !== cursorAfter) {
        return newState({
          cursor,
          cursorAfter: cursor,
          value: value.slice(0, cursor) + value.slice(cursorAfter, value.length),
        });
      } else if (cursor === 0) {
        return state;
      } else {
        const v = newState({
          cursor: cursor - 1,
          value: value.slice(0, cursor - 1) + value.slice(cursor, value.length),
        });
        return v;
      }
    case Op.Append:
      return newState({
        cursor: cursor + action.value.length,
        value: value.slice(0, cursor) + action.value + value.slice(cursorAfter, value.length),
      });
    case Op.Set:
      return newState({ value: action.value, cursor: action.value.length });
    case Op.Type:
      return newState({ cursor, cursorAfter, value: action.value });
    case Op.MoveCursor:
      return newState({ cursor, cursorAfter });
  }
}

const useKeyboard = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [{ cursor, cursorAfter, value }, dispatch] = useReducer(reducer, {
    cursor: 0,
    cursorAfter: 0,
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
    const currentFocus = document.activeElement as HTMLElement;
    const currRef = inputRef.current;

    const updateRange = () => {
      // the focus call should be optional, but eh
      currRef?.focus({ preventScroll: true });
      currRef?.setSelectionRange(cursor, cursorAfter);
    };
    const moveCursor = () => {
      dispatch({ type: Op.MoveCursor });
    };

    if (currentFocus === currRef) {
      updateRange();
    }

    currRef?.addEventListener("focus", updateRange);
    currRef?.addEventListener("blur", moveCursor);
    return () => {
      currRef?.removeEventListener("focus", updateRange);
      currRef?.removeEventListener("blur", moveCursor);
    };
  }, [cursor, cursorAfter]);

  useDebugValue({ cursor: cursor, value: value });

  return { handleKeyboard, handleDelete, handleType, setValue, value, ref: inputRef };
};

export default useKeyboard;
