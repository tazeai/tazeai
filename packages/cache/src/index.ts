// import Redis from 'ioredis';
import { envs } from './envs';
import { Redis } from '@upstash/redis';

const env = envs();

export const createRedis = () => {
  const redis = new Redis({
    url: 'https://sterling-wombat-48175.upstash.io',
    token: '********',
  });
  // const redis = new Redis(env.REDIS_URL);
  return redis;
};

export * from './cache';
