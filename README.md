# AI市场 · AI ATLAS

按 **LLM、视听觉 Agent、专业 Agent、垂直细分** 分类，个人学习市面 AI 产品并浏览快讯。

## 本地打开

```bash
cd ai-scene-learn
npx serve . -l 8765
```

浏览器访问：http://127.0.0.1:8765

## 快讯每日 8:00 自动更新（静态站方案）

站点是**静态网页**，快讯数据存在根目录 `news.json`。前端打开时会 `fetch('./news.json')`，因此只要定时重新生成并发布 `news.json`，用户刷新即可看到新内容——**不需要后端服务器**。

### 推荐：GitHub Actions + GitHub Pages

```
每天 08:00（北京时间）
    ↓
GitHub Actions 跑 npm run news:pipeline
    ↓
采集官网 → 转译中文 → 写 news.json
    ↓
自动 commit & push 到 main
    ↓
GitHub Pages 静态托管（约 1 分钟生效）
    ↓
用户访问网页，加载最新 news.json
```

**一次性配置：**

1. 把项目推到 GitHub（可用 `scripts/deploy-github.ps1`）
2. 仓库 **Settings → Pages → Source** 选 `Deploy from branch`，分支 `main`，目录 `/ (root)`
3. **Settings → Secrets → Actions** 添加（可选但推荐）：
   - `DEEPSEEK_API_KEY` — 启用完整 Agent 分析 + 高质量中译
4. **Settings → Variables → Actions**（可选）：
   - `RSSHUB_BASE` — 如 `https://rsshub.app`
5. 定时任务已配置：`.github/workflows/daily-news.yml`（cron `0 0 * * *` = 北京时间 8:00）

**手动试跑：** GitHub 仓库 → **Actions** → **Daily News Fetch** → **Run workflow**

**本地验证：**

```bash
npm run news:pipeline
npm run dev
```

### 不用 GitHub 时

| 方案 | 做法 |
|------|------|
| Windows 计划任务 | 每天 8:00 运行 `npm run news:pipeline`，再把 `news.json` 同步到托管目录 |
| 云函数 + 对象存储 | 定时触发脚本，输出 `news.json` 到 OSS/COS，CDN 回源 |
| Vercel Cron | `vercel.json` 配 cron 调用 Serverless 函数跑 pipeline 并写文件（需适配） |

静态站核心原则：**构建/更新数据文件 → 部署到 CDN/Pages**，浏览器只读 JSON，无需 Node 运行时。

## 结构

- `index.html` — 页面骨架
- `styles.css` — 视觉样式（暗色沉浸风）
- `data.js` — 分类 / 产品 / 快讯数据
- `app.js` — 交互与路由
- `logos/` — 产品 Logo

## 功能

1. 四大分类学习地图（含 Agent 子分类）
2. 41+ 产品介绍页
3. 顶部搜索 + 快讯流
4. H5 / 桌面全屏自适应
