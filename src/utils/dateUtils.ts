// Date formatting and sorting utilities

/**
 * Formats a date string or Date object to a locale date string.
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString();
}

/**
 * Sorts an array of objects by timestamp descending.
 */
export function sortByTimestampDesc(
  arr: { timestamp: string }[],
): { timestamp: string }[] {
  return arr.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
}
