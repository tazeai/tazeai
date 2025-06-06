# @tazeai/env

Environment configuration package for TazeAI. This package manages environment variables and configuration settings.

## Features

- Environment variable management
- Configuration validation
- Type-safe configuration
- Environment-specific settings
- Secret management

## Installation

```bash
npm install @tazeai/env
```

## Usage

```typescript
import { Env } from '@tazeai/env';

// Load environment variables
const env = new Env({
  // configuration options
});

// Access environment variables
const apiKey = env.get('API_KEY');
```

## API Documentation

Detailed API documentation can be found in the [docs](./docs) directory. 