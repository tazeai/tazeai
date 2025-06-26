<div align="center">

# TazeAI

**🚀 Next-Generation AI-Powered Development Platform**

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-10+-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/tazeai/tazeai)

[🇨🇳 中文文档](./README.zh_CN.md) • [📖 Documentation](./docs) • [🏗️ Infrastructure](./infra.md)

</div>

---

## ✨ Overview

TazeAI is a cutting-edge, enterprise-grade AI development platform built with modern TypeScript technologies. It provides a comprehensive monorepo architecture for building scalable AI-powered applications with best-in-class developer experience.

### 🎯 Key Highlights

- **🏗️ Monorepo Architecture** - Organized with pnpm workspaces and Turbo for optimal development workflow
- **🤖 AI-First Design** - Built-in LangChain integration for seamless AI functionality
- **⚡ High Performance** - Next.js 15 with React 19 and advanced optimization
- **🔒 Enterprise Security** - Comprehensive authentication and authorization system
- **🌍 Global Ready** - Full internationalization support out of the box
- **📱 Responsive Design** - Modern UI components with Tailwind CSS 4.0

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19 with latest features
- **Styling**: Tailwind CSS 4.0 + Custom component library
- **Forms**: React Hook Form with Zod validation
- **Icons**: Radix UI Icons + React Icons
- **State**: SWR for server state management

### Backend & Infrastructure
- **API**: Hono framework for lightweight, fast APIs
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with social providers
- **AI/ML**: LangChain for AI orchestration
- **Caching**: Custom caching layer
- **Email**: Integrated email system

### Development Experience
- **Language**: TypeScript 5.8+ with strict configuration
- **Build System**: Turbo with parallel execution
- **Code Quality**: Biome for linting and formatting
- **Testing**: Vitest for unit and integration tests
- **Git Hooks**: Husky for pre-commit validation
- **Package Manager**: pnpm with workspace support

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** 20+ or 22+
- **pnpm** 9.10.0+
- **PostgreSQL** database
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tazeai/tazeai.git
   cd tazeai
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Configure your environment variables
   ```

4. **Database setup**
   ```bash
   pnpm db:push
   pnpm db:seed
   ```

5. **Start development**
   ```bash
   pnpm dev
   ```

Visit [http://localhost:3000](http://localhost:3000) for the web app and [http://localhost:3001](http://localhost:3001) for the admin console.

## 📁 Project Structure

```
tazeai/
├── apps/
│   ├── app/           # Management console (Next.js)
│   ├── web/           # Public website (Next.js)
│   └── docs/          # Documentation site
├── packages/
│   ├── core/          # API client and business logic
│   ├── db/            # Database layer (Drizzle ORM)
│   ├── auth/          # Authentication system
│   ├── ai/            # AI services (LangChain)
│   ├── ui/            # Shared UI components
│   ├── cache/         # Caching utilities
│   ├── email/         # Email templates and services
│   └── i18n/          # Internationalization
└── docker/            # Docker configurations
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development servers |
| `pnpm build` | Build all packages and apps |
| `pnpm test` | Run test suites |
| `pnpm lint` | Lint and format code |
| `pnpm typecheck` | Type checking |
| `pnpm clean` | Clean build artifacts |
| `pnpm start` | Start production servers |

## 🌟 Features

### Core Capabilities
- ✅ **Modular Architecture** - Clean separation of concerns
- ✅ **Type Safety** - End-to-end TypeScript coverage
- ✅ **Authentication** - Multi-provider auth system
- ✅ **Database** - PostgreSQL with migrations
- ✅ **AI Integration** - LangChain-powered AI features
- ✅ **Internationalization** - Multi-language support
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Performance** - Optimized builds and caching
- ✅ **Developer Experience** - Hot reload, debugging tools
- ✅ **Production Ready** - Docker, monitoring, analytics

### Applications
- **Web App**: Public-facing website with landing pages
- **Admin Console**: Management interface for system administration
- **Documentation**: Comprehensive docs with search and navigation

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

### Code Standards
- Follow TypeScript best practices
- Use conventional commits
- Maintain test coverage
- Document public APIs

## 📚 Documentation

- [🏗️ Infrastructure Guide](./infra.md)
- [📖 Full Documentation](./docs)
- [🚀 Deployment Guide](./docs/deployment.md)
- [🔧 API Reference](./docs/api.md)

## 📄 License

This project is licensed under the [Apache License 2.0](./LICENSE).

## 🙏 Acknowledgments

Built with ❤️ using open source technologies:
- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [LangChain](https://langchain.com/) - AI Framework
- [Turbo](https://turbo.build/) - Monorepo tooling

---

<div align="center">

**[⭐ Star this project](https://github.com/tazeai/tazeai)** if you find it useful!

Made with 🚀 by the TazeAI team

</div>
