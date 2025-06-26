# @tazeai/env

Type-safe environment variable management for TazeAI monorepo with validation and package composition.

## Features

- 🔒 **Type-safe** - Full TypeScript support with Zod validation
- 🚀 **Performance** - Intelligent caching and lazy evaluation
- 🔧 **Developer Experience** - Enhanced debugging and error messages
- 📦 **Monorepo Ready** - Package-level configuration composition
- 🎯 **Simple** - Clean API with sensible defaults

## Quick Start

### Basic Usage

```typescript
import { createEnv } from '@tazeai/env';
import { z } from 'zod';

const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    API_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
  },
  runtimeEnv: process.env,
});

// Type-safe access
console.log(env.DATABASE_URL); // string
console.log(env.NEXT_PUBLIC_API_URL); // string
```

### Package-Level Configuration

```typescript
import { definedEnvs } from '@tazeai/env';

// Define your package environment
export const envs = definedEnvs(({ z }) => ({
  server: {
    DATABASE_URL: z.string().url(),
    DATABASE_PREFIX: z.string().optional(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_PREFIX: process.env.DATABASE_PREFIX,
  },
}));

// Use in your application
const env = envs();
```

### Composition Example

```typescript
// packages/db/src/envs.ts
import { definedEnvs } from '@tazeai/env';

export const envs = definedEnvs(({ z }) => ({
  server: {
    DATABASE_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
}));

// apps/web/src/env.ts  
import { envs as dbEnvs } from '@tazeai/db/envs';
import { createEnv } from '@tazeai/env';

const env = createEnv({
  extends: [dbEnvs()],
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  runtimeEnv: process.env,
});
```

## Environment File Loading

Use `dotenv-cli` to load environment files in your applications:

```json
// package.json
{
  "scripts": {
    "dev": "pnpm with-env next dev",
    "build": "pnpm with-env next build", 
    "with-env": "dotenv -e ../../.env --"
  },
  "devDependencies": {
    "dotenv-cli": "^8.0.0"
  }
}
```

### Cache Management

```typescript
import { clearEnvCache } from '@tazeai/env';

// Clear environment cache (useful for testing)
clearEnvCache();
```

## Best Practices

### 1. Package-Level Configuration

```typescript
// packages/db/src/envs.ts
export const envs = definedEnvs(({ z }) => ({
  server: {
    DATABASE_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
}));
```

### 2. Client vs Server Variables

```typescript
const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(), // Server-only
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(), // Client-side
  },
  runtimeEnv: process.env,
});
```
