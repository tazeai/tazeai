import { isNil, transform } from 'lodash-es';
import { createClient, type RedisClientType } from 'redis';
import { MAX_COMMANDS_QUEUE_LENGTH } from './consts';

// TODO: Use superjson
const json = {
  serialize: (value: unknown): string | number => {
    return value as string | number;
  },
  unserialize: <T>(value: string | null): T | null => {
    return value as T;
  },
};

// Define the constant for successful Redis operation response
export const REDIS_SUCCESS = 'OK';

/**
 * Type representing a value that can be a promise or a value.
 *
 * @template T The type of the value.
 */
export type Promiseable<T> = T | Promise<T>;

/**
 * Type representing a function that returns a promiseable value.
 *
 * @template T The type of the value.
 */
export type CacheClosure<T> = () => Promiseable<T>;

type CacheOptions = {
  prefix?: string;
  db?: number;
};

/**
 * Class representing a cache store using Redis.
 */
export class Cache {
  #prefix = ''; // Prefix for cache keys
  protected readonly redis: RedisClientType; // Redis client instance

  /**
   * Construct a new instance of the CacheStore.
   *
   * @param urlOrRedis The Redis URL or Redis client instance to use.
   * @param opts Configuration options, including an optional prefix for cache keys.
   */
  constructor(connection: string, opts: CacheOptions = {}) {
    this.redis = createClient({
      url: connection,
      commandsQueueMaxLength: MAX_COMMANDS_QUEUE_LENGTH,
    });
    this.#prefix = opts.prefix ?? '';
  }

  /**
   * Get the current cache key prefix.
   *
   * @returns The current cache key prefix.
   */
  getPrefix = (): string => {
    return this.#prefix || '';
  };

  /**
   * Set the cache key prefix.
   *
   * This method allows specifying a prefix for cache keys, to be used in subsequent cache operations.
   * It can be used for organizing cache data or implementing namespace separation.
   *
   * @param prefix The cache key prefix, serving as a common prefix for subsequent cache operations.
   */
  setPrefix = (prefix: string) => {
    this.#prefix = prefix;
  };

  // Connect to the Redis server
  connect = async () => {
    if (!this.redis.isOpen) {
      await this.redis.connect();
    }
  };

  // Disconnect from the Redis server
  disconnect = () => {
    if (this.redis.isOpen) {
      this.redis.destroy();
    }
  };

  // Get the Redis client instance
  getRedis = () => {
    return this.redis;
  };

  /**
   * Set a cache value with an optional expiration time.
   *
   * @param key The cache key.
   * @param value The value to cache.
   * @param seconds Optional expiration time in seconds.
   * @returns Promise resolving to a boolean indicating success.
   */
  set = async (
    key: string,
    value: unknown,
    seconds?: number,
  ): Promise<boolean> => {
    await this.connect();
    const cacheKey = this.getKey(key);
    const ttl = this.getSeconds(seconds);
    const res = await (ttl
      ? this.redis.set(cacheKey, this.serialize(value), {
          expiration: {
            type: 'EX',
            value: ttl,
          },
        })
      : this.redis.set(cacheKey, this.serialize(value)));
    return res === REDIS_SUCCESS;
  };

  /**
   * Retrieve a value from the cache, or execute a function to set it if not present, with no expiration.
   *
   * @param key The cache key.
   * @param fn The function to execute if the cache key is not present.
   * @returns Promise resolving to the cached value or the result of the function.
   */
  rememberForever = async <T>(
    key: string,
    fn: CacheClosure<T>,
  ): Promise<{ value: T | null; cached: boolean }> => {
    return await this.remember<T>(this.getKey(key), fn);
  };

  /**
   * Check if a cache key is missing.
   *
   * @param key The cache key to check.
   * @returns Promise resolving to a boolean indicating if the key is missing.
   */
  missing = async (key: string): Promise<boolean> => {
    const res = await this.has(key);
    return !res;
  };

  /**
   * Retrieve a value from the cache, or execute a function to set it if not present.
   *
   * @param key The cache key.
   * @param fn Optional function to execute if the cache key is not present.
   * @param seconds Optional expiration time in seconds.
   * @returns Promise resolving to the cached value, the result of the function, or null.
   */
  remember = async <T>(
    key: string,
    fn?: CacheClosure<T>,
    seconds?: number,
  ): Promise<{ value: T | null; cached: boolean }> => {
    try {
      await this.connect();
      const start = Date.now();
      const value = await this.get<T>(key);
      console.log(`Cache[${key}] value: ${value}`);
      if (value) {
        console.log(`Cache[${key}] hit: ${Date.now() - start}ms`);
        return { value, cached: true };
      }
      if (!fn) return { value: null, cached: false };
      const res = await fn();
      const end = Date.now();
      console.log(`Cache[${key}] miss: ${end - start}ms`);
      await this.set(key, res, seconds);
      return { value: res, cached: false };
    } catch (error) {
      console.error(`Error in remember function: ${error}`);
      return { value: null, cached: false };
    }
  };

  /**
   * Increment the value of a cache key.
   *
   * @param key The cache key.
   * @param value The amount to increment by.
   * @returns Promise resolving to the new value.
   */
  increment = async (key: string, value = 1) => {
    await this.connect();
    const res = await this.redis.incrBy(this.getKey(key), value);
    return res as number;
  };

  /**
   * Decrement the value of a cache key.
   *
   * @param key The cache key.
   * @param value The amount to decrement by.
   * @returns Promise resolving to the new value.
   */
  decrement = async (key: string, value = 1) => {
    await this.connect();
    const cacheKey = this.getKey(key);
    const res = await this.redis.decrBy(cacheKey, value);
    return res as number;
  };

  /**
   * Set a cache value with no expiration.
   *
   * @param key The cache key.
   * @param value The value to cache.
   * @returns Promise resolving to a boolean indicating success.
   */
  forever = async (key: string, value: unknown) => {
    await this.connect();
    const res = await this.set(key, value);
    return res;
  };

  /**
   * Retrieve multiple values from the cache.
   *
   * @param keys An array of cache keys.
   * @param defaultVal The default value to return if a key is missing.
   * @returns Promise resolving to an object mapping keys to their values or the default value.
   */
  getMultiple = async <T, R = Record<string, T | null>>(
    keys: string[],
    defaultVal: T | null = null,
  ): Promise<R> => {
    await this.connect();
    const values = await this.redis.mGet(keys.map(this.getKey));
    return values.reduce<R>(
      (results, value, idx) => {
        const key = keys[idx];
        if (!key) return results;
        // const val = isNil(value)
        // ? defaultVal
        // : (this.unserialize<T>(value) ?? defaultVal);
        let val: T | null = null;
        if (isNil(value)) {
          val = defaultVal;
        } else {
          val = this.unserialize<T>(value as string) ?? defaultVal;
        }
        (results as Record<string, T | null>)[key] = val;
        return results;
      },
      {} as unknown as R,
    );
  };

  /**
   * Remove a cache key.
   *
   * @param key The cache key to remove.
   * @returns Promise resolving to a boolean indicating success.
   */
  forget = async (key: string): Promise<boolean> => {
    return await this.delete(key);
  };

  /**
   * Retrieve a value from the cache.
   *
   * @param key The cache key.
   * @param defaultVal The default value to return if the key is missing.
   * @returns Promise resolving to the cached value or the default value.
   */
  get = async <T>(
    key: string,
    defaultVal: T | null = null,
  ): Promise<T | null> => {
    await this.connect();
    const start = Date.now();
    const value = await this.redis.get(this.getKey(key));
    const end = Date.now();
    console.log(`Cache[${key}] get: ${end - start}ms`);
    return (
      isNil(value) ? defaultVal : this.unserialize<T>(value as string)
    ) as T | null;
  };

  /**
   * Remove a cache key.
   *
   * @param key The cache key to remove.
   * @returns Promise resolving to a boolean indicating success.
   */
  delete = async (key: string): Promise<boolean> => {
    await this.connect();
    const res = await this.redis.del(this.getKey(key));
    return res === 1;
  };

  /**
   * Remove all cache keys.
   *
   * @returns Promise resolving to a boolean indicating success.
   */
  clear = async (): Promise<boolean> => {
    return await this.flush();
  };

  /**
   * Remove multiple cache keys.
   *
   * @param keys An array of cache keys to remove.
   * @returns Promise resolving to a boolean indicating success.
   */
  deleteMultiple = async (keys: string[]): Promise<boolean> => {
    await this.connect();
    const results = await Promise.all(keys.map(this.delete));
    return results.every(Boolean);
  };

  /**
   * Check if a cache key exists.
   *
   * @param key The cache key to check.
   * @returns Promise resolving to a boolean indicating if the key exists.
   */
  has = async (key: string): Promise<boolean> => {
    await this.connect();
    const exists = await this.redis.exists(key);
    return exists === 1;
  };

  /**
   * Retrieve and remove a value from the cache.
   *
   * @param key The cache key.
   * @returns Promise resolving to the cached value, or null if not found.
   */
  pull = async <T>(key: string) => {
    await this.connect();
    const cacheKey = this.getKey(key);
    const value = await this.redis.get(cacheKey);
    if (value) {
      await this.forget(cacheKey);
      return this.unserialize<T>(value as string);
    }
    return null;
  };

  /**
   * Set a cache value with an optional expiration.
   *
   * @param key The cache key.
   * @param value The value to cache.
   * @param seconds Optional expiration time in seconds.
   * @returns Promise resolving to a boolean indicating success.
   */
  put = async (key: string, value: unknown, seconds?: number) => {
    await this.connect();
    const cacheKey = this.getKey(key);
    const res = await this.redis.set(cacheKey, this.serialize(value));
    const ttl = this.getSeconds(seconds);
    if (ttl) {
      await this.redis.expire(cacheKey, ttl);
    }
    return res === REDIS_SUCCESS;
  };

  /**
   * Set multiple cache values with an optional expiration.
   *
   * @param values An object mapping keys to their values.
   * @param seconds Optional expiration time in seconds.
   * @returns Promise resolving to a boolean indicating success.
   */
  putMany = async (values: Record<string, unknown>, seconds?: number) => {
    await this.connect();
    const results = await Promise.all(
      Object.entries(values).map(([key, value]) =>
        this.put(key, value, seconds),
      ),
    );
    return results.every(Boolean);
  };

  /**
   * Get the remaining time-to-live (TTL) of a cache key.
   *
   * @param key The cache key.
   * @returns Promise resolving to the TTL in seconds, or null if the key does not exist.
   */
  ttl = async (key: string): Promise<number | null> => {
    await this.connect();
    return this.redis.ttl(key);
  };

  /**
   * Remove all cache keys.
   *
   * @returns Promise resolving to a boolean indicating success.
   */
  flush = async (): Promise<boolean> => {
    await this.connect();
    const res = await this.redis.flushDb();
    return res === REDIS_SUCCESS;
  };

  /**
   * Retrieve multiple values from the cache.
   *
   * @param keys An array of cache keys.
   * @returns Promise resolving to an object mapping keys to their values.
   */
  many = async (keys: Record<string, unknown>) => {
    await this.connect();
    const cacheKeys: string[] = Object.keys(keys).map(this.getKey);
    const values: (string | null)[] = await this.redis.mGet(cacheKeys);
    return transform<string | null, Record<string, unknown>>(
      values,
      (results: Record<string, unknown>, value: string | null, key: number) => {
        results[key] = value ? this.unserialize<unknown>(value) : null;
      },
      keys,
    );
  };

  /**
   * Add a value to the cache only if it does not already exist.
   *
   * @param key The cache key.
   * @param value The value to cache.
   * @param seconds Optional expiration time in seconds.
   * @returns {Promise<boolean>} Promise resolving to a boolean indicating if the operation was successful.
   */
  add = async <T>(
    key: string,
    value: T,
    seconds?: number,
  ): Promise<boolean> => {
    await this.connect();
    const exist = await this.has(key);
    if (exist) return false;
    return await this.set(key, value, seconds);
  };

  /**
   * Serialize the value.
   *
   * @param value - The value to be serialized, with a type of unknown, can be any type of data.
   * @returns Returns the serialized string.
   */
  serialize = (value: unknown): string | number => json.serialize(value);

  /**
   * Unserialize the value.
   *
   * This function takes a string representation of a serialized value, and returns the unserialized data.
   * If the input string is empty or null, the function returns null.
   *
   * @param value The serialized data string.
   * @returns The unserialized data, or null if the input is invalid.
   */
  unserialize = <T>(value: string | null): T | null => {
    if (value === null) return null;
    return json.unserialize<T>(value);
  };

  // Generate the actual cache key by combining the prefix and the given key
  protected getKey = (key: string): string => {
    return this.getPrefix() + key;
  };

  /**
   * Get the number of seconds for cache expiration.
   *
   * @param seconds The specified expiration time, or undefined.
   * @returns The expiration time in seconds, or 0 if not specified.
   */
  private getSeconds = (seconds?: number): number => {
    return Math.max(Number(seconds ?? 0), 0);
  };
}

export function cache(connection: string, opts: CacheOptions = {}) {
  return new Cache(connection, opts);
}

export default cache;
