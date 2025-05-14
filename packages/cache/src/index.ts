import { envs } from './envs';
import { Cache } from './cache';
import { createClient, type RedisClientType } from 'redis';

export const createRedis = (): RedisClientType => {
  const env = envs();
  const url = new URL(env.REDIS_URL);
  const redis = createClient({
    url: url.toString(),
  });
  return redis as RedisClientType;
};

export const createCache = () => {
  const env = envs();
  return new Cache(env.REDIS_URL, {
    prefix: 'auth_session_',
  });
};

export * from './cache';
