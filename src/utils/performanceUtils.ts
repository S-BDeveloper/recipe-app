// Performance utilities

/**
 * Measures execution time of a function and logs it in development mode.
 * @param {string} label
 * @param {Function} fn
 * @returns {unknown}
 */
export function measureTime(label: string, fn: () => unknown) {
  const startTime = performance.now();
  const result = fn();
  const endTime = performance.now();

  if (import.meta.env.DEV) {
    console.log(`${label} took ${(endTime - startTime).toFixed(2)}ms`);
  }

  return result;
}

/**
 * Measures execution time of an async function and logs it in development mode.
 * @param {string} label
 * @param {Function} fn
 * @returns {Promise<unknown>}
 */
export async function measureTimeAsync(
  label: string,
  fn: () => Promise<unknown>,
) {
  const startTime = performance.now();
  const result = await fn();
  const endTime = performance.now();

  if (import.meta.env.DEV) {
    console.log(`${label} took ${(endTime - startTime).toFixed(2)}ms`);
  }

  return result;
}
