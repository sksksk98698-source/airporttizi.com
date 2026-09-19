import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

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

const htmlFiles = getAllHtmlFiles(distDir);
console.log(`[Audit] Scanning ${htmlFiles.length} HTML pages in dist...`);

const brokenLinks = [];
let totalLinksChecked = 0;

for (const file of htmlFiles) {
	const content = fs.readFileSync(file, "utf8");
	const relSource = path.relative(distDir, file).replace(/\\/g, "/");

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

		totalLinksChecked++;

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
			brokenLinks.push({
				source: relSource,
				href: href,
				expectedFile: path.relative(distDir, targetFile).replace(/\\/g, "/"),
			});
		}
	}
}

console.log(
	`[Audit] Checked ${totalLinksChecked} internal links across all pages.`,
);
if (brokenLinks.length === 0) {
	console.log(
		"✅ [Audit PASS] Zero broken internal links found! All links point to valid static targets.",
	);
	process.exit(0);
} else {
	console.error(`❌ [Audit FAIL] Found ${brokenLinks.length} broken links:`);
	for (const b of brokenLinks.slice(0, 20)) {
		console.error(`   - From: ${b.source} -> To: ${b.href}`);
	}
	if (brokenLinks.length > 20) {
		console.error(`   ... and ${brokenLinks.length - 20} more.`);
	}
	process.exit(1);
}
