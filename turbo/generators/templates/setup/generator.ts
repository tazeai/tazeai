import type { PlopTypes } from '@turbo/gen';
import { execSync } from 'node:child_process';

export function createSetupGenerator(plop: PlopTypes.NodePlopAPI) {
  plop.setGenerator('setup', {
    description: 'Setup your TazeAI project',
    prompts: [
      {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of the project?',
      },
      {
        type: 'confirm',
        name: 'setupHealthCheck',
        message: 'Do you want to setup a pre-commit hook for health checks?',
        default: false,
      },
    ],
    actions: [
      {
        type: 'modify',
        path: 'package.json',
        async transform(content, answers) {
          const pkg = JSON.parse(content);

          // Update project name in package.json
          pkg.name = answers.projectName;

          return JSON.stringify(pkg, null, 2);
        },
      },
      async (answers: any) => {
        try {
          setupRemote();
          setupPreCommit({ setupHealthCheck: answers.setupHealthCheck });

          return 'Project setup complete';
        } catch (error) {
          console.error('Project setup failed. Aborting package generation.');
          process.exit(1);
        }
      },
    ],
  });
}

function setupPreCommit(params: {
  setupHealthCheck: boolean;
}) {
  try {
    const filePath = '.git/hooks/pre-commit';

    const healthCheckCommands = params.setupHealthCheck
      ? `pnpm run lint:fix\npnpm run typecheck\n`.trim()
      : ``;

    const licenseCommand = `pnpm run --filter license dev`;
    const fileContent = `#!/bin/bash\n${healthCheckCommands}${licenseCommand}`;

    // write file
    execSync(`echo "${fileContent}" > ${filePath}`, {
      stdio: 'inherit',
    });

    // make file executable
    execSync(`chmod +x ${filePath}`, {
      stdio: 'inherit',
    });
  } catch (error) {
    console.error('Pre-commit hook setup failed. Aborting package generation.');
    process.exit(1);
  }
}

function setupRemote() {
  try {
    // Setup remote upstream
    const getRemoteUrl = execSync('git remote get-url origin', {
      stdio: 'inherit',
    });

    const currentRemote = getRemoteUrl.toString().trim();

    console.log(`Setting upstream remote to ${currentRemote} ...`);

    if (currentRemote && currentRemote.includes('github.com')) {
      execSync(`git remote remove origin`, {
        stdio: 'inherit',
      });

      execSync(`git remote set-url upstream ${currentRemote}`, {
        stdio: 'inherit',
      });
    } else {
      console.error('Your current remote is not GitHub');
    }
  } catch (error) {
    console.info('No current remote found. Skipping upstream remote setup.');
  }

  // Run license script
  try {
    execSync('turbo run --filter license dev', {
      stdio: 'inherit',
    });
  } catch (error) {
    console.error(
      `License script failed. Aborting package generation. Error: ${error}`,
    );
    process.exit(1);
  }
}
