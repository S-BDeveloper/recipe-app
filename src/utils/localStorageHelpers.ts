// Centralized localStorage helpers

export const getLocalStorage = (key: string, defaultValue: unknown = null) => {
  try {
    const value = localStorage.getItem(key);
    if (value === null) return defaultValue;
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  } catch (e) {
    console.warn(`Error reading localStorage[${key}]:`, e);
    return defaultValue;
  }
};

export const setLocalStorage = (key: string, value: unknown) => {
  try {
    const toStore = typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, toStore);
    return true;
  } catch (e) {
    console.warn(`Error writing localStorage[${key}]:`, e);
    return false;
  }
};

export const removeLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    console.warn(`Error removing localStorage[${key}]:`, e);
    return false;
  }
};
