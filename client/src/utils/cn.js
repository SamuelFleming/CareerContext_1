// client/src/utils/cn.js
import clsx from "clsx";

/**
 * Compose class names for component variants.
 * Backed by clsx; falls back gracefully to a simple join if needed.
 */
export function cn(...inputs) {
  return clsx(inputs);
}
