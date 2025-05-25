# @tazeai/database

Database package for TazeAI. This package provides database connectivity, models, and query builders for the TazeAI platform.

## Features

- Database connection management
- ORM integration
- Query builders
- Migration tools
- Data models and schemas
- Connection pooling

## Installation

```bash
npm install @tazeai/database
```

## Usage

```typescript
import { Database } from '@tazeai/database';

// Initialize database connection
const db = new Database({
  // configuration options
});

// Execute queries
const result = await db.query('SELECT * FROM users');
```

## API Documentation

Detailed API documentation can be found in the [docs](./docs) directory. 