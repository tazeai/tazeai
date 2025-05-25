# @tazeai/cache

Caching package for TazeAI. This package provides caching functionality for improved performance and reduced database load.

## Features

- In-memory caching
- Redis integration
- Cache invalidation strategies
- TTL (Time To Live) support
- Cache statistics and monitoring

## Installation

```bash
npm install @tazeai/cache
```

## Usage

```typescript
import { Cache } from '@tazeai/cache';

// Initialize cache
const cache = new Cache({
  // configuration options
});

// Set cache
await cache.set('key', 'value', { ttl: 3600 });

// Get cache
const value = await cache.get('key');
```

## API Documentation

Detailed API documentation can be found in the [docs](./docs) directory. 