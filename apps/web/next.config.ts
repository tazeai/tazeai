import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

let nextConfig: NextConfig = {
  transpilePackages: [
    "@tazeai/analytics",
    "@tazeai/auth",
    "@tazeai/cache",
    "@tazeai/core",
    "@tazeai/db",
    "@tazeai/shared",
    "@tazeai/ui",
  ],
  allowedDevOrigins: ["http://local.tazeai.com:3000"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

if (process.env.ANALYZE === "true") {
  nextConfig = withBundleAnalyzer()(nextConfig);
}

export default nextConfig;
