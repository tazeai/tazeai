# TazeAI Infrastructure Documentation

## Architecture Overview

TazeAI is a modern TypeScript monorepo built with a microservices-oriented package architecture, designed for scalability and maintainability.

## Project Structure

```
tazeai/
├── apps/                    # Application layer
│   ├── app/                # Management console (Port 3001)
│   ├── web/                # Public website
│   └── docs/               # Documentation site
├── packages/               # Shared packages
│   ├── core/              # API client core
│   ├── db/                # Database layer
│   ├── auth/              # Authentication
│   ├── ai/                # AI services
│   ├── ui/                # UI components
│   └── ...
└── docker/                # Docker configurations
```

## Technology Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **React**: Version 19 with latest features
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Custom component library (@tazeai/ui)
- **State Management**: SWR for data fetching
- **Internationalization**: react-i18next

### Backend
- **API Framework**: Hono (lightweight, fast)
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth
- **AI Integration**: LangChain
- **Caching**: Custom caching layer (@tazeai/cache)

### Development Tools
- **Monorepo**: PNPM Workspaces + Turbo
- **Build System**: Turbo with parallel execution
- **Code Quality**: Biome (ESLint + Prettier replacement)
- **Type Checking**: TypeScript 5.8+
- **Testing**: Vitest
- **Package Manager**: PNPM 10+

## Package Architecture

### Core Packages

#### @tazeai/core
- Main API client
- Business logic orchestration
- Server-side utilities

#### @tazeai/db
- Database schema definitions (Drizzle)
- Database adapters (PostgreSQL/Neon)
- Query builders and utilities
- Migration management

#### @tazeai/auth
- Authentication system (Better Auth)
- User management
- Session handling
- Social login integration

#### @tazeai/ai
- LangChain integration
- AI model interfaces
- Vector operations
- RAG implementation

### Infrastructure Packages

#### @tazeai/ui
- Reusable UI components
- Design system
- Theme management
- Component documentation

#### @tazeai/env
- Environment variable validation
- Configuration management
- Type-safe environment access

#### @tazeai/cache
- Caching strategies
- Redis integration
- Cache invalidation

## Development Environment

### Prerequisites
- Node.js 20+ or 22+
- PNPM 9.10.0+
- PostgreSQL database
- Environment variables configured

### Getting Started
```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint and format
pnpm lint
```

### Environment Configuration
Copy `.env.example` to `.env` and configure:
- Database connection strings
- Authentication secrets
- AI service API keys
- Cache configuration

## Build and Deployment

### Build Process
- **Turbo**: Orchestrates builds across packages
- **Parallel Execution**: Maximizes build performance
- **Caching**: Intelligent build caching
- **Type Checking**: Full TypeScript validation

### Deployment Architecture
- **Apps**: Deployed as Next.js applications
- **Packages**: Built as library packages
- **Static Assets**: CDN distribution
- **API Routes**: Serverless functions

## Database Schema

### Core Tables
- **Users**: User accounts and profiles
- **Sessions**: Authentication sessions
- **RAG**: Vector embeddings and documents
- **Analytics**: Usage tracking

### Migration Strategy
- Drizzle migrations
- Version-controlled schema changes
- Automated deployment migrations

## Security

### Authentication
- JWT-based sessions
- Social OAuth providers
- Multi-factor authentication support
- Session management

### Data Protection
- Environment variable encryption
- Secure API endpoints
- Input validation and sanitization
- Rate limiting

## Monitoring and Analytics

### Performance Monitoring
- Built-in analytics package
- PostHog integration
- Vercel Analytics
- Google Analytics

### Error Tracking
- Structured error handling
- Performance metrics
- Usage analytics

## Development Workflow

### Code Quality
- Pre-commit hooks (Husky)
- Automated formatting (Biome)
- Type checking on commit
- Test coverage requirements

### Package Management
- Workspace dependencies
- Catalog-based version management
- Automated dependency updates
- Security auditing

## Scaling Considerations

### Horizontal Scaling
- Stateless application design
- Database connection pooling
- Cache layer distribution
- CDN integration

### Performance Optimization
- Code splitting and lazy loading
- Image optimization
- Bundle analysis
- Server-side rendering

## Future Roadmap

### Planned Enhancements
- Containerization (Docker)
- Kubernetes deployment
- Microservices architecture
- Enhanced monitoring

### Technology Upgrades
- React Server Components
- Next.js features adoption
- Database optimization
- AI model improvements