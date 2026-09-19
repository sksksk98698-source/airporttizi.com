# 全站 SEO 关键词防内耗与意图冲突审计报告 (SEO Cannibalization Report)

> **版本**：V1.0  
> **更新时间**：2026-03-19  
> **维护责任**：高级 SEO 架构团队  
> **执行依据**：《反重力 SEO 内容生产与关键词防内耗总规范》

---

## 一、冲突诊断与处置矩阵表

| 冲突组 (Conflict Group) | 核心关键词 (Keyword) | 搜索意图 (Search Intent) | 权威主页面 (Primary URL) | 潜在竞争页面 (Competing URLs) | 风险等级 (Risk Level) | 处置建议 (Recommended Action) | 当前状态 (Status) |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- | :---: |
| **CG-01: 综合推荐与分类** | 机场推荐 / 2026机场推荐 | 寻找全网综合表现最优的科学上网梯子 | `/posts/2026-best-airports-recommendation/` | `/recommend/`<br>`/posts/cheap-vpn-airport-recommendation-2026/` | **中 (Medium)** | **Reposition（重定位）**：<br>1. `/recommend/` 严格定位为“多维度选型决策工具与专题导航中心”，不参与单篇长文排名；<br>2. `/posts/2026-best-airports-recommendation/` 独占“综合旗舰与中高端专线”意图；<br>3. `/posts/cheap-vpn-airport-recommendation-2026/` 独占“10-20元平价、月付与学生高性价比”意图。 | ✅ 已完成隔离 |
| **CG-02: 客户端汇总与配置** | 科学上网客户端 / 翻墙工具 | 跨平台代理客户端选型与正版下载 | `/posts/best-vpn-proxy-clients-roundup-2026/` | `/clients/`<br>`/posts/all-platform-clients-setup-guide/` | **中 (Medium)** | **Reposition（重定位）**：<br>1. `/clients/` 作为全平台官方安装包一站式外链下载枢纽；<br>2. `/posts/best-vpn-proxy-clients-roundup-2026/` 独占“多端工具大全、内核演进与选型决策树”意图；<br>3. `/posts/all-platform-clients-setup-guide/` 独占“订阅导入、TUN 模式与具体配置实操”教程意图。 | ✅ 已完成隔离 |
| **CG-03: 价格体系与套餐分析** | 机场价格 / 机场套餐 / 防跑路 | 了解专线成本、套餐定价与资金安全防跑路 | `/posts/airport-pricing-and-scam-prevention/` | `/pricing/` | **低 (Low)** | **Reposition（重定位）**：<br>1. `/pricing/` 定位为“各品牌各档位套餐实时价格横评对比表”；<br>2. 文章页独占“物理专线成本精算、跑路资金盘套路与强制月付风控法则”深度分析意图。 | ✅ 已完成隔离 |
| **CG-04: 测速天梯与性能排名** | 机场排行榜 / 测速天梯榜 | 查看晚高峰延迟、丢包率与大吞吐量量化排名 | `/posts/2026-airport-speed-and-stability-ranking/` | `/ranking/` | **低 (Low)** | **Reposition（重定位）**：<br>1. `/ranking/` 定位为“动态天梯榜数据大屏与评分看板”；<br>2. 文章页独占“实验室 90 天自动化评估模型、四大维度权重与 TOP 10 品牌深度画像”。 | ✅ 已完成隔离 |
| **CG-05: 线路专线与技术科普** | IPLC专线 / IEPL专线 / BGP中转 | 搞清物理专线与普通公网中转的底层技术区别 | `/posts/iplc-iepl-bgp-nodes-guide/` | `/nodes/` | **低 (Low)** | **Reposition（重定位）**：<br>1. `/nodes/` 作为线路拓扑图解与入口城市分布导航；<br>2. 文章页独占“专线定义、不过 GFW 原理、虚假专线辨伪与选型指南”。 | ✅ 已完成隔离 |
| **CG-06: 网络排障与报错诊断** | 节点超时 / EOF错误 / 无法上网 | 解决翻墙过程中出现的各类具体网络错误代码 | `/posts/network-troubleshooting-and-diagnostics/` | `/diagnostics/` | **低 (Low)** | **Reposition（重定位）**：<br>1. `/diagnostics/` 定位为“一键自检工具与错误代码速查索引”；<br>2. 文章页独占“系统性排查 SOP、分层网络诊断树与底层协议冲突破解”。 | ✅ 已完成隔离 |

---

## 二、防内耗长效执行机制

1. **新增页面硬性前置拦截**：
   - 严禁直接根据标题生成新文章；
   - 必须先查阅 [`SEO-Keyword-URL-Mapping.csv`](file:///c:/Users/Pro%20User/Desktop/airporttizi.com/SEO-Keyword-URL-Mapping.csv)；
   - 若拟建文章的 Search Intent 与现有 Primary URL 重合度 $\ge 80\%$，**一律执行 UPDATE 或 MERGE，严禁创建新 URL**。
2. **内链锚文本强一致性**：
   - 全站所有文章与页面中的关键词内链，必须严格参照 [`SEO-Anchor-URL-Mapping.csv`](file:///c:/Users/Pro%20User/Desktop/airporttizi.com/SEO-Anchor-URL-Mapping.csv) 指定的唯一目标 URL 进行链接，严禁同词多指引发权重分散。
3. **定期内耗复查流程**：
   - 每新增 5 篇内容或每季度末，重新比对全站 Sitemap 与收录情况，更新本报告中的冲突组列表。
