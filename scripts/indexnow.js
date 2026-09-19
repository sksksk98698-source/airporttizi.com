#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const HOST = "airporttizi.com";
const KEY = "6c7a9f8b1d2e4f5a8b7c6d5e4f3a2b1c";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const STATE_FILE = path.join(rootDir, "seo-system", "indexnow-state.json");
const URL_MAP_FILE = path.join(rootDir, "seo-system", "url-map.json");
const DIST_DIR = path.join(rootDir, "dist");

const isDryRun = process.argv.includes("--dry-run");
const isForce = process.argv.includes("--force");

function getFileHash(filePath) {
	try {
		const buffer = fs.readFileSync(filePath);
		return crypto.createHash("sha256").update(buffer).digest("hex");
	} catch (err) {
		return null;
	}
}

function scanDistUrls(dir, baseDir = dir) {
	let urls = [];
	if (!fs.existsSync(dir)) return urls;

	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			urls = urls.concat(scanDistUrls(fullPath, baseDir));
		} else if (entry.isFile() && entry.name.endsWith(".html")) {
			const relPath = path.relative(baseDir, fullPath).replace(/\\/g, "/");
			let canonicalUrl;
			if (relPath === "index.html") {
				canonicalUrl = `https://${HOST}/`;
			} else if (relPath.endsWith("/index.html")) {
				canonicalUrl = `https://${HOST}/${relPath.replace(/\/index\.html$/, "/")}`;
			} else {
				canonicalUrl = `https://${HOST}/${relPath}`;
			}
			const hash = getFileHash(fullPath);
			urls.push({ url: canonicalUrl, hash, filePath: fullPath });
		}
	}
	return urls;
}

function getFallbackUrls() {
	if (!fs.existsSync(URL_MAP_FILE)) return [];
	try {
		const data = JSON.parse(fs.readFileSync(URL_MAP_FILE, "utf-8"));
		return (data.urls || []).map((u) => ({
			url: u.url,
			hash: crypto
				.createHash("sha256")
				.update(u.url + (u.title || ""))
				.digest("hex"),
			filePath: null,
		}));
	} catch (err) {
		console.error("Error reading url-map.json:", err);
		return [];
	}
}

async function submitIndexNow(urlList) {
	const endpoint = "https://api.indexnow.org/indexnow";
	const payload = {
		host: HOST,
		key: KEY,
		keyLocation: KEY_LOCATION,
		urlList: urlList,
	};

	console.log(`[IndexNow] Submitting ${urlList.length} URLs to ${endpoint}...`);

	try {
		const response = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify(payload),
		});

		if (response.ok || response.status === 200 || response.status === 202) {
			console.log(
				`[IndexNow] Submission SUCCESS! Status: ${response.status} ${response.statusText}`,
			);
			return true;
		}
		const text = await response.text();
		console.warn(
			`[IndexNow] Response non-200: ${response.status} ${response.statusText}`,
			text,
		);
		// IndexNow returns 200 or 202 on success, other codes like 422 if key is invalid, etc.
		return false;
	} catch (err) {
		console.error("[IndexNow] Network error during submission:", err.message);
		return false;
	}
}

async function main() {
	console.log("=== IndexNow Incremental Submission Runner ===");
	console.log(`Host: ${HOST}`);
	console.log(`Key: ${KEY}`);
	console.log(
		`Dry-run mode: ${isDryRun ? "YES (No requests will be sent)" : "NO"}`,
	);
	console.log(
		`Force mode: ${isForce ? "YES (All URLs will be treated as updated)" : "NO"}`,
	);

	let state = {
		key: KEY,
		keyLocation: KEY_LOCATION,
		host: HOST,
		lastBatchRun: new Date().toISOString(),
		submittedUrlsCount: 0,
		submissions: {},
	};

	if (fs.existsSync(STATE_FILE)) {
		try {
			state = JSON.parse(fs.readFileSync(STATE_FILE, "utf-8"));
		} catch (err) {
			console.warn(
				"[IndexNow] Could not read existing state file, initializing fresh.",
			);
		}
	}

	// 1. Gather current URLs
	let currentUrls = scanDistUrls(DIST_DIR);
	if (currentUrls.length === 0) {
		console.log(
			"[IndexNow] No HTML files found in dist/. Falling back to url-map.json URLs.",
		);
		currentUrls = getFallbackUrls();
	}

	console.log(`[IndexNow] Found ${currentUrls.length} total URLs.`);

	// 2. Determine which URLs need submission
	const urlsToSubmit = [];
	const stateUpdates = {};

	for (const item of currentUrls) {
		const prev = state.submissions ? state.submissions[item.url] : null;
		const isNew = !prev;
		const isModified = prev && prev.hash !== item.hash;

		if (isForce || isNew || isModified) {
			urlsToSubmit.push(item.url);
			stateUpdates[item.url] = {
				lastSubmittedAt: new Date().toISOString(),
				hash: item.hash,
				status: isDryRun ? "pending_dry_run" : "submitted",
			};
		}
	}

	if (urlsToSubmit.length === 0) {
		console.log(
			"[IndexNow] All URLs are up-to-date. No new or modified URLs detected.",
		);
		return;
	}

	console.log(`[IndexNow] URLs to submit (${urlsToSubmit.length}):`);
	for (const u of urlsToSubmit.slice(0, 10)) {
		console.log(`  - ${u}`);
	}
	if (urlsToSubmit.length > 10) {
		console.log(`  ... and ${urlsToSubmit.length - 10} more.`);
	}

	if (isDryRun) {
		console.log(
			"[IndexNow] Dry run complete. No requests were sent and state was not mutated.",
		);
		return;
	}

	// 3. Submit
	const success = await submitIndexNow(urlsToSubmit);
	if (success) {
		state.lastBatchRun = new Date().toISOString();
		state.submissions = state.submissions || {};
		for (const [url, entry] of Object.entries(stateUpdates)) {
			state.submissions[url] = {
				...entry,
				status: "success",
			};
		}
		state.submittedUrlsCount = Object.keys(state.submissions).length;
		fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), "utf-8");
		console.log(`[IndexNow] Updated state file: ${STATE_FILE}`);
	}
}

main().catch((err) => {
	console.error("[IndexNow] Fatal error:", err);
	process.exit(1);
});
