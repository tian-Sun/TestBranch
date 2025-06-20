# Life is a Game - 游戏化时间追踪器

一个将生活游戏化的时间追踪应用，每个任务都是通往宝藏山的一步。

## 🎮 特性

- ⏱️ **专注计时器** - 简单易用的番茄钟功能
- 🏆 **任务记录** - 记录完成的任务和评分
- 💎 **宝藏系统** - 将任务转化为宝藏，可视化成就感
- 📊 **数据统计** - 查看任务完成情况和时间统计
- 🎨 **精美UI** - 现代化的渐变设计和动画效果
- 📱 **响应式设计** - 完美适配各种设备

## 🚀 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **状态管理**: React Hooks + LocalStorage

## 🛠️ 开发

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

## 📦 部署

项目已配置为可直接部署到 Vercel：

1. 推送代码到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

## 🎯 使用说明

1. **开始任务** - 点击"开始任务"按钮开始计时
2. **完成任务** - 点击"完成任务"按钮结束计时
3. **记录任务** - 填写任务描述和评分
4. **查看宝藏** - 在宝藏山中查看所有完成的任务
5. **统计数据** - 查看总体完成情况和时间统计

## 📁 项目结构

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # 根布局
│   └── page.tsx        # 主页面
├── components/         # React 组件
│   ├── Timer.tsx       # 计时器组件
│   ├── TaskModal.tsx   # 任务模态框
│   ├── TreasureGrid.tsx # 宝藏网格
│   ├── TaskDetailModal.tsx # 任务详情模态框
│   ├── Stats.tsx       # 统计组件
│   └── TreasureBox.tsx # 宝藏盒子组件
├── hooks/             # 自定义 Hooks
│   ├── useTimer.ts    # 计时器 Hook
│   └── useTasks.ts    # 任务管理 Hook
├── types/             # TypeScript 类型定义
└── utils/             # 工具函数
```

## 🎨 设计理念

这个应用将日常任务游戏化，通过可视化的宝藏系统来激励用户完成任务。每个完成的任务都会变成宝藏山上的一个宝藏，让用户能够直观地看到自己的成就。

---

让生活变得更有趣，让每个任务都成为通往宝藏山的一步！ 🏔️✨
