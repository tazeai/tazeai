import type { NextConfig } from 'next';

const otelRegex = /@opentelemetry\/instrumentation/;

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
};

export default nextConfig;
