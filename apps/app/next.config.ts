import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const internalHost = process.env.TAURI_DEV_HOST || "localhost";
const isProd = process.env.NODE_ENV === "production";

let nextConfig: NextConfig = {
  transpilePackages: [
    "@tazeai/auth",
    "@tazeai/cache",
    "@tazeai/core",
    "@tazeai/db",
    "@tazeai/shared",
    "@tazeai/ui",
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "export",
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? undefined : `http://${internalHost}:3001`,
};

if (process.env.ANALYZE === "true") {
  nextConfig = withBundleAnalyzer()(nextConfig);
}

export default nextConfig;
