import { createClient, type RedisClientType } from "redis";
import { Cache } from "./cache";
import { envs } from "./envs";

export const createRedis = (url: string): RedisClientType => {
  const redis = createClient({
    url,
  });
  return redis as RedisClientType;
};

export const createCache = () => {
  const env = envs();
  return new Cache(env.REDIS_URL, {
    prefix: "auth_session_",
  });
};

export * from "./cache";
