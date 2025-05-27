import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

let nextConfig: NextConfig = {
  transpilePackages: [
    "@tazeai/auth",
    "@tazeai/cache",
    "@tazeai/core",
    "@tazeai/database",
    "@tazeai/shared",
    "@tazeai/ui",
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

if (process.env.ANALYZE === 'true') {
  nextConfig = withBundleAnalyzer()(nextConfig);
}

export default nextConfig;
