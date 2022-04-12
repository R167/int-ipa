import { useReducer } from "react";

import { Word } from "../../utils/parsers/task";

const ATTEMPTS_BEFORE_HINT = 5;

export enum Op {
  Reset,
  SoftReset,
  SetHeader,
  NextSegment,
  ErrorMessage,
  ClearError,
}

interface State {
  word: Word;
  segment: number;
  header: string;
  errorMessage?: string;
  error: boolean;
  attempt: number;
}

interface Action<T> {
  type: T;
}

interface SetAction<T, V> extends Action<T> {
  value: V;
}

type Act =
  | SetAction<Op.Reset, Word>
  | SetAction<Op.SoftReset, Word>
  | SetAction<Op.SetHeader, string>
  | SetAction<Op.NextSegment, string>
  | SetAction<Op.ErrorMessage, string | undefined>
  | Action<Op.ClearError>;

const reset = (word: Word) => {
  return {
    word,
    segment: 0,
    header: "",
    error: false,
    attempt: 0,
  };
};

const reducer = (state: State, action: Act): State => {
  switch (action.type) {
    case Op.SoftReset:
      return Object.is(action.value, state.word) ? state : reset(action.value);
    case Op.Reset:
      return reset(action.value);
    case Op.SetHeader:
      return { ...state, header: action.value };
    case Op.NextSegment: // Inc segment and add value to header
      return {
        ...state,
        segment: state.segment + 1,
        header: state.header + action.value,
        attempt: 0,
      };
    case Op.ClearError:
      return state.error ? { ...state, error: false } : state;
    case Op.ErrorMessage:
      const { attempt } = state;
      const { hint } = state.word.segments[state.segment];
      // if the user has failed too many times, display the hint instead of error message if it exists
      const errorMessage = attempt >= ATTEMPTS_BEFORE_HINT && hint ? hint : action.value;
      return { ...state, error: true, errorMessage, attempt: attempt + 1 };
  }
};

export const useWordInput = (word: Word) => {
  return useReducer(reducer, word, reset);
};
