import { fromUint8Array } from "js-base64";

const normName = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[\s-]+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "");
};

async function sha1sum(bytes: ArrayBuffer) {
  const buf = await crypto.subtle.digest("SHA-256", bytes);
  return fromUint8Array(new Uint8Array(buf));
}

const EPOCH = new Date("2020-02-02");

const SHA_LENGTH = 16;

const minuteOfYear = () => {
  const now = new Date();
  return Math.floor((now.getTime() - EPOCH.getTime()) / 1000 / 60);
};

// Assume the second string is shorter
export const interleave = (longer: string, shorter: string): string => {
  const interleaved: string[] = [shorter.length.toString(36)];
  for (let i = 0; i < shorter.length; i++) {
    interleaved.push(longer.charAt(i));
    interleaved.push(shorter.charAt(i));
  }
  interleaved.push(longer.slice(shorter.length, longer.length));
  return interleaved.join("");
};

// Assume the second string is shorter
export const deinterleave = (encoded: string): [string, string] => {
  const length = parseInt(encoded.charAt(0), 36);
  const interleaved = encoded.slice(1, encoded.length);
  const longer: string[] = [];
  const shorter: string[] = [];
  for (let i = 0; i < length * 2; i += 2) {
    longer.push(interleaved.charAt(i));
    shorter.push(interleaved.charAt(i + 1));
  }
  longer.push(interleaved.slice(length * 2, interleaved.length));
  return [longer.join(""), shorter.join("")];
};

const DEFAULT_SALT = "vowelsAreCool!!!";

export const computeHash = async (
  name: string | undefined,
  salt: string | undefined,
  run: boolean = true,
  time?: string
) => {
  if (typeof name === "undefined" || !run) {
    return;
  }

  const effectiveSalt = salt || DEFAULT_SALT;

  const outName = normName(name);
  const outTime = (time || minuteOfYear().toString(36)).toLowerCase();
  const nameTime = `${outName}_${outTime}`;
  const input = [nameTime, effectiveSalt].join("_");

  const sha1 = await sha1sum(new TextEncoder().encode(input));

  // Remove special characters and limit to the first 16 chars
  const cleanupSha1 = sha1
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, SHA_LENGTH);
  const interleaved = interleave(cleanupSha1, outTime);
  return [outName, interleaved].join("_");
};

export const validateHash = async (hash: string, salt?: string) => {
  const effectiveSalt = salt || DEFAULT_SALT;

  const lowerHash = hash.toLowerCase();
  const [name, interleaved] = lowerHash.split("_", 2);
  if (!(name && interleaved)) {
    return false;
  }
  const [sha, time] = deinterleave(interleaved);
  if (sha?.length !== SHA_LENGTH) {
    console.warn("sha segment differs from expected length.");
  }
  const expected = await computeHash(name, effectiveSalt, true, time);
  return expected === lowerHash;
};
