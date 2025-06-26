import { addEqualityTesters } from '@tazeai/vitest';

addEqualityTesters();

// Ignore warnings from usage of experimental features to declutter test output.
const ignore: string[] = ['ExperimentalWarning'];
const emitWarning = process.emitWarning;

process.emitWarning = (warning, ...args) => {
  const [head] = args;
  if (head != null) {
    if (typeof head === 'string' && ignore.includes(head)) {
      return;
    }

    if (
      typeof head === 'object' &&
      ignore.includes((head as { type: string }).type)
    ) {
      return;
    }
  }
  return emitWarning(warning as string, ...(args as any[]));
};
