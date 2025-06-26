<div align="center">

# TazeAI

**🚀 下一代 AI 驱动的开发平台**

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-10+-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/tazeai/tazeai)

[🇺🇸 English](./README.md) • [📖 文档](./docs) • [🏗️ 基础设施](./infra.md)

</div>

---

## ✨ 项目简介

TazeAI 是一个尖端的企业级 AI 开发平台，采用现代 TypeScript 技术栈构建。它提供了一个全面的 monorepo 架构，用于构建可扩展的 AI 驱动应用程序，并具有一流的开发者体验。

### 🎯 核心亮点

- **🏗️ Monorepo 架构** - 使用 pnpm 工作空间和 Turbo 优化开发工作流
- **🤖 AI 优先设计** - 内置 LangChain 集成，提供无缝的 AI 功能
- **⚡ 高性能** - Next.js 15 配合 React 19 和高级优化
- **🔒 企业级安全** - 全面的身份验证和授权系统
- **🌍 国际化就绪** - 开箱即用的完整国际化支持
- **📱 响应式设计** - 基于 Tailwind CSS 4.0 的现代 UI 组件

## 🛠️ 技术栈

### 前端
- **框架**: Next.js 15 with App Router
- **UI 库**: React 19 最新特性
- **样式**: Tailwind CSS 4.0 + 自定义组件库
- **表单**: React Hook Form 配合 Zod 验证
- **图标**: Radix UI Icons + React Icons
- **状态管理**: SWR 用于服务器状态管理

### 后端和基础设施
- **API**: Hono 框架，轻量且快速
- **数据库**: PostgreSQL 配合 Drizzle ORM
- **身份验证**: Better Auth 支持多种社交登录
- **AI/ML**: LangChain 用于 AI 编排
- **缓存**: 自定义缓存层
- **邮件**: 集成邮件系统

### 开发体验
- **语言**: TypeScript 5.8+ 严格配置
- **构建系统**: Turbo 并行执行
- **代码质量**: Biome 用于代码检查和格式化
- **测试**: Vitest 用于单元和集成测试
- **Git 钩子**: Husky 用于提交前验证
- **包管理器**: pnpm 工作空间支持

## 🚀 快速开始

### 前置要求

确保已安装以下工具：
- **Node.js** 20+ 或 22+
- **pnpm** 9.10.0+
- **PostgreSQL** 数据库
- **Git** 版本控制工具

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/tazeai/tazeai.git
   cd tazeai
   ```

2. **安装依赖**
   ```bash
   pnpm install
   ```

3. **环境配置**
   ```bash
   cp .env.example .env
   # 配置环境变量
   ```

4. **数据库设置**
   ```bash
   pnpm db:push
   pnpm db:seed
   ```

5. **启动开发服务器**
   ```bash
   pnpm dev
   ```

访问 [http://localhost:3000](http://localhost:3000) 查看 Web 应用，[http://localhost:3001](http://localhost:3001) 查看管理控制台。

## 📁 项目结构

```
tazeai/
├── apps/
│   ├── app/           # 管理控制台 (Next.js)
│   ├── web/           # 公共网站 (Next.js)
│   └── docs/          # 文档站点
├── packages/
│   ├── core/          # API 客户端和业务逻辑
│   ├── db/            # 数据库层 (Drizzle ORM)
│   ├── auth/          # 身份验证系统
│   ├── ai/            # AI 服务 (LangChain)
│   ├── ui/            # 共享 UI 组件
│   ├── cache/         # 缓存工具
│   ├── email/         # 邮件模板和服务
│   └── i18n/          # 国际化
└── docker/            # Docker 配置
```

## 🔧 可用脚本

| 命令 | 描述 |
|------|------|
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 构建所有包和应用 |
| `pnpm test` | 运行测试套件 |
| `pnpm lint` | 代码检查和格式化 |
| `pnpm typecheck` | 类型检查 |
| `pnpm clean` | 清理构建产物 |
| `pnpm start` | 启动生产服务器 |

## 🌟 功能特性

### 核心能力
- ✅ **模块化架构** - 清晰的关注点分离
- ✅ **类型安全** - 端到端 TypeScript 覆盖
- ✅ **身份验证** - 多提供商认证系统
- ✅ **数据库** - PostgreSQL 配合迁移
- ✅ **AI 集成** - LangChain 驱动的 AI 功能
- ✅ **国际化** - 多语言支持
- ✅ **响应式设计** - 移动优先方案
- ✅ **性能优化** - 构建和缓存优化
- ✅ **开发体验** - 热重载、调试工具
- ✅ **生产就绪** - Docker、监控、分析

### 应用程序
- **Web 应用**: 面向公众的网站和着陆页
- **管理控制台**: 系统管理的管理界面
- **文档**: 带搜索和导航的综合文档

## 🤝 贡献指南

我们欢迎贡献！请查看我们的 [贡献指南](./CONTRIBUTING.md) 了解详情。

### 开发工作流
1. Fork 仓库
2. 创建功能分支
3. 进行更改
4. 添加测试和文档
5. 提交 Pull Request

### 代码标准
- 遵循 TypeScript 最佳实践
- 使用约定式提交
- 保持测试覆盖率
- 为公共 API 编写文档

## 📚 文档

- [🏗️ 基础设施指南](./infra.md)
- [📖 完整文档](./docs)
- [🚀 部署指南](./docs/deployment.md)
- [🔧 API 参考](./docs/api.md)

## 📄 许可证

本项目基于 [Apache License 2.0](./LICENSE) 许可证。

## 🙏 致谢

使用以下开源技术构建，充满 ❤️：
- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [LangChain](https://langchain.com/) - AI 框架
- [Turbo](https://turbo.build/) - Monorepo 工具

---

<div align="center">

**[⭐ 收藏这个项目](https://github.com/tazeai/tazeai)** 如果你觉得有用！

由 TazeAI 团队用 🚀 制作

</div>
