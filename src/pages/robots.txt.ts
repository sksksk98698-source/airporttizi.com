import { siteUrl } from "@utils/url-utils";
import type { APIRoute } from "astro";

const robotsTxt = `
User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: bingbot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: yisouspider
Allow: /

Sitemap: ${siteUrl("sitemap.xml")}
Sitemap: ${siteUrl("sitemap-index.xml")}
`.trim();

export const GET: APIRoute = () => {
	return new Response(robotsTxt, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
