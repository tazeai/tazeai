# @tazeai/email

Email package for TazeAI. This package handles email sending, templates, and email-related functionality.

## Features

- Email sending service
- Email templates
- HTML and plain text support
- Attachment handling
- Email queue management
- Template rendering

## Installation

```bash
npm install @tazeai/email
```

## Usage

```typescript
import { Email } from '@tazeai/email';

// Initialize email service
const email = new Email({
  // configuration options
});

// Send email
await email.send({
  to: 'user@example.com',
  subject: 'Welcome to TazeAI',
  template: 'welcome',
  data: {
    name: 'User'
  }
});
```

## API Documentation

Detailed API documentation can be found in the [docs](./docs) directory. 