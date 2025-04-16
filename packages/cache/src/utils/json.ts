import { isNumber, toNumber } from 'lodash-es';
import superjson from 'superjson';

/**
 * Unserialize the value.
 *
 * This function takes a string representation of a serialized value, and returns the unserialized data.
 * If the input string is empty or null, the function returns null.
 *
 * @param value The serialized data string.
 * @returns The unserialized data, or null if the input is invalid.
 */
export function unserialize<T>(value: string): T | null {
  if (isNumber(value)) {
    return toNumber(value) as T;
  } else if (typeof value === 'string') {
    return superjson.parse<T>(value);
  }
  return value as T;
}

/**
 * Serialize the value.
 *
 * @param value - The value to be serialized, with a type of unknown, can be any type of data.
 * @returns Returns the serialized string.
 */
export function serialize(value: unknown): string | number {
  if (isNumber(value)) {
    return toNumber(value);
  } else if (typeof value === 'string') {
    return value;
  }
  return superjson.stringify(value);
}

export const json = { unserialize, serialize };

export default json;
