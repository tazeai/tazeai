import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

let nextConfig: NextConfig = {
  transpilePackages: [
    '@tazeai/analytics',
    '@tazeai/auth',
    '@tazeai/cache',
    '@tazeai/core',
    '@tazeai/db',
    '@tazeai/shared',
    '@tazeai/ui',
    '@tazeai/env',
  ],
  allowedDevOrigins: ['http://local.tazeai.com:3000'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^cloudflare:workers$/,
      })
    );
    return config;
  },
};

if (process.env.ANALYZE === 'true') {
  nextConfig = withBundleAnalyzer()(nextConfig);
}

export default nextConfig;
