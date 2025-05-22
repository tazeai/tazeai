import type { NextConfig } from 'next';

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

export default nextConfig;
