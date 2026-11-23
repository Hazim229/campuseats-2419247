import { useEffect, useState } from "react";
function readValue(key, initialValue) {
  try {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  } catch (error) {
    console.error("Error reading localStorage:", error);
    return initialValue;
  }
}

export function useLocalStorage(key, initialValue, enabled = true) {
  const [stored, setStored] = useState(() => ({
    key,
    value: enabled ? readValue(key, initialValue) : initialValue,
  }));

  const value = !enabled
    ? initialValue
    : stored.key === key
      ? stored.value
      : readValue(key, initialValue);

  useEffect(() => {
    if (!enabled || stored.key === key) return;

    setStored({ key, value });
  }, [key, enabled, stored.key, value]);

  useEffect(() => {
    if (!enabled || stored.key !== key) return;

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [key, value, enabled, stored.key]);

  function setValue(newValue) {
    if (!enabled) return;

    setStored((prev) => {
      const currentValue =
        prev.key === key
          ? prev.value
          : readValue(key, initialValue);

      const updatedValue =
        typeof newValue === "function"
          ? newValue(currentValue)
          : newValue;

      return {
        key,
        value: updatedValue,
      };
    });
  }

  return [value, setValue];
}
