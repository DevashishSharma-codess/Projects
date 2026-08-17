import { theme } from "./theme.js";

/**
 * Format raw bytes into human readable file size
 */
export function formatBytes(bytes, decimals = 2) {
  if (!bytes || bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Format key-value dictionary into styled terminal key-value pairs
 */
export function formatKeyValuePairs(obj) {
  return Object.entries(obj).map(([key, val]) => {
    return `${theme.accent(key.padEnd(16, " "))}: ${theme.text(String(val))}`;
  });
}
