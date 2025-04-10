import { defineConfig, Options } from 'tsup';
// import { env } from './env.js';

// console.log(env);

const tsupOptions: Options = {
  platform: 'node', // 目标平台
  entry: ['src/index.ts', 'src/vercel.ts'],
  format: ['esm'],
  cjsInterop: true,
  external: ['ioredis'],
  outExtension({ format }) {
    switch (format) {
      case 'cjs':
        return {
          js: '.cjs',
          dts: '.d.ts',
        };
      case 'esm':
        return {
          js: '.mjs',
          dts: '.d.ts',
        };
      case 'iife':
        return {
          js: '.global.js',
          dts: '.d.ts',
        };
      default:
        break;
    }
    return {
      js: '.js',
      dts: '.d.ts',
    };
  },
  splitting: true, // 代码拆分
  sourcemap: true,
  clean: false,
  dts: false,
  bundle: true,
  minify: false, // 缩小输出
  shims: true, // 注入 cjs 和 esm 填充代码，解决 import.meta.url 和 __dirname 的兼容问题
  esbuildOptions(options, context) {
    // 设置编码格式
    options.charset = 'utf8';
  },
  noExternal: [/(.*)/], // 将依赖打包到一个文件中
};

const cloudflareOptions: Options = {
  ...tsupOptions,
  entry: ['src/app.ts'],
  format: ['esm'],
  replaceNodeEnv: false,
  minify: false,
  treeshake: true,
  env: {
    RUNTIME_KEY: 'cloudflare-workers',
    NODE_ENV: 'production',
  },
};

export default defineConfig([tsupOptions, cloudflareOptions]);
