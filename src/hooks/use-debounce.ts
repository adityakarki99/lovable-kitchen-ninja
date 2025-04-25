
import { useState, useEffect } from 'react';

/**
 * A custom hook that delays updating a value until a specified delay has passed
 * since the last change. Useful for reducing API calls during typing.
 * 
 * @param value The value to debounce
 * @param delay The delay time in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear the timeout if the value changes or the component unmounts
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
