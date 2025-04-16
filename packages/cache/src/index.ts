// import Redis from 'ioredis';
import { envs } from './envs';
import { Redis } from '@upstash/redis';
import { Cache } from './cache';

const env = envs();

export const createRedis = () => {
  const url = new URL(env.REDIS_URL);
  const token = url.searchParams.get('token')!;
  url.searchParams.delete('token');
  const redis = new Redis({
    url: url.toString(),
    token,
  });
  return redis;
};

export const createCache = () => {
  return new Cache(env.REDIS_URL, {
    prefix: 'auth_session_',
  });
};

export * from './cache';
