import { computeHash, validateHash } from "./validation";

const SALT = "pepper";

describe("computeHash", () => {
  it("computes a hash correctly", async () => {
    expect(await computeHash("winston", SALT, true, "r167")).toEqual(
      "winston_r167_aafnararswwf7vzn"
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
    expect(await validateHash("winston_r167_aafnararswwf7vzn", SALT)).toBe(true);
    expect(await validateHash("winston_r167_aafnararswwf7vzn", "SALT")).toBe(false);
  });

  it("validates regardless of case", async () => {
    expect(await validateHash("WINSTON_R167_AAfnararswwf7vzn", SALT)).toBe(true);
  });

  it("fails when missing params", async () => {
    expect(await validateHash("winston", SALT)).toBe(false);
  });
});
