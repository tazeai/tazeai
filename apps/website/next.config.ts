import type { NextConfig } from 'next';
import withSerwistInit from '@serwist/next';

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: [
    '@tazeai/auth',
    '@tazeai/cache',
    '@tazeai/core',
    '@tazeai/database',
    '@tazeai/shared',
    '@tazeai/ui',
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const withSerwist = isProduction
  ? withSerwistInit({
      // Note: This is only an example. If you use Pages Router,
      // use something else that works, such as "service-worker/index.ts".
      swSrc: 'src/app/sw.ts',
      swDest: 'public/sw.js',
    })
  : (config: NextConfig) => config;

export default withSerwist(nextConfig);
