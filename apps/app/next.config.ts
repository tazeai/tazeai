import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const internalHost = process.env.TAURI_DEV_HOST || 'localhost';
const isProd = process.env.NODE_ENV === 'production';

let nextConfig: NextConfig = {
  transpilePackages: [
    '@tazeai/analytics',
    '@tazeai/auth',
    '@tazeai/cache',
    '@tazeai/core',
    '@tazeai/db',
    '@tazeai/env',
    '@tazeai/shared',
    '@tazeai/ui',
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? undefined : `http://${internalHost}:3001`,
  experimental: {
    optimizePackageImports: ['@tazeai/ui', '@radix-ui/react-icons'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

if (process.env.ANALYZE === 'true') {
  nextConfig = withBundleAnalyzer()(nextConfig);
}

export default nextConfig;
