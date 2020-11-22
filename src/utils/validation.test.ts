import { computeHash, validateHash } from "./validation";

const SALT = "pepper";

it("computes a hash correctly", async () => {
  expect(await computeHash("winston", SALT, true, "r167")).toEqual("winston_r167_aafnararswwf7vzn");
});

it("validates a hash correctly", async () => {
  expect(await validateHash("winston_r167_aafnararswwf7vzn", SALT)).toBe(true);
  expect(await validateHash("WINSTON_R167_aafnararswwf7vzn", SALT)).toBe(true);
  expect(await validateHash("winston_r167_aafnararswwf7vzn", "SALT")).toBe(false);
  expect(await validateHash("winston", SALT)).toBe(false);
});
