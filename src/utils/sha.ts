// Generate the sha256 for a string
export const sha256 = async (buf: Uint8Array): Promise<string> => {
  const digest = await window.crypto.subtle.digest("SHA-256", buf);
  const hashArray = Array.from(new Uint8Array(digest));
  const hashHex = hashArray.map((b) => ("00" + b.toString(16)).slice(-2)).join("");
  return hashHex;
};
