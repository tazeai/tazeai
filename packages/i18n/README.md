# @tazeai/i18n

Internationalization package for TazeAI. This package handles translations and localization.

## Features

- Multi-language support
- Translation management
- Locale detection
- Pluralization
- Date and number formatting
- RTL support

## Installation

```bash
npm install @tazeai/i18n
```

## Usage

```typescript
import { I18n } from '@tazeai/i18n';

// Initialize i18n
const i18n = new I18n({
  // configuration options
});

// Translate text
const text = i18n.t('welcome.message', { name: 'User' });
```

## API Documentation

Detailed API documentation can be found in the [docs](./docs) directory. 