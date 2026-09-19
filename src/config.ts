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
};

export const navBarConfig: NavBarConfig = {
	links: [
		{ name: "首页", url: "/" },
		{ name: "机场推荐", url: "/recommend/" },
		{ name: "机场排行", url: "/ranking/" },
		{ name: "机场数据库", url: "/airports/" },
		{ name: "深度评测", url: "/reviews/" },
		{ name: "机场对比", url: "/compare/" },
		{ name: "套餐价格", url: "/pricing/" },
		{ name: "线路节点", url: "/nodes/" },
		{ name: "客户端", url: "/clients/" },
		{ name: "教程中心", url: "/guides/" },
		{ name: "AI与流媒体", url: "/streaming/" },
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
