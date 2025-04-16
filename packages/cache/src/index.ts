// import Redis from 'ioredis';
import { envs } from './envs';
import { Redis } from '@upstash/redis';

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

export * from './cache';
