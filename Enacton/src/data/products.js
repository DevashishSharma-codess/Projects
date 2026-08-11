import {
  Wallet,
  Layers,
  Heart,
  Coins,
  Zap,
  Tag,
  Sparkles,
  Smartphone,
  BarChart3,
  Activity,
  Cpu,
  MessageSquare,
} from "lucide-react";

// 3 Background Image Styles shared across products
export const QUOTE_BG_IMAGES = {
  // Style 1: Gold & Grey Fluid Marble Swirl
  goldSwirl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=85",
  // Style 2: Turquoise & Coral Liquid Ink in Water
  liquidInk: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1920&q=85",
  // Style 3: Royal Blue to Mint Cyan Gradient
  blueGradient: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1920&q=85",
};

export const PRODUCTS = [
  {
    id: "cashback-os",
    name: "CashbackOS",
    product: "Coupon + Cashback Platform",
    category: "Cashback Platform",
    tag: "Live",
    version: "3.5",
    metric: "5M+ Transactions",
    headline: "Enterprise coupon & cashback engine for global affiliate networks.",
    subhead: "Complete cashback operating system with multi-tier rewards, automated affiliate link routing, payout reconciliation, and fraud prevention.",
    description:
      "CashbackOS powers enterprise coupon and cashback operations with real-time tracking, automatic commission distribution, and dynamic store management. Connect hundreds of affiliate networks through a single unified platform.",
    image:
      "https://images.unsplash.com/photo-1556742049-0a67568d049f?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.liquidInk,
    icon: Wallet,
    techStack: ["Node.js", "React 19", "Redis Cache", "PostgreSQL", "Kafka"],
    highlights: [
      { title: "Automated Commission Routing", desc: "Instantly attributes sales to users via webhook notifications and API sub-ID tracking." },
      { title: "Multi-Tier Cashback Rules", desc: "Configure custom percentage, flat rate, or tiered cashback rates based on store category." },
      { title: "Instant Payout Gateway", desc: "Automated cashouts via UPI, PayPal, Bank Transfer, and digital gift cards." },
      { title: "Real-time Fraud Shield", desc: "Detects duplicate IPs, suspicious click patterns, and self-referral anomalies automatically." },
    ],
    codeSnippets: {
      python: `import enacton

client = enacton.CashbackOS(api_key="cb_live_8912")

# Process user cashback claim
transaction = client.claims.create(
    user_id="usr_9918",
    store="Amazon",
    order_amount=149.99,
    affiliate_sub_id="sub_991"
)

print(f"Cashback approved: \\\${transaction.cashback_amount}")`,
      typescript: `import { CashbackOS } from "@enacton/cashback-os";

const cb = new CashbackOS({ apiKey: process.env.ENACTON_API_KEY });

const payout = await cb.payouts.trigger({
  userId: "usr_9918",
  amount: 25.50,
  method: "UPI"
});

console.log(\`Payout processed with ID: \${payout.id}\`);`,
      curl: `curl -X POST https://api.enacton.com/v1/cashback/claim \\
  -H "Authorization: Bearer cb_live_8912" \\
  -H "Content-Type: application/json" \\
  -d '{
    "user_id": "usr_9918",
    "order_amount": 149.99,
    "store": "Amazon"
  }'`
    },
    ceoQuote: "CashbackOS was engineered to eliminate cashback attribution fragmentation. We turned complex multi-network affiliate systems into a single, bulletproof platform that processes millions of rewards with zero latency.",
  },
  {
    id: "laraback",
    name: "Laraback",
    product: "Cashback/Affiliate Platform",
    category: "Laravel Cashback Engine",
    tag: "Live",
    version: "4.2",
    metric: "1,000+ Stores Integrated",
    headline: "Modular PHP/Laravel engine for launching custom affiliate platforms.",
    subhead: "Robust, customizable cashback script built on Laravel framework for rapid deployment, store integration, and affiliate network syncing.",
    description:
      "Laraback is the gold standard for PHP-based cashback and coupon applications. Features automated network scrapers, commission ledgers, admin dashboards, and SEO-optimized storefronts.",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.goldSwirl,
    icon: Layers,
    techStack: ["Laravel 11", "Vue 3", "MySQL", "Redis", "TailwindCSS"],
    highlights: [
      { title: "100+ Network Scrapers", desc: "Pre-built sync engines for CJ, Impact, Rakuten, Awin, Amazon Associates, and ShareASale." },
      { title: "Customizable Vue Frontend", desc: "Easily modify themes, storefront cards, category listings, and user dashboards." },
      { title: "Auto-Reconciliation Ledger", desc: "Matches affiliate network postback logs with pending user transactions automatically." },
      { title: "High Performance Caching", desc: "Redis query cache serving millions of product deals in under 20ms." },
    ],
    codeSnippets: {
      python: `from enacton import LarabackEngine

engine = LarabackEngine(network="impact_radius")

# Sync deals and store coupons automatically
sync_result = engine.sync_coupons(auto_publish=True)

print(f"Synced {sync_result.coupons_count} active coupons across 120 stores")`,
      typescript: `import { LarabackClient } from "@enacton/laraback";

const client = new LarabackClient({ baseUrl: "https://mycashback.com" });
const deals = await client.getTrendingDeals({ limit: 20 });`,
      curl: `curl -X GET "https://api.enacton.com/v2/laraback/stores?category=fashion" \\
  -H "Authorization: Bearer lb_live_7721"`
    },
    ceoQuote: "With Laraback, we gave businesses complete control to launch and customize their own cashback platforms without spending months building backend infrastructure.",
  },
  {
    id: "fundback",
    name: "FundBack",
    product: "Cashback/Fundraising Solution",
    category: "Social Impact FinTech",
    tag: "Live",
    version: "2.1",
    metric: "$2M+ Raised for Causes",
    headline: "Turn everyday shopping cashback into charitable donations.",
    subhead: "Innovative fundraising solution allowing non-profits, schools, and charities to collect affiliate cashback from everyday online purchases.",
    description:
      "FundBack connects online shoppers with cause-based fundraising. Every purchase made at partner stores automatically generates cashback that is directed toward the user's chosen charity or community project.",
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.blueGradient,
    icon: Heart,
    techStack: ["React", "Node.js", "PostgreSQL", "Stripe Connect", "GraphQL"],
    highlights: [
      { title: "Cause Allocation Engine", desc: "Users split cashback percentage across multiple verified charities and non-profits." },
      { title: "Tax Receipt Automation", desc: "Generates automated tax-deductible donation receipts for users annually." },
      { title: "Non-Profit Campaign Portal", desc: "Organizations track real-time supporter activity and incoming shopping donations." },
      { title: "Seamless Browser Extension", desc: "Notifies supporters of donation-eligible cashback while browsing store websites." },
    ],
    codeSnippets: {
      python: `import enacton_fund

fb = enacton_fund.FundBack(cause_id="cause_clean_ocean")

donation = fb.process_shopping_cashback(
    shopper_id="shop_102",
    cashback_val=12.50
)

print(f"Donated \\\${donation.amount} to {donation.cause_name}")`,
      typescript: `import { FundBack } from "@enacton/fundback";

const fb = new FundBack();
const causeStats = await fb.getCauseImpact("cause_clean_ocean");`,
      curl: `curl -X POST https://api.enacton.com/v1/fundback/donate \\
  -d '{"cause_id":"clean_water","cashback":15.00}'`
    },
    ceoQuote: "FundBack transforms commercial affiliate transactions into continuous funding for social causes and non-profit organizations globally.",
  },
  {
    id: "crypto-cashback",
    name: "CryptoCashback",
    product: "Cryptocurrency Cashback Platform",
    category: "Web3 & Crypto FinTech",
    tag: "Live",
    version: "1.8",
    metric: "100+ Tokens Supported",
    headline: "Earn Bitcoin, Ethereum, and stablecoins on every online order.",
    subhead: "Next-gen Web3 cashback infrastructure converting fiat affiliate commissions into instant cryptocurrency rewards directly into self-custody wallets.",
    description:
      "CryptoCashback bridges traditional e-commerce affiliate rewards with decentralized finance. Shoppers earn instant crypto rewards in BTC, ETH, USDT, or native tokens for shopping at 5,000+ online retailers.",
    image:
      "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.liquidInk,
    icon: Coins,
    techStack: ["Solidity", "Ethers.js", "Go", "Redis", "FastAPI"],
    highlights: [
      { title: "Instant Multi-Chain Payouts", desc: "Support for Polygon, Solana, Arbitrum, Ethereum, and Bitcoin Lightning network." },
      { title: "Automated Swap & Routing", desc: "Converts fiat affiliate postbacks to chosen tokens at real-time market rates." },
      { title: "Non-Custodial Wallet Connect", desc: "Integrates with MetaMask, Phantom, Trust Wallet, and Coinbase Wallet." },
      { title: "Staking & Yield Rewards", desc: "Option for users to auto-stake cashback balances for annual percentage yields." },
    ],
    codeSnippets: {
      python: `import crypto_cashback

cc = crypto_cashback.Client(api_key="cc_live_1109")

tx = cc.rewards.distribute(
    wallet_address="0x71C...9B",
    token="USDT",
    fiat_amount=45.00
)

print(f"Distributed {tx.token_amount} {tx.token} on Polygon")`,
      typescript: `import { CryptoCashback } from "@enacton/crypto-cashback";

const cc = new CryptoCashback();
const txHash = await cc.claimRewards({ wallet: "0x71C...9B", token: "BTC" });`,
      curl: `curl -X POST https://api.enacton.com/v1/crypto/payout \\
  -d '{"wallet":"0x71C...9B","token":"USDT","fiat_val":45.00}'`
    },
    ceoQuote: "CryptoCashback removes Web3 friction, enabling shoppers to build a crypto portfolio effortlessly through everyday shopping.",
  },
  {
    id: "superback",
    name: "SuperBack",
    product: "Cashback Platform",
    category: "High-Yield Cashback Engine",
    tag: "Live",
    version: "3.0",
    metric: "99.9% Tracking Rate",
    headline: "Maximum-yield cashback aggregation & booster engine.",
    subhead: "Enterprise cashback software featuring dynamic rate boosters, flash deal alerts, and multi-network affiliate rate optimization.",
    description:
      "SuperBack maximizes user cashback retention by dynamically matching store rates across multiple affiliate networks. Always offer your users the highest cashback percentage in the market automatically.",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.goldSwirl,
    icon: Zap,
    techStack: ["React 19", "Python", "ClickHouse", "PostgreSQL", "Docker"],
    highlights: [
      { title: "Best-Rate Aggregator Algorithm", desc: "Compares affiliate payouts across 20+ networks in real-time to pick highest yield." },
      { title: "Flash Boost Campaigns", desc: "Schedule timed 2x and 3x cashback boost events for top retail events." },
      { title: "Gamified VIP Loyalty Tiers", desc: "Unlock higher cashback percentages as user monthly shopping milestone increases." },
      { title: "Deep Linking SDK", desc: "Generates instant mobile app deep links for seamless shopping checkout." },
    ],
    codeSnippets: {
      python: `from superback import RateOptimizer

opt = RateOptimizer()

# Find maximum commission network for target store
best_route = opt.get_highest_yield_network(store_id="walmart")

print(f"Routing traffic via {best_route.network_name} @ {best_route.rate}% commission")`,
      typescript: `import { SuperBack } from "@enacton/superback";

const sb = new SuperBack();
const rate = await sb.getBestRate("walmart");`,
      curl: `curl -X GET "https://api.enacton.com/v3/superback/best-rate?store=walmart"`
    },
    ceoQuote: "SuperBack makes sure users always get the highest cashback percentage available while giving platform owners optimal affiliate margins.",
  },
  {
    id: "couponorb",
    name: "CouponOrb",
    product: "Coupon/Deals Platform",
    category: "Deal & Coupon Intelligence",
    tag: "Live",
    version: "2.7",
    metric: "500K+ Active Coupons",
    headline: "Automated coupon ingestion, verification, & deal discovery engine.",
    subhead: "Next-gen coupon and deal portal featuring automated voucher testing, expiry verification, and AI-curated deal rankings.",
    description:
      "CouponOrb automates coupon management for online deal portals. Uses headless browser validation to automatically test coupon codes, drop expired vouchers, and highlight verified savings for shoppers.",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.blueGradient,
    icon: Tag,
    techStack: ["Puppeteer", "Node.js", "Typesense", "React", "MongoDB"],
    highlights: [
      { title: "Automated Voucher Verification", desc: "Headless bots test checkout promo codes 24/7 to guarantee 100% working codes." },
      { title: "Sub-10ms Instant Deal Search", desc: "Powered by in-memory search index for lightning fast brand and store lookups." },
      { title: "Community Code Submissions", desc: "User-submitted promo codes auto-tested and rewarded upon successful validation." },
      { title: "SEO-Structured Schema Output", desc: "Auto-generates Google Rich Snippets for discount codes and product deals." },
    ],
    codeSnippets: {
      python: `import coupon_orb

orb = coupon_orb.Verifier()

# Test coupon code against checkout target
status = orb.test_code(store="nike", code="SAVE20")

print(f"Code Valid: {status.is_valid} | Savings: {status.discount_desc}")`,
      typescript: `import { CouponOrb } from "@enacton/couponorb";

const orb = new CouponOrb();
const coupons = await orb.getVerifiedCoupons("nike");`,
      curl: `curl -X GET "https://api.enacton.com/v1/couponorb/search?q=nike"`
    },
    ceoQuote: "CouponOrb solved the broken coupon problem by deploying automated verification bots that test checkout codes in real time.",
  },
  {
    id: "instab",
    name: "InstaB",
    product: "Instant Cashback/Deals Solution",
    category: "Real-time Cashback Gateway",
    tag: "Live",
    version: "1.4",
    metric: "<60s Cashback Approval",
    headline: "Instant post-purchase cashback credit & reward authorization.",
    subhead: "Ultra-fast cashback processing API that validates purchase receipts and bank webhooks for instant user balance credit.",
    description:
      "InstaB removes the traditional 30-90 day affiliate payout waiting period. By integrating bank open API feeds and card-linked offers, InstaB credits cashback to user wallets within seconds of purchase.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.liquidInk,
    icon: Sparkles,
    techStack: ["Go", "Redis", "PostgreSQL", "Plaid API", "AWS Lambda"],
    highlights: [
      { title: "Card-Linked Offer (CLO) Sync", desc: "Connect user credit/debit cards for automatic in-store and online cashback." },
      { title: "Instant Wallet Balance Credit", desc: "Advances verified cashback funds instantly to boost user retention by 4x." },
      { title: "Open Banking Data Pipeline", desc: "Secure transaction verification using ISO20022 open banking protocols." },
      { title: "Sub-Second Push Notifications", desc: "Alert users the instant cashback hits their mobile wallet balance." },
    ],
    codeSnippets: {
      python: `from instab import InstantCreditEngine

engine = InstantCreditEngine()

# Authorize instant cashback advance
credit = engine.authorize_instant_cashback(
    tx_id="tx_88192",
    confidence_score=0.98
)

print(f"Credited \\\${credit.amount} instantly to user wallet")`,
      typescript: `import { InstaB } from "@enacton/instab";

const instab = new InstaB();
await instab.creditInstantCashback({ transactionId: "tx_88192" });`,
      curl: `curl -X POST https://api.enacton.com/v1/instab/authorize \\
  -d '{"tx_id":"tx_88192","user_id":"usr_441"}'`
    },
    ceoQuote: "InstaB delivers instant gratification to shoppers by replacing delayed affiliate payouts with immediate wallet credit.",
  },
  {
    id: "cashback-app",
    name: "CashbackApp",
    product: "Mobile Cashback Application",
    category: "Cross-Platform Mobile App",
    tag: "Live",
    version: "5.1",
    metric: "1M+ Mobile Installs",
    headline: "Turnkey iOS & Android app template for cashback platforms.",
    subhead: "Feature-rich mobile application with in-app browser, push notification triggers, biometric login, and receipt scanner AI.",
    description:
      "CashbackApp is a complete cross-platform mobile solution for shopping networks. Includes an embedded affiliate browser that auto-injects sub-IDs, receipt uploading OCR, and location-based nearby store alerts.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.goldSwirl,
    icon: Smartphone,
    techStack: ["React Native", "Flutter", "Firebase", "Node.js", "GraphQL"],
    highlights: [
      { title: "In-App Cashback Browser", desc: "Auto-activates cashback and fills promo codes directly within mobile app webview." },
      { title: "Offline Receipt Scanning OCR", desc: "Camera OCR parses physical store receipts for local grocery & retail cashback." },
      { title: "Geo-Fenced Nearby Deals", desc: "Sends push notifications when users enter partner shopping centers." },
      { title: "Biometric Wallet Cashout", desc: "Secure cash withdrawals using FaceID and TouchID authentication." },
    ],
    codeSnippets: {
      python: `import cashback_app_backend

app = cashback_app_backend.NotificationService()

# Send geo-targeted promo alert to mobile app user
app.send_geofence_alert(
    user_id="usr_9012",
    store="Target",
    cashback_pct=5.0
)`,
      typescript: `import { CashbackAppSDK } from "@enacton/cashback-app";

const sdk = new CashbackAppSDK();
sdk.initializeInAppBrowser({ storeUrl: "https://nike.com", subId: "mob_99" });`,
      curl: `curl -X POST https://api.enacton.com/v1/mobile/push \\
  -d '{"user_id":"usr_9012","message":"5% Cashback at Target near you!"}'`
    },
    ceoQuote: "CashbackApp provides an intuitive mobile shopping experience that keeps users coming back for every online purchase.",
  },
  {
    id: "affport",
    name: "AffPort",
    product: "Affiliate Management Platform",
    category: "Partner & Merchant Portal",
    tag: "Live",
    version: "3.4",
    metric: "10,000+ Active Affiliates",
    headline: "Centralized portal for managing affiliates, publishers, & networks.",
    subhead: "Comprehensive partner management platform for tracking publisher performance, commission tiers, creative assets, and automated billing.",
    description:
      "AffPort empowers brands and cashback operators to manage their publisher relationships. Features custom affiliate onboarding, commission structure management, link generation, and automated payout invoices.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.blueGradient,
    icon: BarChart3,
    techStack: ["React 19", "Next.js", "PostgreSQL", "TailwindCSS", "Express"],
    highlights: [
      { title: "Publisher Onboarding Portal", desc: "Automated application review, tax form collection (W-9 / W-8BEN), and contract signing." },
      { title: "Custom Commission Tiering", desc: "Set performance bonuses, VIP commission bumps, and category-specific splits." },
      { title: "Creative & Banner Asset Vault", desc: "Distribute tracking links, promotional banners, and HTML deal widgets." },
      { title: "Automated Invoice Reconciliation", desc: "Generates monthly self-billing invoices with automatic tax compliance." },
    ],
    codeSnippets: {
      python: `from affport import PartnerManager

pm = PartnerManager()

# Update publisher commission tier
pm.set_tier(publisher_id="pub_4410", tier="VIP_GOLD", commission_bump=2.5)

print("Updated partner tier successfully")`,
      typescript: `import { AffPort } from "@enacton/affport";

const affport = new AffPort();
const summary = await affport.getPublisherReport("pub_4410");`,
      curl: `curl -X POST https://api.enacton.com/v1/affport/publishers/tier \\
  -d '{"publisher_id":"pub_4410","tier":"VIP_GOLD"}'`
    },
    ceoQuote: "AffPort gives merchants and platforms complete operational clarity over publisher networks and payout automation.",
  },
  {
    id: "affiliate-track",
    name: "AffiliateTrack",
    product: "Affiliate Tracking Solution",
    category: "Attribution & Analytics",
    tag: "Live",
    version: "4.0",
    metric: "Sub-5ms Link Redirection",
    headline: "High-precision cookieless affiliate tracking & link routing.",
    subhead: "Enterprise tracking engine delivering sub-5ms redirect latency, Server-to-Server (S2S) postbacks, first-party cookie attribution, and click fraud prevention.",
    description:
      "AffiliateTrack provides accurate sales attribution in an era of strict privacy controls and cookie blocking. Supports server-side postbacks, parallel tracking, and real-time click stream analytics.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.liquidInk,
    icon: Activity,
    techStack: ["Go", "Redis Edge", "ClickHouse", "Kafka", "AWS CloudFront"],
    highlights: [
      { title: "Sub-5ms Global Edge Routing", desc: "Deployed on edge nodes worldwide for zero-delay user link redirection." },
      { title: "Server-to-Server (S2S) Postbacks", desc: "Bypasses browser cookie blocking with direct webhook conversion tracking." },
      { title: "Bot & Invalid Click Filtering", desc: "Filters datacenter proxies, web crawlers, and rapid-fire click spam." },
      { title: "Multi-Touch Attribution", desc: "Supports first-click, last-click, and linear multi-touch conversion attribution models." },
    ],
    codeSnippets: {
      python: `import affiliate_track

tracker = affiliate_track.PostbackHandler()

# Fire conversion postback securely
result = tracker.log_conversion(
    click_id="clk_901827",
    payout=14.50,
    currency="USD"
)

print(f"Attributed conversion status: {result.status}")`,
      typescript: `import { AffiliateTrack } from "@enacton/affiliate-track";

const at = new AffiliateTrack();
await at.logClick({ subId: "sub_100", storeId: "store_55" });`,
      curl: `curl -X POST https://api.enacton.com/v1/track/postback \\
  -d '{"click_id":"clk_901827","payout":14.50}'`
    },
    ceoQuote: "AffiliateTrack ensures 100% conversion attribution accuracy even under strict browser privacy policies.",
  },
  {
    id: "perfosphere",
    name: "Perfosphere",
    product: "Performance/Affiliate Marketing Platform",
    category: "Performance Marketing AI",
    tag: "Live",
    version: "2.3",
    metric: "10M+ Daily Clicks",
    headline: "AI-driven performance marketing & campaign optimization platform.",
    subhead: "All-in-one performance marketing hub with automated ROAS optimization, smart link rotators, and campaign analytics.",
    description:
      "Perfosphere analyzes campaign data in real time to automatically re-route traffic to highest converting offers. Maximize Return on Ad Spend (ROAS) across affiliate ad channels.",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.goldSwirl,
    icon: Cpu,
    techStack: ["Python", "PyTorch", "React 19", "FastAPI", "PostgreSQL"],
    highlights: [
      { title: "Smart Offer Traffic Rotator", desc: "Dynamically routes click traffic based on geo, device, and conversion probability." },
      { title: "Automated ROAS Optimization", desc: "Pauses low-performing landers and scales winning ad creatives automatically." },
      { title: "Real-time Profitability Telemetry", desc: "Live dashboard tracking ad spend vs affiliate revenue in real-time." },
      { title: "A/B Landing Page Splitter", desc: "Built-in multivariate testing engine for lander conversion optimization." },
    ],
    codeSnippets: {
      python: `from perfosphere import SmartRotator

rotator = SmartRotator(campaign_id="cmp_7701")

# Get optimal landing page for incoming request
lander = rotator.select_optimal_lander(
    country="US",
    device="mobile_ios"
)

print(f"Redirecting user to: {lander.url}")`,
      typescript: `import { Perfosphere } from "@enacton/perfosphere";

const perfo = new Perfosphere();
const stats = await perfo.getCampaignROAS("cmp_7701");`,
      curl: `curl -X GET "https://api.enacton.com/v1/perfosphere/analytics?campaign=cmp_7701"`
    },
    ceoQuote: "Perfosphere brings artificial intelligence to performance campaign optimization, maximizing ROAS automatically.",
  },
  {
    id: "telegram-cashback-bot",
    name: "Telegram Cashback Bot",
    product: "Telegram-Based Cashback Automation",
    category: "Conversational Commerce",
    tag: "Live",
    version: "2.0",
    metric: "500K+ Active Users",
    headline: "Automated Telegram bot for deal sharing & instant cashback.",
    subhead: "High-speed Telegram bot that converts product URLs into affiliate cashback links, manages user balances, and broadcasts deal alerts.",
    description:
      "Telegram Cashback Bot enables shoppers to earn cashback directly inside Telegram. Users paste any online store link, and the bot instantly returns a tracked cashback link. Features automated group channel deal broadcasting.",
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1920&q=85",
    quoteBg: QUOTE_BG_IMAGES.blueGradient,
    icon: MessageSquare,
    techStack: ["Python", "python-telegram-bot", "Redis", "PostgreSQL", "FastAPI"],
    highlights: [
      { title: "Instant URL Conversion", desc: "Paste any store link and get a shortened affiliate cashback link in under 1 second." },
      { title: "Channel Deal Auto-Broadcaster", desc: "Post top deals and coupons automatically to Telegram channels with embedded affiliate links." },
      { title: "Telegram Mini-App Integration", desc: "Embedded WebApp inside Telegram for checking wallet balance and requesting cashout." },
      { title: "Referral & Group Bonuses", desc: "Built-in virality engine rewarding users for referring friends to the bot." },
    ],
    codeSnippets: {
      python: `from telegram_cashback import BotEngine

bot = BotEngine(token="tg_bot_991827")

# Convert store URL into tracked affiliate cashback link
aff_link = bot.convert_url(
    user_id=10293847,
    raw_url="https://amazon.com/dp/B08N5WRWNW"
)

print(f"Generated track link: {aff_link.short_url}")`,
      typescript: `import { TelegramCashbackBot } from "@enacton/telegram-bot";

const tgBot = new TelegramCashbackBot();
await tgBot.sendDealAlert({ channelId: "@topdeals", dealId: "deal_88" });`,
      curl: `curl -X POST https://api.enacton.com/v1/telegram/convert \\
  -d '{"user_id":10293847,"url":"https://amazon.com/dp/B08N5WRWNW"}'`
    },
    ceoQuote: "Telegram Cashback Bot brings affiliate shopping directly into messaging channels where millions of users communicate daily.",
  },
];
