export interface APIClientOptions {
  apiKey?: string;
}

export class APIClient {
  private options: APIClientOptions;
  constructor(options: APIClientOptions) {
    this.options = options;
  }
}
