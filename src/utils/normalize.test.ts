import normalize from "./normalize";

it("expands symbols", () => {
  expect(normalize("\u00F1")).toEqual("n\u0303");
});

it("sorts to correct order", () => {
  // Descender should be before ascender in t̥̃
  expect(normalize("t\u0303\u0325")).toEqual("t\u0325\u0303");
});
