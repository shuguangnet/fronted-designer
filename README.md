# ComBuilder

企业官网低代码构建平台。拖拽式页面编辑，多主题切换，零代码搭建专业企业官网。

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

## 功能特性

- **可视化页面构建器** — 拖拽组件到画布，实时预览，所见即所得
- **20+ 预置组件** — 布局容器、文本、图片、按钮、Hero、导航栏、定价表等
- **组件树面板** — 图层式结构视图，快速定位和选中嵌套组件
- **多主题系统** — 内置主题模板，一键切换品牌风格
- **响应式预览** — 桌面 / 平板 / 手机三种设备视图切换
- **撤销/重做** — 完整操作历史，支持 Cmd+Z 快捷键
- **页面版本控制** — 版本快照，随时回滚
- **用户权限管理** — Admin / Editor / User 三级角色
- **媒体库** — 图片资源统一管理，支持文件夹分类
- **表单收集** — 内置联系表单，提交数据自动入库

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 15 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS 4, shadcn/ui |
| 拖拽 | @dnd-kit/core + @dnd-kit/sortable |
| 状态管理 | Zustand 5 |
| 数据库 | Prisma 6 + SQLite |
| 认证 | NextAuth.js |
| 表单 | React Hook Form + Zod |
| 语言 | TypeScript 5 |

## 项目结构

```
├── app/                    # Next.js App Router 页面
│   ├── api/                # API 路由 (pages, themes)
│   ├── builder/            # 构建器页面
│   └── demo/               # 演示页面
├── components/
│   ├── builder/            # 构建器核心
│   │   ├── canvas/         # 画布 (Canvas, RenderComponent)
│   │   └── sidebar/        # 侧边栏 (组件库, 属性面板, 图层树)
│   └── ui/                 # shadcn/ui 组件
├── builder-components/     # 可拖拽的页面组件
│   ├── base/               # 布局: Container, Row, Column, Spacer, Divider
│   ├── content/            # 内容: Text, Image, Button, Video, Icon, Link
│   └── advanced/           # 高级: Hero, Navbar, Footer, FAQ, PricingTable...
├── store/                  # Zustand 状态管理
├── prisma/                 # 数据库 Schema & Seed
├── lib/                    # 工具函数
├── types/                  # TypeScript 类型定义
└── components.registry.ts  # 组件注册表
```

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm

### 安装

```bash
# 克隆项目
git clone <repo-url>
cd com

# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env.local

# 初始化数据库
pnpm db:generate
pnpm db:push
pnpm db:seed

# 启动开发服务器
pnpm dev
```

访问 http://localhost:3000 查看首页，点击「进入构建器」开始使用。

### 可用脚本

```bash
pnpm dev          # 启动开发服务器 (Turbopack)
pnpm build        # 生产构建
pnpm start        # 启动生产服务器
pnpm lint         # ESLint 检查
pnpm db:generate  # 生成 Prisma Client
pnpm db:push      # 同步数据库结构
pnpm db:seed      # 填充种子数据
```

## 构建器使用

1. 从左侧**组件库**拖拽组件到画布
2. 点击画布中的组件进行选中
3. 在右侧**属性面板**编辑组件属性
4. 使用**图层面板**查看组件树结构
5. 顶部工具栏切换设备预览 / 预览模式 / 代码模式
6. 快捷键: `Cmd+S` 保存, `Cmd+Z` 撤销, `Cmd+D` 复制, `Delete` 删除

## License

MIT
