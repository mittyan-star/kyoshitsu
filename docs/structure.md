mittyan-hp/
├─ package.json
├─ astro.config.mjs
├─ tsconfig.json
├─ public/
│  └─ favicon.svg
├─ src/
│  ├─ layouts/
│  │  └─ BaseLayout.astro
│  ├─ styles/
│  │  └─ global.css        # tailwind v4: ここに `@import "tailwindcss";`
│  ├─ components/
│  │  ├─ Header.astro
│  │  ├─ Footer.astro
│  │  ├─ CTAButton.astro
│  │  ├─ Breadcrumbs.astro
│  │  └─ FAQAccordion.astro
│  ├─ content/
│  │  ├─ config.ts         # Content Collections のスキーマ
│  │  ├─ blog/
│  │  │  └─ first-post.mdx
│  │  └─ events/
│  │     └─ sample-event.mdx
│  ├─ pages/
│  │  ├─ index.astro        # トップ
│  │  ├─ method.astro       # 学習法
│  │  ├─ courses.astro      # コース
│  │  ├─ schedule.astro     # 時間割/カレンダー
│  │  ├─ pricing.astro      # 料金
│  │  ├─ reserve.astro      # 体験予約（Googleフォーム埋め込み）
│  │  ├─ events/
│  │  │  ├─ index.astro
│  │  │  └─ [slug].astro
│  │  ├─ voice.astro        # 保護者/生徒の声
│  │  ├─ blog/
│  │  │  └─ [slug].astro
│  │  ├─ faq.astro
│  │  ├─ about.astro
│  │  ├─ contact.astro
│  │  ├─ access.astro
│  │  ├─ policy.astro
│  │  ├─ news.astro
│  │  ├─ links.astro        # Instagram/LINEのリンク集
│  │  ├─ 404.astro
│  │  └─ thank-you.astro
│  └─ lib/
│     ├─ analytics.ts       # GA4 設定/イベント
│     └─ schema.ts          # JSON-LD 生成ユーティリティ
└─ .github/
   └─ workflows/
      └─ deploy.yml         # GitHub Pages 用（任意）
