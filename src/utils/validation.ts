import base64 from "base64-js";

const normName = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[\s-]+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "");
};

async function sha1sum(bytes: ArrayBuffer) {
  const buf = await crypto.subtle.digest("SHA-256", bytes);
  return base64.fromByteArray(new Uint8Array(buf));
}

const EPOCH = new Date("2020-02-02");

const minuteOfYear = () => {
  const now = new Date();
  return Math.floor((now.getTime() - EPOCH.getTime()) / 1000 / 60);
};

export const computeHash = async (
  name: string | undefined,
  salt: string,
  run: boolean,
  time?: string
) => {
  if (typeof name === "undefined" || !run) {
    return;
  }

  const nameTime = `${normName(name)}_${time || minuteOfYear().toString(36)}`;
  const input = [nameTime, salt].join("_");

  const sha1 = await sha1sum(new TextEncoder().encode(input));

  const cleanupSha1 = sha1
    .replace(/[\+\/\=]/g, "")
    .toLowerCase()
    .slice(0, 16);

  return [nameTime, cleanupSha1].join("_");
};
