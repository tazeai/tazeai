import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    'src/index.ts',
    'src/i18n.server.ts',
    'src/i18n.client.ts',
    'src/i18n-provider.tsx',
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
    //
  ],
});
