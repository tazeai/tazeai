import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index.tsx', 'src/envs.ts', 'src/posthog/server.ts'],
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
    //
  ],
});
