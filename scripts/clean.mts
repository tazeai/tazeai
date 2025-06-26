import * as glob from 'fast-glob';
import * as fs from 'node:fs';

const dirs = ['.', ...glob.sync('packages/*/'), ...glob.sync('packages/ai/*/')];

dirs.forEach((pkg) => {
  const files = [
    '.tsbuildinfo',
    'docs',
    'build',
    'dist',
    'coverage',
    'node_modules',
  ];

  files.forEach((file) => {
    if (pkg === '.' && file === 'docs') {
      return;
    }

    fs.rmSync(`${pkg}/${file}`, { recursive: true, force: true });
  });
});

glob.sync('docs/*/').forEach((dir) => {
  fs.rmSync(dir, { recursive: true, force: true });
});
