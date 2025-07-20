import { useState, useCallback } from "react";

export function useAsyncState<T = unknown>(initialData: T | null = null) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(initialData);

  const runAsync = useCallback(
    async (
      asyncFn: (...args: unknown[]) => Promise<T>,
      ...args: unknown[]
    ): Promise<T | null> => {
      setLoading(true);
      setError(null);
      try {
        const result = await asyncFn(...args);
        setData(result);
        return result;
      } catch (err) {
        if (
          err &&
          typeof err === "object" &&
          "message" in err &&
          typeof (err as { message: unknown }).message === "string"
        ) {
          setError((err as { message: string }).message);
        } else {
          setError("An error occurred");
        }
        setData(null);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    loading,
    error,
    data,
    setLoading,
    setError,
    setData,
    runAsync,
  };
}
