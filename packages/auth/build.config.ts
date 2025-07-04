import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    'src/index.ts',
    'src/envs.ts',
    'src/types.ts',
    'src/client.ts',
    'src/server.ts',
    'src/middleware.ts',
  ],
  rollup: {
    emitCJS: true,
    esbuild: {
      treeShaking: true,
    },
  },
  declaration: true,
  outDir: 'dist',
  clean: false,
  failOnWarn: false,
  externals: [
    'zod',
    'react',
    'react-dom',
  ],
});
