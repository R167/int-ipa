import {
  DEFAULT_MESSAGE,
  END_MESSAGE,
  WordSegment,
  expandMacro,
  matchSegment,
  wildcardToRegex,
} from "./task";

describe("expandMacros", () => {
  it("handles base string", () => {
    expect(expandMacro("test", {})).toEqual(["test"]);
  });

  it("handles base string when macros exist", () => {
    expect(expandMacro("test", { notTest: ["blah"] })).toEqual(["test"]);
  });

  it("expands macros", () => {
    expect(expandMacro("expand", { expand: ["val1", "val2"] })).toEqual(["val1", "val2"]);
  });

  it("expands nested macros", () => {
    expect(
      expandMacro("expand", { expand: ["val1", "val2", "expand2"], expand2: ["hello"] })
    ).toEqual(["val1", "val2", "hello"]);
  });

  it("prevents self recursion", () => {
    expect(expandMacro("expand", { expand: ["val1", "expand"] })).toEqual(["val1", "expand"]);
  }, 100);

  it("stops on deep recursion", () => {
    expect(
      expandMacro("expand", {
        expand: ["val1", "a"],
        a: ["b"],
        b: ["c"],
        c: ["d"],
        d: ["expand", "literal", "a"],
        literal: ["val1", "val2"],
      })
    ).toEqual(["val1", "expand", "val1", "val2", "a"]);
  }, 100);
});

describe("wildcardToRegex", () => {
  it("expands triple dot", () => {
    expect(wildcardToRegex("hello...")).toEqual(/^hello.*$/u);
  });

  it("escapes other specials", () => {
    expect(wildcardToRegex("he.*llo")).toEqual(/^he\.\*llo$/u);
  });

  it("matchers single any", () => {
    expect(wildcardToRegex("he?llo")).toEqual(/^he.llo$/u);
  });

  it("runs ? matcher", () => {
    expect("hello").toMatch(wildcardToRegex("h?llo"));
    expect("hillo").toMatch(wildcardToRegex("h?llo"));
  });

  it("creates valid matchers", () => {
    expect("hello world").toMatch(wildcardToRegex("hello..."));
    expect("_hello world").not.toMatch(wildcardToRegex("hello..."));
    expect("i̋umʂ").toMatch(wildcardToRegex("...mʂ"));
    expect("hi").toMatch(wildcardToRegex("hi..."));
  });

  it("composes multiple matchers", () => {
    const hll = wildcardToRegex("h...ll...");
    expect("hll").toMatch(hll);
    expect("hell").toMatch(hll);
    expect("hello").toMatch(hll);

    const h_any = wildcardToRegex("h?...");
    expect("h").not.toMatch(h_any);
    expect("hi").toMatch(h_any);
    expect("hello").toMatch(h_any);
  });
});

describe("matchSegment", () => {
  const segment: WordSegment = {
    correct: ["c1", "c2"],
    explanations: new Map([
      ["i1", "incorrect1"],
      ["i2", "incorrect2"],
    ]),
    wildcards: [{ matcher: "i...", message: "just wrong" }],
  };

  it("identifies correct", () => {
    expect(matchSegment("c1", segment)).toEqual({ correct: true });
    expect(matchSegment("c2", segment)).toEqual({ correct: true });
  });

  it("prefers explanations", () => {
    expect(matchSegment("i2", segment)).toEqual({ correct: false, message: "incorrect2" });
  });

  it("falls back to wildcards", () => {
    expect(matchSegment("i9", segment)).toEqual({ correct: false, message: "just wrong" });
  });

  it("no match uses default message", () => {
    expect(matchSegment("XXX", segment)).toEqual({ correct: false, message: DEFAULT_MESSAGE });
  });

  it("fails gracefully on no segment", () => {
    expect(matchSegment("XXX", undefined)).toEqual({ correct: false, message: END_MESSAGE });
  });

  it("fails gracefully on no correct", () => {
    expect(matchSegment("XXX", { correct: [], explanations: new Map() })).toEqual({
      correct: false,
      message: END_MESSAGE,
    });
  });

  it("checks for wildcards on no correct", () => {
    expect(
      matchSegment("XXX", {
        correct: [],
        explanations: new Map(),
        wildcards: [{ matcher: "...", message: "You're done" }],
      })
    ).toEqual({
      correct: false,
      message: "You're done",
    });
  });

  it("does not use wildcards in correct", () => {
    expect(matchSegment("...", { correct: ["..."], explanations: new Map() })).toEqual({
      correct: true,
    });
    expect(matchSegment("XXX", { correct: ["..."], explanations: new Map() })).toEqual(
      expect.objectContaining({
        correct: false,
      })
    );
  });
});
