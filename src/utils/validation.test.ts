import { checkHash, computeHash } from "./validation";

const SALT = "pepper";

const R167_DATE = new Date("2022-06-26T20:31:00.000Z");

describe("computeHash", () => {
  it("computes a hash correctly", async () => {
    expect(await computeHash("winston", SALT, true, "r167")).toEqual(
      "winston_4ara1f6n7ararswwf7vzn"
    );
  });

  it("returns same capitalization", async () => {
    expect(await computeHash("WInston", SALT, true, "r167")).toEqual(
      "WInston_4ara1f6n7ararswwf7vzn"
    );
  });

  it("skips missing names and run = false", async () => {
    expect(await computeHash(undefined, SALT, true)).toBe(undefined);
    expect(await computeHash("winston", SALT, false)).toBe(undefined);
  });

  it("uses the default salt when missing", async () => {
    expect(await computeHash("winston", undefined, true, "r167")).toBe(
      "winston_44rt1s6u7pcyrsmqpuq4u"
    );
    expect(await computeHash("winston", "", true, "r167")).toBe("winston_44rt1s6u7pcyrsmqpuq4u");
  });
});

describe("checkHash", () => {
  beforeEach(() => {
    console.warn = jest.fn();
  });

  const validateHash = async (...args: Parameters<typeof checkHash>) =>
    (await checkHash(...args)).correct;

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

  it("correctly handles capital letters", async () => {
    const val = await checkHash("WINSTON-durand_4trw1u697ca7il5o8anl2", SALT);
    expect(val.correct).toBe(true);
    expect(val.name).toEqual("WINSTON-durand");
    expect(val.date).toEqual(R167_DATE);
  });

  it("uses the default salt", async () => {
    expect(await validateHash("winston_4ara1f6n7ararswwf7vzn")).toBe(false);
    expect(await validateHash("winston_429dmel7lios3b4lp27kq")).toBe(true);
  });
});
