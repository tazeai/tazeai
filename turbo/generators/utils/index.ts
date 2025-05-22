import { readFileSync } from 'node:fs';
import path from 'node:path';

export namespace generator {
  export function loadAllEnvironmentVariables(basePath: string) {
    const sharedEnv = loadEnvironmentVariables(path.join(basePath, '.env'));
    const productionEnv = loadEnvironmentVariables(
      path.join(basePath, '.env.production'),
    );

    return {
      ...sharedEnv,
      ...productionEnv,
    };
  }

  export function loadEnvironmentVariables(filePath: string) {
    try {
      const file = readFileSync(filePath, 'utf-8');
      const vars = file.split('\n').filter((line) => line.trim() !== '');

      const env: Record<string, string> = {};

      for (const line of vars) {
        const isComment = line.startsWith('#');

        if (isComment) {
          continue;
        }

        const [key, value] = line.split('=');

        if (!key) {
          continue;
        }

        env[key] = value ?? '';
      }

      return env;
    } catch (error) {
      return {};
    }
  }
}
