import type { NextConfig } from 'next';
import million from '@million/lint';

const withMillion = million.next({ rsc: true });

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

export default withMillion(nextConfig);
