import { useCallback, useEffect, useState } from "react";

/** useState that persists to localStorage and survives private-mode/quota errors. */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? initial : (JSON.parse(raw) as T);
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable: keep in memory only */
    }
  }, [key, value]);

  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
    setValue(initial);
  }, [key, initial]);

  return [value, setValue, remove] as const;
}
