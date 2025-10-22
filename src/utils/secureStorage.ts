/**
 * Secure localStorage wrapper with integrity checking and version management
 */

import { sha256 } from "./sha";

const STORAGE_VERSION = "1.0";
const INTEGRITY_KEY = "int-ipa-integrity";

interface StoredData<T> {
  version: string;
  timestamp: number;
  data: T;
  checksum: string;
}

/**
 * Generate a checksum for data integrity verification
 */
const generateChecksum = async (data: string, key: string): Promise<string> => {
  const combined = `${key}:${data}:${INTEGRITY_KEY}`;
  return sha256(new TextEncoder().encode(combined));
};

/**
 * Verify the integrity of stored data
 */
const verifyChecksum = async (
  data: string,
  checksum: string,
  key: string
): Promise<boolean> => {
  const expected = await generateChecksum(data, key);
  return expected === checksum;
};

/**
 * Securely store data in localStorage with integrity checking
 */
export const secureSetItem = async <T>(key: string, value: T): Promise<void> => {
  try {
    const dataString = JSON.stringify(value);
    const checksum = await generateChecksum(dataString, key);

    const stored: StoredData<T> = {
      version: STORAGE_VERSION,
      timestamp: Date.now(),
      data: value,
      checksum,
    };

    localStorage.setItem(key, JSON.stringify(stored));
  } catch (error) {
    console.error(`Failed to securely store item "${key}":`, error);
    throw error;
  }
};

/**
 * Securely retrieve data from localStorage with integrity verification
 * Returns null if data is missing, corrupted, or from an incompatible version
 */
export const secureGetItem = async <T>(key: string): Promise<T | null> => {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored) as StoredData<T>;

    // Version check
    if (parsed.version !== STORAGE_VERSION) {
      console.warn(
        `Storage version mismatch for "${key}". Expected ${STORAGE_VERSION}, got ${parsed.version}`
      );
      localStorage.removeItem(key);
      return null;
    }

    // Integrity check
    const dataString = JSON.stringify(parsed.data);
    const isValid = await verifyChecksum(dataString, parsed.checksum, key);

    if (!isValid) {
      console.error(`Integrity check failed for "${key}". Data may be corrupted.`);
      localStorage.removeItem(key);
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error(`Failed to securely retrieve item "${key}":`, error);
    localStorage.removeItem(key);
    return null;
  }
};

/**
 * Remove an item from secure storage
 */
export const secureRemoveItem = (key: string): void => {
  localStorage.removeItem(key);
};

/**
 * Check if stored data is expired (older than maxAge milliseconds)
 */
export const isExpired = (key: string, maxAge: number): boolean => {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return true;

    const parsed = JSON.parse(stored) as StoredData<unknown>;
    return Date.now() - parsed.timestamp > maxAge;
  } catch {
    return true;
  }
};
