import { useState, useEffect, Dispatch, SetStateAction } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      // Ignore write errors
    }
  }, [key, value]);

  return [value, setValue];
}
