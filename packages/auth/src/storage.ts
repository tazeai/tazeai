import { createRedis } from "@tazeai/cache";
import type { SecondaryStorage } from "better-auth";

type RedisStorageOptions = {
  url: string;
  prefix?: string;
};

/**
 * Redis storage for BetterAuth
 * @param options - Redis storage options
 * @returns Redis storage
 */
export const redisStorage = (
  options: RedisStorageOptions,
): SecondaryStorage => {
  const { prefix = "auth", url } = options;
  const client = createRedis(url);
  const getRedisKey = (key: string) => `${prefix}:${key}`;
  const getRedis = async () => {
    if (!client.isOpen) {
      await client.connect();
    }
    return client;
  };

  return {
    get: async (key) => {
      const redis = await getRedis();
      const value = (await redis.get(getRedisKey(key))) ?? null;
      return typeof value === "string" ? value : null;
    },
    set: async (key, value, ttl) => {
      const redis = await getRedis();
      await redis.set(getRedisKey(key), value, { EX: ttl ?? 60 * 60 });
    },
    delete: async (key) => {
      const redis = await getRedis();
      await redis.del(getRedisKey(key));
    },
  };
};
