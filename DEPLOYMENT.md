# Next.js 项目部署说明

## 项目类型
这是一个 Next.js 14 + React + TypeScript 项目，使用 App Router。

## 项目特性
- ✅ Next.js 14 App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Lucide React 图标
- ✅ 响应式设计
- ✅ 游戏化时间追踪

## 本地开发
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## Vercel 部署
1. 确保代码已推送到 GitHub
2. 在 Vercel 中导入项目
3. Vercel 会自动检测到 Next.js 项目
4. 点击部署即可

## 项目结构
```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # 根布局
│   └── page.tsx        # 主页面
├── components/         # React 组件
├── hooks/             # 自定义 Hooks
├── types/             # TypeScript 类型定义
└── utils/             # 工具函数
```

## 技术栈
- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **状态管理**: React Hooks + LocalStorage

## 注意事项
- 项目使用 Next.js App Router
- 所有组件都是客户端组件（使用 'use client'）
- 数据持久化使用 LocalStorage
- 完全响应式设计 