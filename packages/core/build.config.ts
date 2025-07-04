import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index.ts', 'src/envs.ts', 'src/server/index.ts'],
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
