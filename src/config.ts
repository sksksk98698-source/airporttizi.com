import type {
	AnalyticsConfig,
	CommentConfig,
	DeployConfig,
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";

export const siteConfig: SiteConfig = {
	title: "AirportTizi",
	subtitle: "机场推荐、机场梯子排行与机场数据库",
	lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	// Leave it empty `[]` if want disable multi-languages. It can be sorted by array order
	supportedLangs: ["zh_CN"],
	theme: {
		hue: 215, // Default hue for the theme color: sleek tech blue (215)
		mode: "light",
	},
	banner: {
		enable: true,
		src: "assets/images/demo-banner.jpg", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center",
		credit: {
			enable: false,
			text: "",
			url: "",
		},
	},
	toc: {
		enable: true,
		depth: 2,
	},
	favicon: [],
	ogImage: {
		useDefault: true,
		defaultSrc: "/media/images/banner.jpg",
	},
	verification: {
		google: "", // 填入 Google Search Console 验证代码（如: google-site-verification=xxx 或 token）
		bing: "", // 填入 Bing Webmaster Tools 验证代码（如: msvalidate.01 token）
		baidu: "", // 填入 百度搜索资源平台验证代码
		shenma: "", // 填入 神马站长平台验证代码（如: shenma-site-verification token）
	},
};

export const navBarConfig: NavBarConfig = {
	links: [
		{ name: "首页", url: "/" },
		{ name: "机场推荐", url: "/jichang/" },
		{ name: "VPN梯子", url: "/vpn/" },
		{ name: "Clash配置", url: "/clash/" },
		{ name: "线路节点", url: "/nodes/" },
		{ name: "梯子排行", url: "/tizi/" },
		{ name: "免费资源", url: "/free/" },
		{ name: "使用教程", url: "/tutorial/" },
		{ name: "品牌库", url: "/brands/" },
		{ name: "客户端合集", url: "/clients/" },
		{ name: "AI与流媒体", url: "/streaming/" },
		{ name: "深度评测", url: "/reviews/" },
		{ name: "横向对比", url: "/compare/" },
		{ name: "套餐价格", url: "/pricing/" },
		{ name: "综合天梯榜", url: "/ranking/" },
		{ name: "机场精选", url: "/recommend/" },
		{ name: "网络诊断", url: "/diagnostics/" },
		{ name: "风险监控", url: "/monitor/" },
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/demo-avatar.jpg", // 保留原主题头像视觉
	name: "梯子猫",
	bio: "AirportTizi 官方指南｜专注2026高端专线机场梯子推荐、深度实测与科学上网数据库",
	links: [
		{
			name: "Telegram 频道",
			icon: "fa6-brands:telegram",
			url: "https://t.me/airporttizi",
		},
		{
			name: "RSS 订阅",
			icon: "fa6-solid:rss",
			url: "/rss.xml",
		},
		{
			name: "客户端合集",
			icon: "fa6-solid:download",
			url: "/clients/",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	theme: "github-dark",
};

export const commentConfig: CommentConfig = {
	// 纯净化：移除第三方个人 giscus 仓库暗桩
};

// Site analytics config, only support GA4 for now
export const analyticsConfig: AnalyticsConfig = {
	enabled: false,
};

// Deploy configuration
export const deployConfig: DeployConfig = {
	siteUrl: "https://airporttizi.com",
	baseUrl: "/",
};
