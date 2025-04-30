import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';
import million from "@million/lint";

const withMDX = createMDX();

const withMillion = million.next({ rsc: true });

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@tazeai/ui'],
};

export default withMDX(withMillion(config));
