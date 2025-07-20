// Array/object utilities

/**
 * Returns the number of unique values for a given key in an array of objects.
 * @param arr Array of objects
 * @param key Key of the object to count unique values by
 * @returns number of unique values
 */
export function countUniqueBy<T, K extends keyof T>(arr: T[], key: K): number {
  return new Set(arr.map((item) => item[key])).size;
}
