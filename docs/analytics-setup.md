# 访问统计（仅站长可见）

公开访客**无需登录**，正常浏览站点；访问记录静默写入 Supabase，只有你用账号登录 `admin.html` 才能查看。

## 1. 创建 Supabase 项目

1. 打开 [supabase.com](https://supabase.com) 注册并新建项目
2. 进入 **Project Settings → API**，记下：
   - **Project URL** → `supabaseUrl`
   - **anon public** key → `supabaseAnonKey`

## 2. 建表与权限

在 **SQL Editor** 中执行：

```
scripts/supabase-visits.sql
```

策略说明：

- `anon` 角色：只能 **INSERT**（访客上报）
- `authenticated` 角色：只能 **SELECT**（你登录后读取）

## 3. 创建你的管理员账号

Supabase Dashboard → **Authentication → Users → Add user**

填入你的邮箱和密码（仅你用来登录 admin 页）。

## 4. 启用前端上报

编辑根目录 `analytics-config.js`：

```js
window.ANALYTICS_CONFIG = {
  enabled: true,
  supabaseUrl: "https://xxxx.supabase.co",
  supabaseAnonKey: "eyJhbGciOi...",
};
```

部署后，访客每次切换页面（市场 / 快讯 / 产品详情等）会自动记录一条访问。

## 5. 查看访问记录

浏览器打开（不要放在公开导航里）：

```
https://你的域名/admin.html
```

例如 GitHub Pages：

```
https://zhangyidi1017-hub.github.io/ai-atlas/admin.html
```

用你的 Supabase 账号登录即可看到统计与明细。

## 记录字段

| 字段 | 说明 |
|------|------|
| session_id | 单次浏览器会话（sessionStorage） |
| view | 当前视图：home / news / product 等 |
| path | URL 路径 |
| referrer | 来源站点 |
| user_agent / screen | 设备信息 |
| created_at | 访问时间 |

## 隐私说明

- 不收集姓名、邮箱等个人信息
- 未启用 `enabled: true` 时，站点行为与以前完全一致
- `admin.html` 已设置 `noindex`，避免被搜索引擎收录
