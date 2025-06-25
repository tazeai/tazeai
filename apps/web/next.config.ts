import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

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
  allowedDevOrigins: ['http://local.tazeai.com:3000'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
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
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
      ],
    },
  ],
};

if (process.env.ANALYZE === 'true') {
  nextConfig = withBundleAnalyzer()(nextConfig);
}

export default nextConfig;
