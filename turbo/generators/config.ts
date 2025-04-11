import type { PlopTypes } from '@turbo/gen';

import { createEnvironmentVariablesGenerator } from './templates/env/generator';
import { createPackageGenerator } from './templates/package/generator';
import { createSetupGenerator } from './templates/setup/generator';
import { createEnvironmentVariablesValidatorGenerator } from './templates/validate-env/generator';

// List of generators to be registered
const generators = [
  createPackageGenerator,
  createEnvironmentVariablesGenerator,
  createEnvironmentVariablesValidatorGenerator,
  createSetupGenerator,
];

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  generators.forEach((gen) => gen(plop));
}
