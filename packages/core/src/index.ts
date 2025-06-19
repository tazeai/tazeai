import * as core from './core';

export interface Options extends core.APIClientOptions {
  // env: string;
}

export class TazeAI extends core.APIClient {
  run() {
    console.log('run');
  }
}
