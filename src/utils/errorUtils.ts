// Error handling utilities

/**
 * Wraps an async function with error handling and logging.
 */
export async function handleAsyncError(
  asyncFn: () => Promise<unknown>,
  operationName: string,
  onError: ((error: unknown) => void) | null = null,
): Promise<unknown> {
  try {
    return await asyncFn();
  } catch (error) {
    console.error(`Error in ${operationName}:`, error);
    if (onError) {
      onError(error);
    }
    throw error;
  }
}

/**
 * Wraps a synchronous function with error handling and logging.
 */
export function handleError(
  fn: () => unknown,
  operationName: string,
  onError: ((error: unknown) => void) | null = null,
): unknown {
  try {
    return fn();
  } catch (error) {
    console.error(`Error in ${operationName}:`, error);
    if (onError) {
      onError(error);
    }
    throw error;
  }
}
