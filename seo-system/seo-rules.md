# 机场梯子评测网 SEO / GEO / Search Discovery 规范与实施守则

> **版本**：v1.0.0  
> **生效时间**：2026-09-19  
> **维护目录**：`seo-system/`  
> **规范性质**：全站强制基线（技术、内容、路由与发布均须严格遵守）

---

## 一、 规范域名与规范 URL（Canonical Rules）

1. **唯一规范主域名**：
   - 官方主域名唯一确认为：`https://airporttizi.com`
   - 强制采用 `https://` 协议与 **非 www**（naked domain）结构。
   - 所有 `http://*` 以及 `https://www.airporttizi.com/*` 均须在 Web 服务器层（Nginx/Caddy/Cloudflare）配置永久 301 重定向至 `https://airporttizi.com/*`。

2. **结尾斜杠（Trailing Slash）规范**：
   - **HTML 网页目录**：除独立静态文件（如 `.html`, `.xml`, `.txt`, `.json`）外，所有内容页面与目录层级必须以尾斜杠结尾（Trailing Slash），如：`https://airporttizi.com/posts/best-vpn-airport-recommendation-2026/`。
   - **Canonical 标签输出**：所有页面 `<link rel="canonical" href="..." />` 输出的绝对地址必须带尾斜杠，并与规范主域名完全保持一致。

---

## 二、 既有 URL 保护红线（Existing URL Protection Doctrine）

1. **零破坏准则（Zero Breaking Changes）**：
   - 站点已上线的 **49 个既有有效 URL**（含 15 个枢纽/分类/单页、12 篇核心指南文章、19 个品牌深度评测页、`/2/` 分页、`/404.html`）已在 `seo-system/existing-url-registry.json` 中全部置为 `"protected": true`。
   - **严禁**擅自修改、重命名既有文章的 slug、文件名或路由模式。
   - **严禁**在无人工明确授权下，对已收录的 `/posts/[slug]/` 或 `/reviews/[id]/` 实施批量 301 重定向，坚决规避权重分散与流量震荡。

2. **主动重定向清单控制**：
   - `seo-system/redirects.json` 当前严格保持为空数组 `[]`。
   - 任何未来的重构提议仅记录于 `seo-system/redirect-proposal.json` 备忘，非必要不激活。

---

## 三、 未来新增内容 URL 规范（Future Taxonomy）

为保持长期架构清晰，未来新增文章与专题将采用分类清晰的路径体系（与旧 URL 并存）：

| 场景分类 | 未来标准 URL 结构 | 示例 | 说明 |
| :--- | :--- | :--- | :--- |
| **纯技术与分流教程** | `/tutorials/[topic-slug]/` | `/tutorials/sing-box-ios-full-guide/` | 保持纯技术教程独立层级 |
| **全平台客户端专题** | `/clients/[platform-slug]/` | `/clients/windows-vpn-clients/` | 客户端下载与版本索引 |
| **故障排查与报错专项** | `/problems/[error-slug]/` | `/problems/clash-dns-leak-fix/` | 解决特定报错搜索流量 |
| **新增品牌评测库** | `/brands/[brand-slug]/` | `/brands/flyingbird-review/` | 与已有 `/reviews/[id]/` 并行索引 |

---

## 四、 关键词意图承接与防同相相食规则（Anti-Cannibalization）

1. **一核心意图一权威页面原则（One Intent, One URL）**：
   - 每个核心搜索词（如“机场推荐”、“梯子推荐”、“科学上网客户端”）只分配一个主承接落地页（Pillar Page）。
   - 禁止在不同文章中竞争完全一致的 Primary Keyword。

2. **既有 6 组冲突消解与分流矩阵**：
   - **“机场推荐” vs “梯子推荐”**：
     - `机场推荐` / `翻墙机场推荐` 归属于 `/posts/best-vpn-airport-recommendation-2026/`（突出综合选购、便宜性价比与入门指南）。
     - `梯子推荐` / `机场天梯榜` 归属于 `/posts/latest-airport-ladder-speed-stability-ranking-2026/`（突出晚高峰测速天梯、吞吐速率与抗封锁稳定性）。
   - **“翻墙客户端下载” vs “翻墙工具汇总”**：
     - `客户端下载/全平台配置` 归属于 `/posts/cross-platform-vpn-client-setup-guide/`。
     - `工具对比与协议选型` 归属于 `/posts/best-vpn-proxy-tools-2026/`。
   - **“Clash配置/规则”**：
     - 深度进阶分流与防封归属于 `/posts/clash-rules-advanced-guide-2026/`。
     - 基础 Verge Rev GUI 入门归属于 `/posts/clash-verge-rev-tutorial/`。
   - **“Shadowrocket小火箭”**：
     - 账号获取痛点归属于 `/posts/free-us-apple-id-shadowrocket-daily-update/`。
     - 客户端上手操作与节点添加归属于 `/posts/shadowrocket-ios-tutorial/`。
   - **“专线机场与线路选择”**：
     - 理论底座归属于 `/posts/iplc-iepl-dedicated-line-guide/`。
     - 品牌实测归属于 `/reviews/` 矩阵。
   - **“流媒体与AI工具解锁”**：
     - 专属于 `/posts/chatgpt-claude-netflix-disney-unlock-guide/`。

---

## 五、 内链拓扑与锚文本多样性规范（Internal Linking & Anchor Text Rules）

1. **锚文本多样性（Anchor Text Naturalization）**：
   - 指向同一个落地页的所有内链锚文本中，单一精确匹配关键词的占比**不得超过 40%**。
   - 剩余 60% 必须分散为语义变体、长尾描述或上下文自然引导语（如“参阅《2026综合机场推荐》”、“查看详细测速天梯榜”）。

2. **主题集群回流准则（Cluster Silo Law）**：
   - Spoke 文章必须包含至少 1 条指向本集群 Pillar 核心页面的权威反向链接。
   - 单品牌评测页文末必须统一链接回全站核心推荐总榜或品牌导航页。
   - 相同定位/价位的单品牌评测之间（如“AmyTelecom”与“Nexitally”）建议构建横向比对内链。

---

## 六、 结构化数据标准（Schema.org JSON-LD Specification）

每篇新生成或优化的页面必须包含合规的 JSON-LD 结构化数据：

1. **指南文章页**：
   - 必须包含 `@type: "TechArticle"` 或 `"Article"`。
   - 声明 `headline`, `description`, `author`, `publisher`, `datePublished`, `dateModified`, `mainEntityOfPage`。
   - 若包含步骤指引，建议附加 `HowTo` 模式。
   - 若文末包含常见问答，必须附加 `FAQPage` 结构化标记。

2. **品牌评测页**：
   - 必须包含 `@type: "Review"`。
   - 声明 `itemReviewed` (`@type: "Product"` / `"Service"`), `reviewRating`, `author`, `publisher`。

3. **全站面包屑导航**：
   - 必须包含 `BreadcrumbList` 模式，指示层级结构（Home > Hub > Current Page）。

---

## 七、 GEO 与搜索发现优化规范（Generative Engine Optimization）

针对 Perplexity、ChatGPT Search、Bing Copilot、Google Gemini / AI Overviews 等大模型对话引擎的抓取与引用逻辑，文章撰写须遵循以下准则：

1. **前 100 词直答法则（Direct Factual Answer）**：
   - 核心问题、结论、价格区间或推荐首选必须在正文前 100 字内以清晰肯定句给出，杜绝长篇铺垫。

2. **高密度实体与事实表格（High-density Entities & Markdown Tables）**：
   - 详细列出技术协议（如 Trojan、VLESS-Reality、Hysteria 2、TUIC）、入口机房运营商（如唯云、沪港专线、深港IEPL）、测速数据（晚高峰丢包率、4K缓冲时间、延迟毫秒）。
   - 关键对比统一采用规范 Markdown 表格呈现，极大提升 AI 摘要抓取效率。

3. **结构化问答单元（Self-contained Q&A Units）**：
   - 每个 H2/H3 标题必须为完整的疑问句或明确主题（如 `### 2. 为什么 IPLC 专线晚高峰不会断连？`）。
   - 标题下方紧跟 2-3 句话直接解释，随后展开要点。

---

## 八、 IndexNow 增量同步机制

1. **密钥配置**：
   - 站点专用公钥：`6c7a9f8b1d2e4f5a8b7c6d5e4f3a2b1c`
   - 验证文件物理路径：`public/6c7a9f8b1d2e4f5a8b7c6d5e4f3a2b1c.txt`
   - 验证文件线上访问：`https://airporttizi.com/6c7a9f8b1d2e4f5a8b7c6d5e4f3a2b1c.txt`

2. **自动化触发脚本**：
   - 运行方式：`node scripts/indexnow.js`（支持 `--dry-run` 预览）。
   - 逻辑：读取当前构建生成的 HTML，计算内容 Hash，与 `seo-system/indexnow-state.json` 比对，仅向上游 Bing / Yandex / IndexNow API 提交新增或发生内容变动的 URL，避免配额浪费与无意义频发。
