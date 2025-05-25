# @tazeai/analytics

Analytics package for TazeAI. This package handles tracking, metrics, and analytics functionality.

## Features

- Event tracking
- User analytics
- Performance monitoring
- Custom metrics
- Analytics dashboard integration
- Data visualization utilities

## Installation

```bash
npm install @tazeai/analytics
```

## Usage

```typescript
import { Analytics } from '@tazeai/analytics';

// Initialize analytics
const analytics = new Analytics({
  // configuration options
});

// Track events
analytics.track('user_action', {
  action: 'button_click',
  page: 'home'
});
```

## API Documentation

Detailed API documentation can be found in the [docs](./docs) directory. 