import { computeHash, validateHash } from "./validation";

const SALT = "pepper";

describe("computeHash", () => {
  it("computes a hash correctly", async () => {
    expect(await computeHash("winston", SALT, true, "r167")).toEqual(
      "winston_4ara1f6n7ararswwf7vzn"
    );
  });

  it("skips missing names and run = false", async () => {
    expect(await computeHash(undefined, SALT, true)).toBe(undefined);
    expect(await computeHash("winston", SALT, false)).toBe(undefined);
  });
});

describe("validateHash", () => {
  beforeEach(() => {
    console.warn = jest.fn();
  });

  it("validates a hash correctly", async () => {
    expect(await validateHash("winston_4ara1f6n7ararswwf7vzn", SALT)).toBe(true);
    expect(await validateHash("winston_4ara1f6n7ararswwf7vzn", "SALT")).toBe(false);
  });

  it("validates regardless of case", async () => {
    expect(await validateHash("winSTON_4aRa1f6n7ARARswwf7vzn", SALT)).toBe(true);
  });

  it("fails when missing params", async () => {
    expect(await validateHash("winston", SALT)).toBe(false);
  });
});
