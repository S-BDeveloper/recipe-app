// Formatting utilities

/**
 * Formats a number with commas for thousands.
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Formats a number as currency.
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Formats a number as a percentage.
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Formats a file size in bytes to human readable format.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Capitalizes the first letter of each word in a string.
 */
export function capitalizeWords(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt: string) =>
      txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
  );
}
