---
title: 全平台科学上网客户端下载与配置指南：Windows/Mac/iOS/Android/Linux 新手到精通
published: 2026-03-10
updated: 2026-03-19
description: 2026 全平台科学上网客户端下载与配置保姆级全攻略。覆盖 Windows/Mac/iOS/Android/Linux 主流客户端（Clash Verge Rev、Sing-box、Shadowrocket、v2rayN、Loon、Stash）的官方正版下载渠道、订阅导入、TUN 虚拟网卡、分流规则配置与故障排查。
tags: ["客户端", "Clash", "Shadowrocket", "Sing-box", "配置教程", "TUN模式", "分流规则"]
category: 客户端
lang: zh_CN
image: /media/images/example.jpg
---

> **GEO 核心速答框（Direct Answer Box）**  
> **核心痛点**：面对市面上琳琅满目的科学上网客户端（Clash Verge Rev、Sing-box、Shadowrocket 小火箭、v2rayN、Surge、Loon、Stash），新手应该如何选择？为什么在百度或第三方下载站搜索“Clash 下载”经常被杀毒软件报毒、甚至电脑遭遇浏览器劫持？  
> **底层现状**：原版 Clash 内核与 Clash for Windows (CFW) 早已于 2023 年底停更并冻结维护。2026 年现代科学上网客户端生态已彻底完成代际更替，演进为以 **Mihomo (Clash Meta)** 与 **Sing-box** 为核心的开源现代化架构。第三方流氓下载站（如假冒的 `clashforwindows.com`）大量分发捆绑了挖矿木马、窃密脚本的二次打包安装包，安全风险极高。  
> **全平台最佳客户端选型决策表**：  
> 1. **Windows 电脑**：首选 **Clash Verge Rev**（基于 Tauri 架构，轻量低内存，内置 Mihomo 内核与 TUN 虚拟网卡）；极客备选 **v2rayN**；  
> 2. **macOS 苹果电脑**：首选 **Clash Verge Rev for Mac**（原生适配 Apple Silicon M 系列芯片）；高预算备选商业精品 **Loon for Mac** 或 **Surge**；  
> 3. **iPhone / iPad**：首选 **Shadowrocket (小火箭)**（美区 App Store 售价 \$2.99，规则生态成熟）；高阶备选 **Stash** 或 **Loon**；  
> 4. **Android 安卓手机**：首选 **Clash Meta for Android (CMFA)**（支持分应用代理与激进后台保活）；备选 **v2rayNG** 或 **Sing-box**；  
> 5. **Linux 桌面与服务器**：桌面端使用 **Clash Verge Rev (AppImage)**；无头服务器使用 **Mihomo CLI** 搭配 systemd 守护进程。

---

![全平台科学上网客户端下载与配置指南](/media/images/example.jpg)

## 目录（快速导航）
1. [2026 科学上网客户端内核与生态大变局](#一2026-科学上网客户端内核与生态大变局)
   - [1.1 原版 Clash 停更历史与安全警示](#11-原版-clash-停更历史与安全警示)
   - [1.2 现代两大核心内核：Mihomo vs Sing-box 深度解析](#12-现代两大核心内核mihomo-vs-sing-box-深度解析)
   - [1.3 为什么安全下载渠道是生命线？流氓打包投毒案例复盘](#13-为什么安全下载渠道是生命线流氓打包投毒案例复盘)
   - [1.4 全球开源正版安全发布渠道汇总字典](#14-全球开源正版安全发布渠道汇总字典)
2. [Windows 平台实战：Clash Verge Rev 从新手到精通](#二windows-平台实战clash-verge-rev-从新手到精通)
   - [2.1 安装包选型与安装步骤 (x64 / arm64)](#21-安装包选型与安装步骤-x64--arm64)
   - [2.2 导入机场订阅链接与配置更新](#22-导入机场订阅链接与配置更新)
   - [2.3 核心功能详解：系统代理 vs 开机自启 vs 局域网共享](#23-核心功能详解系统代理-vs-开机自启-vs-局域网共享)
   - [2.4 进阶核心：TUN 虚拟网卡模式与 UWP 回环隔离解除](#24-进阶核心tun-虚拟网卡模式与-uwp-回环隔离解除)
3. [macOS 平台实战：Clash Verge Rev for Mac 保姆级指南](#三macos-平台实战clash-verge-rev-for-mac-保姆级指南)
   - [3.1 Apple Silicon 架构原生适配与权限授予](#31-apple-silicon-架构原生适配与权限授予)
   - [3.2 绕过 Gatekeeper“无法验证开发者”拦截命令](#32-绕过-gatekeeper无法验证开发者拦截命令)
   - [3.3 商业高阶备选：Loon for Mac 与 Surge 特性一览](#33-商业高阶备选loon-for-mac-与-surge-特性一览)
4. [iOS / iPadOS 平台实战：Shadowrocket（小火箭）全攻略](#四ios--ipados-平台实战shadowrocket小火箭全攻略)
   - [4.1 美区 Apple ID 安全获取与正版购买避坑](#41-美区-apple-id-安全获取与正版购买避坑)
   - [4.2 订阅导入、节点测速与连接测试](#42-订阅导入节点测速与连接测试)
   - [4.3 路由模式精析：配置 (Config) vs 代理 vs 直连](#43-路由模式精析配置-config-vs-代理-vs-直连)
   - [4.4 外部规则集与去广告模块引入实战](#44-外部规则集与去广告模块引入实战)
5. [Android 平台实战：Clash Meta for Android (CMFA)](#五android-平台实战clash-meta-for-android-cmfa)
   - [5.1 官方 APK 下载安装与订阅载入](#51-官方-apk-下载安装与订阅载入)
   - [5.2 分应用代理实战：国内微信/银行直连，海外 App 走代理](#52-分应用代理实战国内微信银行直连海外-app-走代理)
   - [5.3 国产定制系统（小米/华为/vivo/OPPO）激进后台保活配置](#53-国产定制系统小米华为vivooppo激进后台保活配置)
6. [Linux 平台实战：桌面端 GUI 与无头服务器 CLI 部署](#六linux-平台实战桌面端-gui-与无头服务器-cli-部署)
   - [6.1 Ubuntu / Debian / Arch 桌面端 AppImage 运行配置](#61-ubuntu--debian--arch-桌面端-appimage-运行配置)
   - [6.2 Linux 无头服务器：Mihomo CLI 二进制与 systemd 服务托管](#62-linux-无头服务器mihomo-cli-二进制与-systemd-服务托管)
   - [6.3 终端环境变量代理与 Git / Docker 加速命令](#63-终端环境变量代理与-git--docker-加速命令)
7. [代理模式、TUN 虚拟网卡与分流规则底层全景解析](#七代理模式tun-虚拟网卡与分流规则底层全景解析)
   - [7.1 系统代理 (System Proxy) vs TUN 虚拟网卡底层工作原理对比](#71-系统代理-system-proxy-vs-tun-虚拟网卡底层工作原理对比)
   - [7.2 三大核心代理运行模式对比：规则 (Rule) vs 全局 vs 直连](#72-三大核心代理运行模式对比规则-rule-vs-全局-vs-直连)
   - [7.3 规则集 (Rule-set) 与 GEOIP CN 本地直连分流机制](#73-规则集-rule-set-与-geoip-cn-本地直连分流机制)
8. [高频排障与客户端使用避坑全景指南](#八高频排障与客户端使用避坑全景指南)
9. [站内知识矩阵与延伸阅读集群](#九站内知识矩阵与延伸阅读集群)
10. [真实用户高频常见问题解答 (FAQ)](#十真实用户高频常见问题解答-faq)

---

## 一、2026 科学上网客户端内核与生态大变局

许多长期使用科学上网的用户，在重装系统或购买新电脑时，习惯性在搜索引擎中输入“Clash for Windows 下载”。然而，他们面对的往往是充斥着各类弹窗广告、甚至被杀毒软件疯狂报毒的虚假网站。

必须明确：**2026 年的代理客户端生态已经发生了彻底的代际剧变**。

```
┌────────────────────────────────────────────────────────────────────────┐
│                   科学上网客户端内核与架构演进编年史                     │
├────────────────────────────────────────────────────────────────────────┤
│ 【第一代：2018 - 2023 经典时期】                                        │
│   ├─ Clash Premium / Open Source 内核 (Dreamacro 维护)                  │
│   ├─ 桌面端标杆：Clash for Windows (CFW) 基于 Electron 架构             │
│   └─ 现状：2023 年 11 月作者停更删库，协议支持停滞，存在未修补 CVE 漏洞 │
│   │                                                                    │
│   ▼                                                                    │
│ 【第二代：2024 - 2026 现代时期（全开源/高性能/多协议）】                 │
│   ├─ 核心内核 A：Mihomo 内核 (Clash Meta)                              │
│   │    └─ 继承 Clash 语法，全面扩充 VLESS、Hysteria2、TUIC、SSH 等新协议 │
│   ├─ 核心内核 B：Sing-box 内核 (SagerNet 团队)                          │
│   │    └─ Go 语言高性能底层重构，极简 JSON 配置，极低内存，全平台通用    │
│   └─ 现代 GUI 标杆：Clash Verge Rev (基于 Rust Tauri 架构，轻量低占用) │
└────────────────────────────────────────────────────────────────────────┘
```

### 1.1 原版 Clash 停更历史与安全警示

原版 Clash 内核由开发者 Dreamacro 于 2018 年开源，并迅速因其强大的分流规则引擎成为全球科学上网的事实标准。然而：
1. **2023 年底停更事件**：2023 年 11 月，原作者删库并停止维护原版 Clash 内核；随后，拥有庞大用户基数的图形界面工具 Clash for Windows (CFW) 开发者 Fndroid 亦宣布停止维护；
2. **安全风险与陈旧漏洞**：停止维护意味着原版客户端无法修补已公开的 Chromium / Electron 安全漏洞，且无法支持近两年新兴的高性能抗封锁协议（如 VLESS XTLS-Reality、Hysteria2、TUIC v5 等）；
3. **严重警示**：目前网络上所有声称“Clash for Windows 2026 最新版”的网站均为第三方黑客或流氓站长搭建的钓鱼陷阱！

### 1.2 现代两大核心内核：Mihomo vs Sing-box 深度解析

为了接过开源大旗，社区迅速分化并崛起了两大现代化顶流内核：

#### 1. Mihomo（原名 Clash.Meta）
- **定位**：Clash 原版配置的完美继任者与终极增强版；
- **核心优势**：
  - **100% 向下兼容**：可以直接读取所有机场下发的标准 Clash YAML 订阅文件，无需任何格式转换；
  - **协议全满贯**：原生支持 Trojan、VMess、VLESS (Reality / Splice)、Hysteria 1/2、TUIC v5、WireGuard、Shadowsocks 2022 以及 SSH 隧道；
  - **内置 TUN 虚拟网卡**：基于 gVisor 网络栈，支持 Fake-IP 模式，零丢包接管全局系统网络；
  - **图形界面代表**：**Clash Verge Rev**、**Clash Nyanpasu**、**Clash Meta for Android**。

#### 2. Sing-box（次世代通用代理平台）
- **定位**：由 SagerNet 团队完全自研的高性能通用网络代理核心；
- **核心优势**：
  - **极致的性能与低内存占用**：在多核心并发与高吞吐吞吐测试中，内存占用仅为原版 Clash 的三分之一，特别适合路由器、低配软路由以及移动设备；
  - **先进的规则引擎与路由树**：支持基于进程名、包特征、DNS 类型的多级条件路由；
  - **原生跨平台一致性**：无论是 Linux 服务器、iOS 独立 App、Android 客户端，均共用同一套底层核心代码。

---

### 1.3 为什么安全下载渠道是生命线？流氓打包投毒案例复盘

在科学上网领域，**客户端是您所有网络流量经过的第一个咽喉要道**。如果客户端本身被恶意篡改，您的账号密码、微信聊天记录、浏览器登录 Cookie 以及加密货币私钥将彻底暴露在攻击者眼皮底下。

```mermaid
flowchart TD
    BadSite["百度/搜狗搜索: Clash 下载"] --> Phishing["钓鱼假冒官网 (如 clashforwindows.com)"]
    Phishing --> Malware["下载捆绑木马的安装包 (Setup.exe)"]
    Malware --> Inject["后台静默植入恶意 DLL / 窃密脚本"]
    Inject --> Steal1["盗取 Chrome/Edge 本地保存的密码与 Cookie"]
    Inject --> Steal2["监控剪贴板: 替换虚拟货币收款地址 (BTC/USDT)"]
    Inject --> Steal3["开启本地后门: 沦为 DDoS 僵尸网络肉鸡"]
```

#### 典型黑客攻击手法：
1. **抢注高权重已弃用域名**：黑客抢注与原版软件相似的域名（如 `clashforwindows.net`、`clashverge.com`），并通过搜索引擎黑帽 SEO 手段将排名刷至首页第一位；
2. **安装包二次打包注入**：黑客下载正版开源客户端，在其中注入恶意远程控制木马（如 Cobalt Strike Beacon 或 Redline Stealer），重新打包并上传至各类百度网盘与蓝奏云；
3. **真实危害案例**：据国家互联网应急中心报告，曾有大量国内程序员因使用假冒下载站的 Clash 客户端，导致其 GitHub 个人 Access Token 与 AWS 访问密钥遭境外黑客勒索盗取。

### 1.4 全球开源正版安全发布渠道汇总字典

为了保障设备与资金安全，请务必仅从以下官方开源 GitHub 仓库的 **Releases** 专区下载客户端安装包：

| 客户端名称 | 适用操作系统 | 底层内核 | 官方正版开源 GitHub 发布地址 |
| :--- | :--- | :--- | :--- |
| **Clash Verge Rev** | Windows / macOS / Linux | Mihomo | `https://github.com/clash-verge-rev/clash-verge-rev` |
| **v2rayN** | Windows | Xray / Sing-box | `https://github.com/2dust/v2rayN` |
| **Clash Nyanpasu** | Windows / macOS / Linux | Mihomo | `https://github.com/keiko233/clash-nyanpasu` |
| **Sing-box (官方)** | 全平台 (桌面/移动/CLI) | Sing-box | `https://github.com/SagerNet/sing-box` |
| **Clash Meta for Android** | Android (安卓手机/平板/TV) | Mihomo | `https://github.com/MetaCubeX/ClashMetaForAndroid` |
| **v2rayNG** | Android | Xray | `https://github.com/2dust/v2rayNG` |
| **Shadowrocket (小火箭)** | iOS / iPadOS | 独立混合内核 | 仅限苹果美区 / 港区 App Store 官方正版购买 |
| **Stash (Clash on iOS)** | iOS / iPadOS / Apple TV | Mihomo 兼容 | 仅限苹果非国区 App Store 官方购买 |
| **Loon** | iOS / iPadOS / macOS | 独立内核 | 仅限苹果非国区 App Store 官方购买 |

---

## 二、Windows 平台实战：Clash Verge Rev 从新手到精通

**Clash Verge Rev** 是目前 Windows 平台综合体验最好、颜值最高、维护最活跃的现代化代理客户端。它摒弃了 CFW 臃肿陈旧的 Electron 框架，采用基于 Rust 的 **Tauri 框架** 进行图形重构，内存占用低至 50MB 左右，秒开无卡顿。

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Clash Verge Rev 极速上手 3 步流程图                    │
├────────────────────────────────────────────────────────────────────────┤
│ 步骤 1：下载安装 ──> 认准 x64-setup.exe，安装完成进入主界面            │
│                         │                                              │
│                         ▼                                              │
│ 步骤 2：导入订阅 ──> 点击「订阅」──> 粘贴机场 URL ──> 点击「导入」并选中│
│                         │                                              │
│                         ▼                                              │
│ 步骤 3：开启联网 ──> 点击「代理」选节点 ──>「设置」开启「系统代理」     │
│                         │                                              │
│                         ▼                                              │
│ 进阶可选：开启 TUN 模式 ──> 点击「安装服务模式」──> 开启「TUN 模式」开关│
└────────────────────────────────────────────────────────────────────────┘
```

### 2.1 安装包选型与安装步骤 (x64 / arm64)

访问官方 GitHub Release 页面后，根据您的 Windows 系统硬件架构选择对应文件：
- **普通 Intel / AMD 处理器电脑（绝大多数用户）**：
  下载 `Clash.Verge_x.x.x_x64-setup.exe`（标准安装版）或 `Clash.Verge_x.x.x_x64_portable.zip`（绿色便携免安装版）；
- **搭载高通骁龙处理器的轻薄本（如 Surface Pro ARM 版）**：
  下载 `Clash.Verge_x.x.x_arm64-setup.exe`；
- **安装过程注意**：安装路径中**切忌包含中文字符**（如 `D:\软件\翻墙\`），这极易导致底层 Go 内核在加载配置文件时报路径编码错误。建议安装在默认的 `C:\Program Files\Clash Verge`。

### 2.2 导入机场订阅链接与配置更新

1. 登录您购买的机场官网后台（如 **[光速云](/reviews/guangsucloud/)** 或 **[灵猫网络](/reviews/civetnet/)**）；
2. 在用户中心找到「快捷导入」或「一键订阅」区域，点击「复制 Clash 订阅链接」；
3. 打开 Clash Verge Rev 客户端：
   - 点击左侧导航栏的 **订阅 (Profiles)**；
   - 在顶部输入框中粘贴刚刚复制的订阅 URL；
   - 点击右侧的 **导入 (Import)** 按钮；
   - 稍等 2-5 秒，订阅列表中会展示出该机场的名称、节点数量与剩余流量信息；
   - **单击选中该订阅配置**（选中的配置左侧会亮起高亮标记）。

### 2.3 核心功能详解：系统代理 vs 开机自启 vs 局域网共享

在左侧导航栏点击 **设置 (Settings)**，掌握以下三个核心开关的作用：

1. **系统代理 (System Proxy)**：
   - 这是让浏览器能够上网的最基础开关。开启后，软件会在 Windows 网络设置中将 HTTP/HTTPS 代理自动指向 `127.0.0.1:7890`；
   - **关机前注意事项**：每次退出软件前，请务必先关闭系统代理，或在右下角任务栏托盘右键选择“退出”。切勿直接在任务管理器中强制杀掉进程，否则会导致系统代理残留进而无法打开任何国内网页；
2. **开机自启动 (Auto Start)**：
   - 勾选此项后，电脑每次开机进入桌面时，Clash 会自动在后台静默启动并接管网络，无需每次手动打开；
3. **允许局域网连接 (Allow LAN)**：
   - 开启后，同一局域网（同一个 Wi-Fi）下的其他设备（如 Switch 游戏机、PS5、旧手机）只需在 Wi-Fi 代理中填入您电脑的局域网 IP（如 `192.168.1.100`）和端口 `7890`，即可直接共享电脑的翻墙网络。

### 2.4 进阶核心：TUN 虚拟网卡模式与 UWP 回环隔离解除

这是 Clash Verge Rev 相比旧版 CFW 最具压倒性优势的“核武器级别功能”。

#### 1. 开启 TUN 虚拟网卡模式（接管系统一切流量）
- **为什么需要 TUN 模式？**
  Windows 系统代理仅对遵循系统代理约定的浏览器有效。许多专业的开发工具（如终端 `git clone`、`npm install`、Docker 镜像拉取）、Steam 游戏客户端、Telegram 桌面版往往会忽略系统代理设置；
- **安装与开启步骤**：
  1. 在 Clash Verge Rev 设置中，找到 **服务模式 (Service Mode)**，点击右侧的「安装 (Install)」；
  2. Windows 会弹出管理员权限 UAC 弹窗，点击「是」；安装成功后服务模式图标会变为绿色打勾状态；
  3. 此时回到设置面板，找到 **TUN 模式 (Tun Mode)** 开关，直接切换为 **开启**；
  4. 此时电脑网络连接中会自动生成一张名为 `Mihomo` 的虚拟网络适配器，所有命令行、游戏、应用的流量都会被无缝强制重定向至代理节点。

#### 2. UWP 应用回环隔离修复（解决微软应用商店无法联网）
Windows 10/11 系统出于沙箱安全机制，默认禁止任何 UWP 应用（Windows Store 应用商店、微软邮箱、Xbox、Netflix 官方客户端）访问本地回环网络（`127.0.0.1`）。
- **一键修复**：
  在 Clash Verge Rev 中点击「设置 $\rightarrow$ 杂项设置 $\rightarrow$ UWP 应用工具 (UWP Loopback Helper)」，在弹出的列表中点击「全选 (Select All)」，然后点击「保存更改 (Save Changes)」，微软商店与 Xbox 无法联网的陈年顽疾瞬间彻底解决。

---

## 三、macOS 平台实战：Clash Verge Rev for Mac 保姆级指南

苹果 macOS 系统以安全沙箱著称。在 Mac 上配置代理客户端，最关键的是处理好系统权限与架构适配。

### 3.1 Apple Silicon 架构原生适配与权限授予

目前主流 Mac 电脑（MacBook Pro、MacBook Air、Mac mini、iMac）绝大部分均采用苹果自研的 M 系列芯片（M1/M2/M3/M4）。
- **下载安装包**：
  在 GitHub Release 页面中，认准 `Clash.Verge_x.x.x_aarch64.dmg`（适用于 M 系列芯片）；若您使用的是较老的 Intel 处理器 Mac，请下载 `Clash.Verge_x.x.x_x64.dmg`；
- **拖拽安装**：双击打开 DMG 文件，将 Clash Verge 图标直接拖入 `Applications (应用程序)` 文件夹中。

### 3.2 绕过 Gatekeeper“无法验证开发者”拦截命令

首次在 Mac 上打开开源软件时，macOS 系统的 Gatekeeper 防御机制往往会弹出警告：  
**“无法打开‘Clash Verge’，因为 Apple 无法检查其是否包含恶意软件”**。

```bash
# 在 Mac 终端执行以下命令，瞬间解除 Gatekeeper 隔离属性
sudo xattr -cr /Applications/Clash\ Verge.app
```

执行后输入 Mac 开机密码并回车，再次双击软件即可顺畅打开。此外，在开启 TUN 模式时，macOS 会提示“Clash Verge 想要添加虚拟网卡配置”，请在系统设置的「网络」面板中点击「允许」并输入管理员指纹或密码。

### 3.3 商业高阶备选：Loon for Mac 与 Surge 特性一览

对于重度 Mac 生态用户与前端开发工程师，如果您对网络调试、脚本注入、多网关策略有更高追求，可以考虑 macOS 平台的两款商业天花板级软件：
- **Loon for Mac**：支持在 Mac 上复用 iOS 端的插件、复写与脚本规则，UI 极其精致现代，内存占用极低；
- **Surge for Mac**：全网公认的网络分析神级利器，拥有工业级的抓包调试控制台、网关中继功能，售价较贵（单设备授权约数百元人民币），适合专业技术极客。

---

## 四、iOS / iPadOS 平台实战：Shadowrocket（小火箭）全攻略

在 iPhone 和 iPad 上，**Shadowrocket（俗称“小火箭”）** 凭借其不到 20 元人民币的亲民售价、极其强悍的协议兼容性与成熟的社区规则生态，占据了 iOS 科学上网超过 80% 的市场份额。

```
┌────────────────────────────────────────────────────────────────────────┐
│                   iOS Shadowrocket 小火箭极速上手 4 步流程               │
├────────────────────────────────────────────────────────────────────────┤
│ 步骤 1：准备非国区 Apple ID ──> 登录 App Store，搜索购买 Shadowrocket  │
│                                    │                                   │
│                                    ▼                                   │
│ 步骤 2：导入订阅 ──> 软件右上角「+」号 ──> 类型选「Subscribe」粘贴链接  │
│                                    │                                   │
│                                    ▼                                   │
│ 步骤 3：选择节点 ──> 在节点列表中勾选想要连接的节点（测速选低延迟）    │
│                                    │                                   │
│                                    ▼                                   │
│ 步骤 4：开启连接 ──> 顶部开关打开 ──> iOS 弹窗提示添加 VPN 选「允许」  │
└────────────────────────────────────────────────────────────────────────┘
```

### 4.1 美区 Apple ID 安全获取与正版购买避坑

由于众所周知的原因，**中国大陆区域的 App Store 已经全面下架了所有网络代理工具**。在国区搜索“Shadowrocket”，搜出的全部是山寨吸金软件。

#### 1. 为什么坚决杜绝使用网上免费的“共享 Apple ID”？
网络上很多所谓“免费小火箭共享账号”，存在巨大的致命安全隐患：
- **手机被锁变砖敲诈**：很多新手不慎在 iPhone 的「设置（iCloud）」中登录了共享 ID，黑客会立即远程开启“丢失模式”锁死手机，勒索数千元解锁费；
- **正确做法**：**仅允许在「App Store」中登录海外 ID，绝对严禁在手机系统「设置」中登录！**
- **终极建议**：花 10 分钟自己注册一个专属的美区 Apple ID（无需信用卡，注册时地区选美国，付款方式选 None），然后在正规电商平台购买 3 美元的苹果充值卡充值购买，终身永久拥有正版更新。

### 4.2 订阅导入、节点测速与连接测试

1. 打开小火箭，点击首页右上角的 **「+」号**；
2. 在「类型 (Type)」下拉菜单中，选择 **Subscribe (订阅)**；
3. 在「URL」一栏中粘贴机场后台提供的专属订阅链接；
4. 「备注 (Remark)」随意填写（如“光速云”）；
5. 点击右上角 **完成 (Done)**，软件会自动从服务器拉取全部节点列表；
6. 点击「连通性测试 (Ping Test)」，所有节点右侧会显示出真实的毫秒延迟；
7. 勾选一个低延迟的香港或日本节点，打开顶部的连接总开关；首次连接时 iOS 会弹出系统级提示：*“Shadowrocket 想要添加 VPN 配置”*，点击 **允许** 并验证面容 ID 或锁屏密码即可。

### 4.3 路由模式精析：配置 (Config) vs 代理 vs 直连

在小火箭首页底部，有三个核心全局路由选项：
- **配置 (Config)【强烈推荐日常开启】**：
  根据内置规则自动分流。国内应用（微信、高德地图、淘宝）走本地网络直连；境外应用（YouTube、X、ChatGPT）走代理节点；
- **代理 (Proxy)**：
  全局所有流量全部无脑走节点，这会导致国内软件加载变慢、网易云音乐报版权限制；
- **直连 (Direct)**：
  全部流量直连，相当于关闭代理。

### 4.4 外部规则集与去广告模块引入实战

小火箭默认内置的规则较为简陋。为了获得更佳的分流体验与拦截主流视频广告，可以在小火箭底部点击 **配置 (Config)**：
1. 点击右上角「+」号，添加知名的第三方开源规则源（如 `ACL4SSR` 或神机规则）；
2. 下载后点击该规则并选择「使用配置」；
3. 在「模块 (Modules)」中，可以一键开启 YouTube / 网页端去广告脚本模块，享受纯净清爽的浏览体验。

---

## 五、Android 平台实战：Clash Meta for Android (CMFA)

安卓平台的开放性赋予了用户极大的自由度，但国产手机系统深度定制的“激进省电杀后台”机制，往往是安卓用户频繁遭遇断流卡死的最核心痛点。

### 5.1 官方 APK 下载安装与订阅载入

在安卓端，推荐主力客户端为 **Clash Meta for Android（简称 CMFA）**：
1. 从官方 GitHub Releases 页面下载 `cmfa-x.x.x-meta-arm64-v8a.apk` 并安装到手机；
2. 打开软件，点击 **配置 (Profiles)** $\rightarrow$ 点击右上角 **新配置** $\rightarrow$ 选择 **URL**；
3. 填入名称，在 URL 处粘贴机场订阅链接，将“自动更新”间隔设置为 1440 分钟（24小时）；
4. 点击右上角的保存软盘图标，稍等片刻配置下载完成，点击选中该配置；
5. 返回主界面，点击大大的 **启动 (Start)** 开关，系统会弹出“网络连接请求”提示，点击“确定”即可完成连接。

### 5.2 分应用代理实战：国内微信/银行直连，海外 App 走代理

安卓客户端最人性化的功能就是 **分应用代理 (Per-App Proxy)**：
- 在 CMFA 首页点击 **设置 $\rightarrow$ 网络 $\rightarrow$ 分应用代理**；
- 开启该功能，模式建议选择 **绕过所选应用 (Bypass Selected)**；
- 在应用列表中勾选：微信、QQ、手机银行（招行/工行/建行）、交管12123、原神国服等国内敏感应用；
- **核心价值**：即便客户端出现网络波动，这些国内核心通信与金融 App 的网络连接也绝不会受到半点干扰，既保护隐私又保障顺畅。

```mermaid
flowchart LR
    Phone["安卓手机所有应用流量"] --> CMFA{"CMFA 分应用代理过滤"}
    
    CMFA -->|"勾选的国内 App (微信/银行/淘宝)"| Direct["完全绕过代理: 本地 5G / Wi-Fi 直连 (零卡顿/免风控)"]
    CMFA -->|"未勾选的境外 App (Chrome/YouTube/TG)"| Meta["进入 Mihomo 内核: 经过分流规则与专线加密转发"]
```

### 5.3 国产定制系统（小米/华为/vivo/OPPO）激进后台保活配置

很多安卓用户抱怨：“为什么手机息屏 5 分钟后，Telegram 就收不到新消息，甚至打开屏幕发现代理已经自动关了？”  
这 100% 是由于国产定制系统（小米 HyperOS、华为 HarmonyOS、vivo OriginOS、OPPO ColorOS）在息屏后强行杀掉了代理后台服务进程！

#### 终极保活三部曲设置：
1. **电池策略改为无限制**：长按客户端桌面图标 $\rightarrow$ 点击「应用信息」$\rightarrow$ 找到「省电策略 / 电池管理」$\rightarrow$ 由“智能推荐”更改为 **无限制 (No restrictions)**；
2. **开启自启动权限**：在应用信息中找到「自启动」与「关联启动」，将其全部切换为 **允许**；
3. **多任务界面上锁**：划出手机的多任务后台任务卡片，长按客户端卡片，点击小锁图标将其 **加锁锁定**，防止一键清理后台时被系统清理机制误杀。

---

## 六、Linux 平台实战：桌面端 GUI 与无头服务器 CLI 部署

对于开发者、运维工程师与服务器管理者，Linux 环境下的代理配置是日常拉取代码、部署容器的必备技能。

### 6.1 Ubuntu / Debian / Arch 桌面端 AppImage 运行配置

对于配备图形桌面的 Linux 用户（如 Ubuntu 24.04 LTS）：
1. 下载 `Clash.Verge_x.x.x_amd64.AppImage`；
2. 打开终端，赋予其可执行权限：
   ```bash
   chmod +x Clash.Verge_*.AppImage
   ./Clash.Verge_*.AppImage
   ```
3. 软件运行后，在设置中开启「系统代理」，并在 GNOME 设置中确认 Network Proxy 已自动设置为 Manual `127.0.0.1:7890`。

### 6.2 Linux 无头服务器：Mihomo CLI 二进制与 systemd 服务托管

在没有图形界面的 Linux VPS 或本地开发服务器上，使用原生的 Mihomo 二进制程序搭配 `systemd` 服务托管是生产环境最稳健的做法：

```bash
# 1. 下载并解压最新 Mihomo Linux amd64 二进制文件
wget https://github.com/MetaCubeX/mihomo/releases/download/v1.18.9/mihomo-linux-amd64-v1.18.9.gz
gzip -d mihomo-linux-amd64-v1.18.9.gz
sudo mv mihomo-linux-amd64-v1.18.9 /usr/local/bin/mihomo
sudo chmod +x /usr/local/bin/mihomo

# 2. 创建配置目录与拉取订阅配置
sudo mkdir -p /etc/mihomo
sudo curl -o /etc/mihomo/config.yaml "您的机场Clash订阅链接URL"
```

编写 systemd 守护进程文件 `/etc/systemd/system/mihomo.service`：

```ini
[Unit]
Description=Mihomo Daemon Service
After=network.target

[Service]
Type=simple
User=root
ExecStart=/usr/local/bin/mihomo -d /etc/mihomo
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

启动并设置开机自启：

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now mihomo
# 查看运行日志状态
sudo journalctl -u mihomo -f
```

### 6.3 终端环境变量代理与 Git / Docker 加速命令

默认情况下，Linux 终端命令行（如 `curl`、`wget`、`git`）并不会主动走代理。为了让命令行瞬间享受极速代理加速，请在 `~/.bashrc` 或 `~/.zshrc` 中追加以下别名函数：

```bash
# 梯子猫推荐：终端极速代理开关联盟
alias setproxy="export http_proxy=http://127.0.0.1:7890; export https_proxy=http://127.0.0.1:7890; export all_proxy=socks5://127.0.0.1:7890; echo '终端代理已开启 (127.0.0.1:7890)'"
alias unsetproxy="unset http_proxy https_proxy all_proxy; echo '终端代理已关闭'"

# 单独为 Git 配置全局专线代理
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
```

---

## 七、代理模式、TUN 虚拟网卡与分流规则底层全景解析

掌握客户端的底层运行模式与分流逻辑，是区分“只会用软件的初学者”与“解决各种网络疑难杂症的高手”的分水岭。

### 7.1 系统代理 (System Proxy) vs TUN 虚拟网卡底层工作原理对比

| 核心对比维度 | 系统代理 (System Proxy) | TUN 虚拟网卡模式 (TUN Mode) |
| :--- | :--- | :--- |
| **底层实现层级** | 操作系统应用层（环境变量与注册表） | 操作系统内核网络协议栈（虚拟网络设备） |
| **接管流量范围** | 仅接管遵循系统代理标准的软件（Chrome、Edge、Safari 等） | **强制全量接管系统所有进程的全部流量** |
| **对终端与代码支持**| ❌ 对终端 `curl`、`git`、`Docker` 默认无效 | 🟢 **100% 完美接管**，终端命令无需配置自动走代理 |
| **对游戏与 UDP 支持**| ❌ 不支持 UDP 协议转发，无法为外服游戏加速 | 🟢 **完整支持 UDP 转发**，可直接作为低延迟游戏加速器 |
| **系统权限要求** | 普通用户权限即可开启 | 必须获取管理员 / Root 权限安装虚拟网卡驱动 |
| **系统资源消耗** | 极低，近乎为零 | 轻微增加 CPU 数据包封装计算（约 1% - 3%） |

---

### 7.2 三大核心代理运行模式对比：规则 (Rule) vs 全局 vs 直连

在客户端的主界面上，您总能看到三个并列的模式选项：

1. **规则模式 (Rule)【生产力首选，强烈推荐】**：
   - 客户端根据配置文件中内置的数万条规则集自动进行“智能分流”；
   - 访问 `baidu.com`、`bilibili.com`、`qq.com` 时，识别为国内流量，**直接经由本地宽带发出**（延迟低至几毫秒，不消耗机场流量）；
   - 访问 `google.com`、`github.com`、`youtube.com` 时，识别为境外受阻流量，**自动经由选定的专线代理节点发出**；
2. **全局模式 (Global)【仅在特定排障时使用】**：
   - 强制将本机所有的网络请求全部经由选定的节点发送；
   - **弊端**：国内网页打开极其缓慢、微信接收消息存在延迟、甚至引发网易云音乐等版权警告；
3. **直连模式 (Direct)**：
   - 客户端完全处于旁路穿透状态，所有流量均不走代理节点，相当于关闭了代理软件。

### 7.3 规则集 (Rule-set) 与 GEOIP CN 本地直连分流机制

分流规则是如何在短短 1 毫秒之内做出精确判断的？
1. **域名匹配（Domain Match）**：客户端首先对请求的域名进行从后向前的后缀树匹配（如匹配到 `.google.com` 则走代理）；
2. **IP 归属匹配（GEOIP Match）**：当遇到未在域名规则列表中的陌生网站时，客户端会查询本地预加载的 `GeoIP.dat` 或 `Country.mmdb` 数据库。若该 IP 的注册国家代码为 `CN`（中国大陆），则立即触发 `DIRECT` 直连规则；若非 CN，则进入默认的代理策略组。

---

## 八、高频排障与客户端使用避坑全景指南

以下汇总了全球华人用户在使用客户端过程中最常遭遇的五大经典疑难杂症与秒级解决对策：

```
┌────────────────────────────────────────────────────────────────────────┐
│                   客户端日常高频使用避坑速查字典                        │
├──────────────────────┬────────────────────────┬────────────────────────┤
│ 典型症状             │ 底层根源               │ 秒级修复路径           │
├──────────────────────┼────────────────────────┼────────────────────────┤
│ 软件关掉后电脑断网   │ 7890 端口注册表残留    │ 关闭 Windows 设置中代理 │
│ 节点测速全部超时标红 │ 系统时钟与标准时间超差 │ 开启网络时间自动同步   │
│ 微软商店/Xbox打不开  │ UWP 应用回环隔离限制   │ 运行 UWP Loopback 修复 │
│ 手机息屏后外网断开   │ 系统后台电池激进杀后台 │ 应用信息改为“无限制”   │
│ 订阅链接导入报 500   │ 机场订阅接口临时波动   │ 切换手机热点重新导入   │
└──────────────────────┴────────────────────────┴────────────────────────┘
```

1. **痛点一：关掉翻墙软件后，电脑突然无法打开任何网页！**  
   - *成因*：非正常退出软件导致 Windows 注册表中的代理开关未被复原，流量依然指向已关闭的 `127.0.0.1:7890`；  
   - *解法*：打开 Windows「设置 $\rightarrow$ 网络和 Internet $\rightarrow$ 代理」，在手动设置代理处将「使用代理服务器」开关切换为 **关 (Off)** 即可。详见 [科学上网常见报错与网络诊断排查全攻略](/posts/network-troubleshooting-and-diagnostics/)；
2. **痛点二：开着代理，但终端执行 `git push` 或 `curl` 依然报连接超时！**  
   - *成因*：终端窗口不继承 Windows 系统代理；  
   - *解法*：在客户端中开启 **TUN 虚拟网卡模式**，或在终端中执行上文提供的 `setproxy` 别名命令；
3. **痛点三：节点测速全部显示 Timeout（超时标红），但国内网络完全正常！**  
   - *成因*：90% 的概率是您的本地系统时间与北京时间偏差超过了 60 秒，导致加密协议握手直接被拒；  
   - *解法*：进入系统设置，点击「立即同步时间」即可秒恢复。

---

## 九、站内知识矩阵与延伸阅读集群

本指南属于梯子猫站内 **Clients & Setup Guide（客户端下载与配置核心支柱页）**，建议配合以下专题协同阅读：

```
┌────────────────────────────────────────────────────────────────────────┐
│                   梯子猫站内客户端与配置知识网络拓扑                    │
├────────────────────────────────────────────────────────────────────────┤
│                     【客户端配置核心支柱页 / 本文】                     │
│         全平台科学上网客户端下载与配置指南：Windows/Mac/iOS/Android     │
└──────────────┬──────────────────┬──────────────────┬───────────────────┘
               │                  │                  │
       ┌───────┴────────┐ ┌───────┴────────┐ ┌───────┴────────┐
       ▼                ▼ ▼                ▼ ▼                ▼
 第一层：向上专题门户      第二层：横向深度长文      第三层：向下品牌独立评测
 ├─ /clients/            ├─ 2026核心推荐清单      ├─ /reviews/guangsucloud/
 ├─ /guides/             ├─ 价格防跑路指南         ├─ /reviews/civetnet/
 ├─ /recommend/          ├─ 网络故障排查字典       ├─ /reviews/sujie/
 ├─ /ranking/            ├─ 流媒体与AI解锁全指南   ├─ /reviews/xingdaomeng/
 ├─ /diagnostics/        ├─ 专线线路类型科普       ├─ /reviews/weitu/
 └─ /streaming/          └─ 综合实力天梯榜长文     └─ /reviews/feimaoyun/ 等
```

- **向上支柱门户**：
  - [全平台客户端合集专题门户](/clients/)：全平台客户端安装包直达与版本追踪；
  - [梯子猫教程中心专题门户](/guides/)：新手上手、分流规则定制、TUN 高阶配置实战；
  - [梯子猫 2026 机场推荐专题门户](/recommend/)：全网精选稳定高速机场梯队；
  - [全网机场综合实力排行榜](/ranking/)：晚高峰延迟、吞吐速率与解锁率天梯榜；
  - [网络自检与诊断工具箱门户](/diagnostics/)：秒查秒解网络故障四步自检法则。
- **横向关联深度技术长文**：
  - [2026稳定高速机场梯子推荐清单｜精选高端IPLC/IEPL专线与高性价比科学上网节点](/posts/2026-best-airports-recommendation/)；
  - [机场套餐价格区间剖析与防跑路指南：为什么我们强烈建议优先选择月付？](/posts/airport-pricing-and-scam-prevention/)；
  - [科学上网常见报错与网络诊断排查全攻略：节点超时、EOF与DNS污染解决方案](/posts/network-troubleshooting-and-diagnostics/)；
  - [ChatGPT/Claude/Netflix/Disney+流媒体与AI工具解锁全指南：IP纯净度与防封策略](/posts/chatgpt-claude-netflix-streaming-unlock/)；
  - [什么是IPLC与IEPL专线？科学上网线路类型全景解析与节点选择避坑指南](/posts/iplc-iepl-bgp-nodes-guide/)；
  - [2026最新机场梯子综合实力排行榜｜晚高峰延迟/吞吐速率/抗封锁稳定性天梯榜](/posts/2026-airport-speed-and-stability-ranking/)。

---

## 十、真实用户高频常见问题解答 (FAQ)

### Q1：Clash for Windows (CFW) 还能继续使用吗？为什么被各大社群劝退？
**答**：不建议继续使用。CFW 已经在 2023 年底停更，内部封装的 Chromium 和 Electron 框架存在多个已被公开的高危 CVE 安全漏洞，且无法支持近两年来兴起的 Hysteria2、VLESS Reality 等新协议。此外，网络上充斥着冒充 CFW 官方网站的钓鱼木马软件。建议全面升级至基于 Rust/Tauri 架构、内置现代化 Mihomo 内核的 **Clash Verge Rev**。

### Q2：为什么有些客户端需要付费（如小火箭 \$2.99、Surge 几百元），有些完全免费开源？
**答**：在 Windows、Android 和 Linux 平台，绝大部分优秀的客户端（如 Clash Verge Rev、v2rayN、Sing-box）均由开源社区开发者基于对自由互联网的追求无偿开发维护；而在苹果 iOS 与 macOS 平台，由于苹果严格的沙箱审查、每年 \$99 的开发者账号年费以及闭源商业运营模式，开发者通常以买断制或订阅制销售（如小火箭定价 \$2.99 极为良心，而 Surge 则针对高端专业用户）。

### Q3：开启 TUN 模式后电脑玩国服网络游戏跳 ping 怎么解决？
**答**：TUN 虚拟网卡模式默认会接管系统全部进程流量。如果您在玩国服《英雄联盟》、《无畏契约》或《原神》，游戏数据包可能会经过虚拟网卡过滤引发轻微延迟增加。解决办法：在客户端的分流规则中，确保包含针对游戏域名的 `DIRECT` 直连规则，或者在玩国服游戏时临时关闭 TUN 模式，改用普通的系统代理模式。

### Q4：订阅链接在客户端里更新失败，报 `Invalid URL` 或 `500 Internal Error` 怎么办？
**答**：请按照以下三步排查：1. 登录机场官网，检查自己的套餐是否已经到期欠费，或者当月流量是否已经耗尽；2. 部分运营商对机场的订阅转换域名实施了 DNS 污染阻断，请切换到手机流量热点重新点击更新；3. 在机场后台复制“单节点链接”或更换“备用订阅链接”重新导入。

### Q5：一个机场订阅链接可以同时在电脑、手机、平板几台设备上导入使用吗？
**答**：完全可以导入多台设备。但能否“同时在线使用”，取决于您购买的机场套餐所允许的 **同时在线设备数（通常为 2 至 5 台）**。如果超过了服务商规定的同时在线上限，部分设备可能会被临时踢下线或限速。详情请在购买前参阅各商家的套餐说明。

### Q6：为什么我的客户端里测速显示的延迟很低，但实际看视频还是卡？
**答**：客户端中的“延迟测试（Ping / URL Test）”默认仅代表客户端向入口服务器发送的 **TCP 探针往返时延**，并不等同于节点真实的**带宽吞吐速率（Bandwidth Throughput）**。一个延迟仅 30ms 的节点，如果机房带宽拥塞严重，看视频依然会频繁缓冲转圈。真实速度必须以 Fast.com 或 YouTube 统计信息中的实际加载码率为准。

### Q7：科学上网客户端会记录我的个人浏览历史或偷取我的密码吗？
**答**：只要您是从官方 GitHub Release 下载的正版开源客户端，其源代码经过全球成千上万名开发者的公开审计，**绝不可能包含任何后门或隐私收集代码**。此外，现代互联网普遍采用 HTTPS 强加密协议，即使数据包经过客户端转发，您的明文密码与银行卡信息也是全程加密的，任何中间节点均无法解密窃取。

---

*本文由梯子猫评测实验室（AirportTizi.com）客户端技术组独立编写。我们致力于为全球华人用户提供纯净、权威、安全的开源网络工具使用指南。*
