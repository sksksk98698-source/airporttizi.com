# 🐱 梯子猫 AirportTizi (airporttizi.com)

<p align="center">
  <a href="https://airporttizi.com">
    <img src="public/favicon/favicon.png" alt="AirportTizi Logo" width="96" height="96" />
  </a>
</p>

<p align="center">
  <strong>现代化、高性能、全自动化 SEO 的科学上网导航与优质机场评测知识库</strong>
</p>

<p align="center">
  <a href="https://astro.build"><img src="https://img.shields.io/badge/Astro-v5-FF5D01?logo=astro&logoColor=white" alt="Astro" /></a>
  <a href="https://svelte.dev"><img src="https://img.shields.io/badge/Svelte-v5-FF3E00?logo=svelte&logoColor=white" alt="Svelte" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white" alt="TailwindCSS" /></a>
  <a href="https://pagefind.app"><img src="https://img.shields.io/badge/Search-Pagefind-4153B8" alt="Pagefind" /></a>
  <img src="https://img.shields.io/badge/SEO-Deploy%20Gate%20Passed-success" alt="SEO Gate" />
  <a href="https://airporttizi.com"><img src="https://img.shields.io/badge/Status-Live%20Healthy-brightgreen" alt="Status" /></a>
  <img src="https://img.shields.io/badge/License-MIT-blue" alt="License" />
</p>

---

## 📖 项目简介 (About)

**梯子猫 AirportTizi** ([airporttizi.com](https://airporttizi.com)) 是基于 **Astro 5 + Svelte 5 + Tailwind CSS v4** 构建的现代化静态站点。专注于提供深度优质的机场评测、协议线路技术解析（IPLC/IEPL/BGP）、客户端配置教程（Clash/Shadowrocket/Sing-box）以及安全防坑知识指南。

项目拥有工业级静态构建架构与**独创的 SEO 自动化发布门禁（Deploy Gatekeeper）**，确保全站 240+ 页面在 Google、Bing、百度等各大搜索引擎中拥有极佳的抓取友好度与索引稳定性。

---

## 🌟 核心亮点与特性 (Features)

- ⚡ **极致性能与轻量化**：基于 Astro 5 静态岛屿架构（Islands Architecture），零冗余 JS，瞬时首屏加载。
- 🔍 **全站毫秒级搜索**：集成 [Pagefind](https://pagefind.app/) 静态离线搜索引擎，支持多语言分词与实时快速检索。
- 🛡️ **SEO 自动化发布门禁 (Deploy Gatekeeper)**：
  - 严格校验双 Sitemap 规范（`sitemap.xml` 与 `sitemap-index.xml` 200 响应）；
  - 全站 100% 绝对规范自引用 Canonical 检查；
  - 自动化死链与空链接（`href="#"`）深度扫描；
  - JSON-LD（WebSite, BlogPosting, CollectionPage, BreadcrumbList）结构化数据合规审计；
  - 分页与分类页面标题（Title）防重检查。
- 🚀 **即时索引推送 (IndexNow)**：
  - 内置基于 SHA-256 增量哈希检测脚本，构建与更新后自动向 Bing / Yandex 推送有变更的页面。
- 🎨 **精美设计与多端自适应**：
  - 完美支持明暗主题无缝切换（Light / Dark Mode）；
  - 移动端、平板、桌面端全设备流式响应；
  - 细致的代码块高亮与 Mermaid 流程图原生渲染支持。

---

## 🧭 8 大核心专栏架构 (Core Pillars)

| 专栏路径 | 专栏名称 | 核心内容与定位 |
|:---|:---|:---|
| [`/vpn/`](https://airporttizi.com/vpn/) | **VPN 专区** | VPN 与传统代理协议深度对比、隐私安全与节点选型 |
| [`/jichang/`](https://airporttizi.com/jichang/) | **机场推荐** | 2026 最新高性价比优质机场横评与测速排名 |
| [`/clash/`](https://airporttizi.com/clash/) | **Clash 指南** | Clash Verge、Clash Meta 客户端下载与规则进阶 |
| [`/nodes/`](https://airporttizi.com/nodes/) | **节点解析** | IPLC / IEPL 专线、BGP 跨境中继与直连线路科普 |
| [`/tizi/`](https://airporttizi.com/tizi/) | **梯子科普** | 科学上网入门知识、防失联、防跑路避坑常识 |
| [`/free/`](https://airporttizi.com/free/) | **免费试用** | 优质机场白嫖试用、免费节点收集与安全注意事项 |
| [`/tutorial/`](https://airporttizi.com/tutorial/) | **配置教程** | iOS / Android / Windows / macOS / 软路由保姆级教程 |
| [`/brands/`](https://airporttizi.com/brands/) | **品牌矩阵** | 80+ 知名机场品牌全景索引、官网备用地址与评测合集 |

---

## 📂 目录结构 (Repository Structure)

```text
airporttizi.com/
├── public/                     # 静态资源与搜索引擎验证文件
│   ├── favicon/                # 站点图标与 Logo
│   ├── 6c7a9f8b...txt         # IndexNow 官方 API 密钥验证文件
│   └── robots.txt              # 爬虫抓取协议 (动态/静态)
├── scripts/                    # 运维与自动化工具脚本
│   ├── seo-check.js            # 自动化 SEO 门禁检查脚本 (10 项合规体检)
│   └── indexnow.js             # IndexNow 增量内容变更检测与推送
├── src/
│   ├── components/             # Astro / Svelte 页面与 UI 组件
│   │   ├── misc/SEO.astro      # 核心全局 SEO 控制器 (Canonical, Meta, Schema)
│   │   └── ...
│   ├── config.ts               # 站点全局配置 (站点名、域名、导航、站长验证等)
│   ├── content/                # Markdown 内容集合
│   │   └── posts/              # 170+ 篇深度评测与配置教程文章
│   ├── layouts/                # 页面骨架布局模板
│   └── pages/                  # 静态路由目录
│       ├── [...lang]/          # 国际化/主站页面 (首页、分页、归档、8 大专栏)
│       └── 404.astro           # 404 错误页面 (已做 noindex 隔离)
├── astro.config.mjs            # Astro 配置文件 (集成 Sitemap, Pagefind 等)
├── package.json                # 项目依赖与发布门禁脚本
└── tsconfig.json               # TypeScript 配置
```

---

## 🛠️ 本地开发与快速上手 (Getting Started)

### 1. 环境准备
- **Node.js** >= 20.0.0
- **pnpm** >= 9.0.0

### 2. 克隆仓库与安装依赖
```bash
git clone https://github.com/sksksk98698-source/airporttizi.com.git
cd airporttizi.com
pnpm install
```

### 3. 常用开发指令

| 命令 | 说明 |
|:---|:---|
| `pnpm dev` | 启动本地热重载开发服务器 (`http://localhost:4321`) |
| `pnpm build` | 编译打包生产静态文件至 `dist/` 目录并生成搜索索引 |
| `pnpm preview` | 本地预览编译后的生产站点 |
| `pnpm run seo:check` | 执行 10 项 SEO 自动化健康体检（检查 canonical、死链、sitemap 等） |
| `pnpm run deploy:gate` | **生产发布门禁**：自动执行 build + 搜索索引构建 + SEO 门禁全面校验 |
| `pnpm run indexnow` | 推送站点最新内容至 Bing / Yandex 等支持 IndexNow 的引擎 |

---

## 🚦 发布安全门禁 (Deploy Gatekeeper)

为了杜绝上线后搜索引擎出现掉索引、抓取 404、重复标题等问题，本项目在流水线中内置了强制性安全门禁：

```bash
pnpm run deploy:gate
```

**门禁输出样例：**
```text
=========================================
           SEO HEALTH CHECK              
=========================================

Build:            PASS
Robots:           PASS
Noindex:          PASS
Canonical:        PASS
Sitemap:          PASS
Internal Links:   PASS
Core URLs:        PASS
Schema:           PASS
Duplicate Titles: PASS
Page Count:       PASS

-----------------------------------------
RELEASE_DECISION: READY
-----------------------------------------

✅ 全部核心 SEO 检查通过，允许发布至生产环境！
```
> 若有任何一项未通过（例如出现死链或内页误设 noindex），脚本将抛出 Exit Code 1，直接阻断生产发布。

---

## 🚀 生产部署建议 (Deployment)

### 选项 A：Cloudflare Pages（推荐）
1. 在 Cloudflare Pages 中连接本 GitHub 仓库。
2. 构建设置：
   - **Framework Preset**: `Astro`
   - **Build Command**: `pnpm run deploy:gate`
   - **Build Output Directory**: `dist`
3. 环境变量：
   - `NODE_VERSION`: `20`

### 选项 B：Vercel
1. 导入 GitHub 仓库。
2. Vercel 会自动识别 Astro 项目。
3. 将 Build Command 设置为：`pnpm run deploy:gate`，输出目录为 `dist`。

---

## 📄 文章 Frontmatter 规范 (Writing Guide)

在 `src/content/posts/` 中创建新评测或文章时，请遵循以下规范：

```yaml
---
title: "XX 机场怎么样？2026 套餐价格、节点与线路稳定性评测"
published: 2026-03-20
description: "详细评测 XX 机场 2026 年最新节点线路、流媒体与 ChatGPT 解锁表现，附测速数据与优惠购买指南。"
tags: ["机场评测", "IEPL专线", "科学上网"]
category: "机场推荐"
draft: false
---
```

---

## ⚖️ 免责声明 (Disclaimer)

本项目所刊登之所有内容（包括技术评测、客户端配置、网络工具介绍等）仅供计算机网络技术研究、学习与交流参考。请遵守当地法律法规，合理合法使用互联网网络技术。

---

## 📄 开源许可 (License)

本项目遵循 [MIT License](LICENSE) 协议。
