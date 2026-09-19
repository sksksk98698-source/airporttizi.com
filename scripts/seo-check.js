#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const DOMAIN = "airporttizi.com";
const STATE_FILE = path.join(rootDir, "seo-system", "seo-health-state.json");

function getAllHtmlFiles(dir) {
	let results = [];
	if (!fs.existsSync(dir)) return results;
	const list = fs.readdirSync(dir, { withFileTypes: true });
	for (const item of list) {
		const full = path.join(dir, item.name);
		if (item.isDirectory()) {
			results = results.concat(getAllHtmlFiles(full));
		} else if (item.isFile() && item.name.endsWith(".html")) {
			results.push(full);
		}
	}
	return results;
}

const errors = [];
const warnings = [];

// 1. Build Check
let buildPass = false;
let htmlFiles = [];
if (!fs.existsSync(distDir)) {
	errors.push({
		module: "Build",
		message: "dist/ 目录不存在，请先执行 pnpm run build 进行静态打包。",
	});
} else {
	htmlFiles = getAllHtmlFiles(distDir);
	if (htmlFiles.length < 50) {
		errors.push({
			module: "Build",
			message: `dist/ 页面数量严重偏少（仅 ${htmlFiles.length} 个），可能未正确构建全量文章。`,
		});
	} else {
		buildPass = true;
	}
}

// 2. Robots Check
let robotsPass = false;
const robotsFile = path.join(distDir, "robots.txt");
if (!fs.existsSync(robotsFile)) {
	errors.push({
		module: "Robots",
		message: "dist/robots.txt 文件缺失！",
	});
} else {
	const robotsTxt = fs.readFileSync(robotsFile, "utf8");
	if (/User-agent:\s*\*\s*[\r\n]+Disallow:\s*\/(?!_)/i.test(robotsTxt)) {
		errors.push({
			module: "Robots",
			message:
				"SEO_CRITICAL_ERROR: robots.txt 出现 User-agent: * Disallow: / 全站禁止抓取！",
		});
	}
	if (!/Googlebot/i.test(robotsTxt) || !/bingbot/i.test(robotsTxt)) {
		warnings.push({
			module: "Robots",
			message: "robots.txt 未显式声明 Googlebot 或 bingbot 爬虫规则。",
		});
	}
	if (!robotsTxt.includes(`https://${DOMAIN}/sitemap.xml`)) {
		errors.push({
			module: "Robots",
			message: `robots.txt 缺少正确的 Sitemap 声明：https://${DOMAIN}/sitemap.xml`,
		});
	}
	if (errors.filter((e) => e.module === "Robots").length === 0) {
		robotsPass = true;
	}
}

// 3. Noindex Check
let noindexPass = false;
const unexpectedNoindex = [];
let allowedNoindexCount = 0;

for (const file of htmlFiles) {
	const rel = path.relative(distDir, file).replace(/\\/g, "/");
	const content = fs.readFileSync(file, "utf8");
	const is404 = rel === "404.html";

	const hasRobotsNoindex =
		/<meta\s+name=["'](robots|googlebot|bingbot)["']\s+content=["'][^"']*noindex[^"']*["']/i.test(
			content,
		);

	if (hasRobotsNoindex) {
		if (is404) {
			allowedNoindexCount++;
		} else {
			unexpectedNoindex.push(rel);
		}
	}
}

if (unexpectedNoindex.length > 0) {
	errors.push({
		module: "Noindex",
		message: `SEO_CRITICAL_ERROR: 发现 ${unexpectedNoindex.length} 个正式页面意外包含 noindex：\n${unexpectedNoindex
			.slice(0, 10)
			.map((p) => `   - ${p}`)
			.join("\n")}`,
	});
} else {
	noindexPass = true;
}

// 4. Canonical Check
let canonicalPass = false;
const canonicalErrors = [];

for (const file of htmlFiles) {
	const rel = path.relative(distDir, file).replace(/\\/g, "/");
	const content = fs.readFileSync(file, "utf8");
	const canonMatch = content.match(
		/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i,
	);

	if (!canonMatch) {
		canonicalErrors.push({ file: rel, reason: "缺失 canonical 标签" });
		continue;
	}

	const canon = canonMatch[1];
	if (!canon.startsWith(`https://${DOMAIN}/`)) {
		canonicalErrors.push({
			file: rel,
			reason: `canonical 未使用正式主域：${canon}`,
		});
		continue;
	}

	if (canon.includes("?") || canon.includes("#")) {
		canonicalErrors.push({
			file: rel,
			reason: `canonical 包含查询参数或哈希：${canon}`,
		});
		continue;
	}

	// 验证自引用一致性
	let expectedPath = "/";
	if (rel === "index.html") {
		expectedPath = "/";
	} else if (rel.endsWith("/index.html")) {
		expectedPath = `/${rel.replace(/\/index\.html$/, "/")}`;
	} else if (rel === "404.html") {
		expectedPath = "/404/";
	} else {
		expectedPath = `/${rel}`;
	}

	const expectedCanonical = `https://${DOMAIN}${expectedPath}`;
	if (canon !== expectedCanonical) {
		canonicalErrors.push({
			file: rel,
			reason: `canonical 目标与当前页面不一致（当前：${canon}，预期：${expectedCanonical}）`,
		});
	}
}

if (canonicalErrors.length > 0) {
	errors.push({
		module: "Canonical",
		message: `SEO_CRITICAL_ERROR: 发现 ${canonicalErrors.length} 个 Canonical 异常：\n${canonicalErrors
			.slice(0, 10)
			.map((c) => `   - [${c.file}] ${c.reason}`)
			.join("\n")}`,
	});
} else {
	canonicalPass = true;
}

// 5. Sitemap Check
let sitemapPass = false;
let currentSitemapCount = 0;
let previousSitemapCount = 0;
const sitemapXml = path.join(distDir, "sitemap.xml");
const sitemap0 = path.join(distDir, "sitemap-0.xml");

if (!fs.existsSync(sitemapXml)) {
	errors.push({
		module: "Sitemap",
		message: "dist/sitemap.xml 缺失！",
	});
} else {
	const content = fs.readFileSync(sitemapXml, "utf8");
	if (!content.includes("<sitemapindex") && !content.includes("<urlset")) {
		errors.push({
			module: "Sitemap",
			message: "dist/sitemap.xml 格式错误，缺少标准 XML 根标签。",
		});
	}
}

if (fs.existsSync(sitemap0)) {
	const content0 = fs.readFileSync(sitemap0, "utf8");
	const locs = content0.match(/<loc>[^<]+<\/loc>/g) || [];
	currentSitemapCount = locs.length;

	for (const loc of locs) {
		const rawUrl = loc.replace(/<\/?loc>/g, "");
		if (!rawUrl.startsWith(`https://${DOMAIN}/`)) {
			errors.push({
				module: "Sitemap",
				message: `Sitemap 包含非法或非正式主域 URL：${rawUrl}`,
			});
			break;
		}
		if (rawUrl.includes("localhost") || rawUrl.includes("127.0.0.1")) {
			errors.push({
				module: "Sitemap",
				message: `SEO_CRITICAL_ERROR: Sitemap 包含本地开发地址：${rawUrl}`,
			});
			break;
		}
		if (rawUrl.includes("/404/")) {
			errors.push({
				module: "Sitemap",
				message: `Sitemap 错误收录了 404 页面：${rawUrl}`,
			});
			break;
		}
	}

	// 历史对比与异常波动检测
	if (fs.existsSync(STATE_FILE)) {
		try {
			const state = JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
			previousSitemapCount = state.lastSitemapCount || 0;
			if (previousSitemapCount > 0) {
				const diff = currentSitemapCount - previousSitemapCount;
				const dropRatio =
					(previousSitemapCount - currentSitemapCount) / previousSitemapCount;
				if (dropRatio > 0.2) {
					errors.push({
						module: "Sitemap",
						message: `SEO_CRITICAL_ERROR: 页面数量突发性骤降！此前 ${previousSitemapCount}，当前仅 ${currentSitemapCount}（减少 ${diff}，降幅 ${(dropRatio * 100).toFixed(1)}%）！`,
					});
				}
			}
		} catch (e) {
			// ignore state read fail
		}
	}

	if (errors.filter((e) => e.module === "Sitemap").length === 0) {
		sitemapPass = true;
	}
}

// 6. Core URLs Check
let coreUrlsPass = false;
const coreUrls = [
	{ name: "首页", path: "index.html" },
	{ name: "VPN", path: "vpn/index.html" },
	{ name: "机场推荐", path: "jichang/index.html" },
	{ name: "Clash", path: "clash/index.html" },
	{ name: "节点", path: "nodes/index.html" },
	{ name: "梯子", path: "tizi/index.html" },
	{ name: "免费资源", path: "free/index.html" },
	{ name: "使用教程", path: "tutorial/index.html" },
	{ name: "品牌库", path: "brands/index.html" },
	{ name: "精选推荐", path: "recommend/index.html" },
	{ name: "综合排行", path: "ranking/index.html" },
	{ name: "机场数据库", path: "airports/index.html" },
	{ name: "客户端合集", path: "clients/index.html" },
	{ name: "套餐价格", path: "pricing/index.html" },
	{ name: "横向对比", path: "compare/index.html" },
	{ name: "AI与流媒体", path: "streaming/index.html" },
	{ name: "网络诊断", path: "diagnostics/index.html" },
	{ name: "风险监控", path: "monitor/index.html" },
];

const missingCoreUrls = [];
for (const u of coreUrls) {
	const p = path.join(distDir, u.path);
	if (!fs.existsSync(p)) {
		missingCoreUrls.push(`${u.name} (${u.path})`);
	}
}

if (missingCoreUrls.length > 0) {
	errors.push({
		module: "Core URLs",
		message: `核心栏目缺失：${missingCoreUrls.join(", ")}`,
	});
} else {
	coreUrlsPass = true;
}

// 7. Internal Links Check
let internalLinksPass = false;
const brokenLinks = [];
const emptyHrefs = [];

for (const file of htmlFiles) {
	const relSource = path.relative(distDir, file).replace(/\\/g, "/");
	const content = fs.readFileSync(file, "utf8");

	// 检查空 href
	if (/href=["']\s*["']/i.test(content)) {
		emptyHrefs.push(relSource);
	}

	const linkRegex = /href=["'](\/[^"']*)["']/g;
	const matches = content.matchAll(linkRegex);

	for (const match of matches) {
		let href = match[1];
		href = href.split("?")[0].split("#")[0];
		if (!href || href === "") continue;

		if (
			href.startsWith("/_astro") ||
			href.startsWith("/media") ||
			href.startsWith("/favicon") ||
			href.startsWith("/pagefind") ||
			href.endsWith(".xml") ||
			href.endsWith(".txt") ||
			href.endsWith(".png") ||
			href.endsWith(".jpg") ||
			href.endsWith(".svg") ||
			href.endsWith(".webp") ||
			href.endsWith(".ico")
		) {
			continue;
		}

		let targetFile = "";
		if (href === "/") {
			targetFile = path.join(distDir, "index.html");
		} else if (href.endsWith("/")) {
			targetFile = path.join(distDir, href.slice(1), "index.html");
		} else if (href.endsWith(".html")) {
			targetFile = path.join(distDir, href.slice(1));
		} else {
			targetFile = path.join(distDir, href.slice(1), "index.html");
			const altFile = path.join(distDir, `${href.slice(1)}.html`);
			if (!fs.existsSync(targetFile) && fs.existsSync(altFile)) {
				targetFile = altFile;
			}
		}

		if (!fs.existsSync(targetFile)) {
			brokenLinks.push({ source: relSource, href });
		}
	}
}

if (emptyHrefs.length > 0) {
	warnings.push({
		module: "Internal Links",
		message: `发现 ${emptyHrefs.length} 个页面包含空 href="" 属性。`,
	});
}

if (brokenLinks.length > 0) {
	errors.push({
		module: "Internal Links",
		message: `发现 ${brokenLinks.length} 个内部破损死链：\n${brokenLinks
			.slice(0, 10)
			.map((b) => `   - [${b.source}] -> ${b.href}`)
			.join("\n")}`,
	});
} else {
	internalLinksPass = true;
}

// 8. Duplicate Titles & H1 Check
let duplicateTitlesPass = false;
const titlesMap = new Map();
const h1Issues = [];

for (const file of htmlFiles) {
	const rel = path.relative(distDir, file).replace(/\\/g, "/");
	const content = fs.readFileSync(file, "utf8");

	// Title 检查
	const titleM = content.match(/<title>([^<]+)<\/title>/i);
	if (titleM) {
		const t = titleM[1].trim();
		// 忽略合理的分页标题
		if (!t.includes("第 ") && !t.includes("Page ")) {
			const existing = titlesMap.get(t) || [];
			existing.push(rel);
			titlesMap.set(t, existing);
		}
	}

	// H1 检查（仅检查正式内容页，排除 404）
	if (rel !== "404.html") {
		const h1Matches = content.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
		if (h1Matches.length === 0) {
			h1Issues.push({ file: rel, reason: "缺失 <h1> 标签" });
		} else if (h1Matches.length > 1) {
			h1Issues.push({
				file: rel,
				reason: `出现多个 <h1> 标签（共 ${h1Matches.length} 个）`,
			});
		}
	}
}

const duplicateTitles = [];
for (const [t, pages] of titlesMap.entries()) {
	if (pages.length > 1) {
		duplicateTitles.push({ title: t, pages });
	}
}

if (duplicateTitles.length > 0) {
	warnings.push({
		module: "Duplicate Titles",
		message: `发现 ${duplicateTitles.length} 组重复 Title：\n${duplicateTitles
			.slice(0, 5)
			.map((d) => `   - "${d.title}" -> ${d.pages.join(", ")}`)
			.join("\n")}`,
	});
}

if (h1Issues.length > 0) {
	warnings.push({
		module: "H1 Check",
		message: `发现 ${h1Issues.length} 处 H1 语义问题：\n${h1Issues
			.slice(0, 5)
			.map((h) => `   - [${h.file}] ${h.reason}`)
			.join("\n")}`,
	});
}

if (duplicateTitles.length === 0) {
	duplicateTitlesPass = true;
} else {
	// 重复 Title 虽是警告，但不阻断，标记通过状态
	duplicateTitlesPass = true;
}

// 9. Schema JSON-LD Check
let schemaPass = false;
let invalidSchemaCount = 0;

for (const file of htmlFiles) {
	const rel = path.relative(distDir, file).replace(/\\/g, "/");
	const content = fs.readFileSync(file, "utf8");
	const scriptMatches = content.matchAll(
		/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
	);

	for (const m of scriptMatches) {
		try {
			JSON.parse(m[1]);
		} catch (e) {
			invalidSchemaCount++;
			errors.push({
				module: "Schema",
				message: `页面 [${rel}] 包含非法的 JSON-LD 结构化数据：${e.message}`,
			});
		}
	}
}

if (invalidSchemaCount === 0) {
	schemaPass = true;
}

// 10. Spam & Anomaly URL Detection
let pageCountPass = true;
const spamUrls = [];
for (const file of htmlFiles) {
	const rel = path.relative(distDir, file).replace(/\\/g, "/").toLowerCase();
	if (
		rel.includes("casino") ||
		rel.includes("bet") ||
		rel.includes("porn") ||
		rel.includes("xxx") ||
		/download-[a-z0-9]{8,}/.test(rel)
	) {
		spamUrls.push(rel);
	}
}

if (spamUrls.length > 0) {
	errors.push({
		module: "Page Count & Spam",
		message: `SEO_CRITICAL_ERROR: 发现可疑黑产或垃圾页面注入：\n${spamUrls.join("\n")}`,
	});
	pageCountPass = false;
}

// 决策
const isBlocked = errors.length > 0;
const decision = isBlocked ? "BLOCKED" : "READY";

// 保存当前健康检查状态
try {
	const newState = {
		lastCheckTime: new Date().toISOString(),
		lastHtmlFilesCount: htmlFiles.length,
		lastSitemapCount: currentSitemapCount,
		allowedNoindexCount,
		brokenLinksCount: brokenLinks.length,
		canonicalErrorsCount: canonicalErrors.length,
		decision,
	};
	fs.writeFileSync(STATE_FILE, JSON.stringify(newState, null, 2), "utf8");
} catch (e) {
	// ignore write fail
}

// 输出报告
console.log("=========================================");
console.log("           SEO HEALTH CHECK              ");
console.log("=========================================\n");

console.log(`Build:            ${buildPass ? "PASS" : "FAIL"}`);
console.log(`Robots:           ${robotsPass ? "PASS" : "FAIL"}`);
console.log(`Noindex:          ${noindexPass ? "PASS" : "FAIL"}`);
console.log(`Canonical:        ${canonicalPass ? "PASS" : "FAIL"}`);
console.log(`Sitemap:          ${sitemapPass ? "PASS" : "FAIL"}`);
console.log(`Internal Links:   ${internalLinksPass ? "PASS" : "FAIL"}`);
console.log(`Core URLs:        ${coreUrlsPass ? "PASS" : "FAIL"}`);
console.log(`Schema:           ${schemaPass ? "PASS" : "FAIL"}`);
console.log(`Duplicate Titles: ${duplicateTitlesPass ? "PASS" : "WARN"}`);
console.log(`Page Count:       ${pageCountPass ? "PASS" : "FAIL"}`);

console.log("\n-----------------------------------------");
console.log(`RELEASE_DECISION: ${decision}`);
console.log("-----------------------------------------\n");

if (errors.length > 0) {
	console.error(
		`❌ 发现 ${errors.length} 项阻止发布的严重问题 (STOP_DEPLOY)：`,
	);
	for (const e of errors) {
		console.error(`\n[${e.module}] ${e.message}`);
	}
}

if (warnings.length > 0) {
	console.warn(`⚠️ 发现 ${warnings.length} 项非阻断警告建议：`);
	for (const w of warnings) {
		console.warn(`\n[${w.module}] ${w.message}`);
	}
}

if (isBlocked) {
	console.error("\n🚫 发布已拦截！请先修复上述严重问题后重新执行检查。");
	process.exit(1);
} else {
	console.log("✅ 全部核心 SEO 检查通过，允许发布至生产环境！");
	process.exit(0);
}
