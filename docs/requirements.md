みっちゃん塾 HP 要件定義（v0.2 / Draft）

本書は、直近の会話内容を統合し、①運営（塾の状況）×②マーケティング×③プログラム開発の3視点でまとめた要件定義です。初回実装～公開～運用改善までの共通認識として利用します。

0. 背景と目的（①運営）

検索・SNS・LINE・オフラインQRからの流入を受け、体験予約（決済なし）と問い合わせに確実に到達させる。

独自性（生徒が説明／先生は聞き手／ワンフレーズ報告／プレゼン教育）を10–20ページで一貫表現する。

既存の Googleフォーム＋スプレッドシート＋GAS の運用と自然連携（データ一元化、通知、保護者共有）。

成果KPI（公開後3か月の目安）

予約完了率（LP→予約フォーム送信） ≥ 4–6%

問い合わせ率（全流入） ≥ 2–3%

直帰率 ≤ 55%

コアウェブバイタル：LCP ≤ 2.5s / INP ≤ 200ms / CLS ≤ 0.1

GSC：主要クエリのインプレッション +30–50%/月

スコープ

IN：情報サイト（10–20ページ）、予約/イベント申込導線、計測、構造化データ、ローカルSEO、運用ワークフロー。

OUT：オンライン決済、会員専用ポータル、学習者ダッシュボード（将来拡張）。

1. ペルソナと価値提案（①×②）

主ペルソナ

A）小〜中学生の保護者（30代後半・Instagram/LINE利用、教育トレンドに前向き）

B）高校生本人（京大数学志望含む：思考重視の指導を比較検討）

C）コミュニティ参加者（Cosmos Party／ボードゲーム／つばめふれあい食堂）

価値提案（メッセージ）

「生徒が説明する学び」で説明力×思考力を伸ばす。

ワンフレーズ報告で保護者が成長を実感。

プレゼン×実社会課題で学びを社会に接続。

京大数学レベルまで届く思考プロセス重視の指導。

主要導線

LINE・ポスターQR → /reserve（UTM付与）

記事・検索 → / → /method → /courses → /reserve

イベント現地QR → /events/slug → /reserve

2. 情報設計（サイトマップ：10–20ページ）

/（トップ：独自メソッド、実績、予約CTA）

/method（学習法：生徒説明／聞き手の先生／ワンフレーズ／プレゼン教育）

/courses（小・中・高コース、範囲、目標、京大数学方針）

/schedule（開講時間・教室カレンダー）

/pricing（料金・ルール：「予約あり／決済なし」明記）

/reserve（体験予約：Googleフォーム埋め込み）

/events（一覧）／/events/[slug]（詳細）

/voice（保護者・生徒の声）

/blog（教育×AI／学習法／ロングフォーム）

/faq（AEO/FAQ構造化データ、入会手順、振替、持ち物）

/about（理念「社会で教育を変える」、先生紹介）

/contact（問い合わせフォーム）

/access（地図・交通、写真）

/policy（プライバシー・免責）

/news（お知らせ）

/links（Instagram/LINEリンク集）

404／/thank-you（フォーム完了ページ）

全ページの受け皿要件

固定CTA（右上「体験予約」／フッターLINE）

title/description/OG/Twitter Card設計、H1–H3、パンくず、内部リンク

30–50字の要約ボックス（スマホ首屏／AEO対策）

3. コンテンツ編集方針（②マーケ）

記事テンプレ

60–80字の要約（AI検索/AEO対策）

課題→解決→成果（事例：ワンフレーズ報告）

CTA（予約/LINE）

FAQ 3–5個（構造化データ）

画像方針：発表・対話・視線の交わりが見える実写を主、イベントの賑わい写真。

法務：顔出し同意・撮影ガイドライン、学校名の扱いに注意。

4. 機能要件（②×③）

MUST

予約フォーム（Googleフォーム＋GAS）：自動返信、教室通知（Slack/LINE）、スプレッドシート集計、重複検知。

イベント一覧・詳細・申込導線（フォームは共通基盤）。

構造化データ：Organization / LocalBusiness / Course / Event / FAQ / Breadcrumb。

サイトマップ自動生成、robots、canonical、パンくず。

画像最適化（WebP）、遅延読み込み、OG画像自動生成テンプレ。

SHOULD

QR計測（/qr?src=poster-...）でオフライン起点を可視化。

AEO対策（FAQと短文サマリでAI検索最適化）。

GA4＋GSC＋CV計測（予約／問い合わせ／LINE遷移）。

ローカルSEO（GBP：NAP一貫、営業時間、地図埋め込み）。

NICE

予約の空き枠表示（Sheets↔表示）、ICS配布。

口コミ断片の構造化抜粋（声カード化）。

LP要素のA/Bテスト（見出し・ヒーロー画像）。

5. 非機能要件（③）

パフォーマンス：LCP ≤ 2.5s、INP ≤ 200ms、CLS ≤ 0.1

モバイルファースト、アクセシビリティ（WCAG 2.2 AA相当）

セキュリティ：reCAPTCHA/ハニーポット、スパム対策

可用性：ステージング /stg → 本番反映

監視：GSCエラー／CWV監視

6. SEO / AEO / ローカルSEO（②）

キーワード設計

ブランド：みっちゃん塾、mittyan塾

一般：神戸 塾／灘区 塾／小学生・中学生・高校生 個別／京大 数学 塾

コンテンツ：説明力／プレゼン教育／ボードゲーム 教育／食堂 学習支援

対策

構造化データ：Organization/LocalBusiness/Course/Event/FAQ/Article

内部リンク動線最適化（method → courses → reserve / blog →関連）

ポスター・イベントQRは専用UTMで効果測定

Instagram/LINE → /links 経由で /reserve

Google ビジネスプロフィール最適化（写真・投稿・Q&A）

7. 予約・フォーム要件（①運用 × ③開発）

Googleフォーム＋GAS基盤を継続利用（既存資産・通知・集計を活かす）。

項目：保護者/生徒名、学年、学校、電話、メール、希望日時、目的。

自動返信：受領/持ち物/所要/地図/キャンセル、ICS添付（可能なら）。

内部通知：Slack/LINE（教室用）、重複検知、平均回答時間ロジック（任意）。

完了画面：/thank-you（次アクション、LINE追加、アクセス案内）。

8. 技術アーキテクチャ（③）

採用：Astro v5 + Tailwind v4 + MDX + @astrojs/sitemap（Node ≥ 20.3.0）

Node

package.json（抜粋）

scripts：dev / build / preview / check / format

deps：astro / @astrojs/mdx / @astrojs/sitemap / tailwindcss / @tailwindcss/vite

devDeps：prettier / prettier-plugin-astro

Python（ユーティリティ任意）

requirements.txt：Pillow / Jinja2 / python-slugify / requests

（任意）cairosvg（OG画像SVG→PNG）／reportlab（PDF）／Google API系

初期設定ファイル

astro.config.mjs：Tailwind（Viteプラグイン）＋@astrojs/sitemap

src/styles/global.css：@import "tailwindcss";

9. ディレクトリ構成 & ドキュメント配置（③＋チーム運用）

原則

短い版は README.md（TL;DR）に、完全版は /docs/structure.md に配置。

/docs/structure.md は自動生成（手編集しない）。

最小構成

mittyan-hp/
├─ package.json
├─ astro.config.mjs
├─ public/
│  └─ favicon.svg
├─ src/
│  ├─ layouts/
│  ├─ styles/          # tailwind v4: global.css
│  ├─ components/
│  ├─ content/
│  │  ├─ blog/
│  │  └─ events/
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ method.astro
│  │  ├─ courses.astro
│  │  ├─ schedule.astro
│  │  ├─ pricing.astro
│  │  ├─ reserve.astro
│  │  ├─ events/[slug].astro
│  │  ├─ blog/[slug].astro
│  │  ├─ faq.astro / about.astro / contact.astro / access.astro / policy.astro / news.astro / links.astro
│  │  └─ 404.astro / thank-you.astro
│  └─ lib/
│     ├─ analytics.ts   # GA4
│     └─ schema.ts      # JSON-LDユーティリティ
└─ docs/
   └─ structure.md

自動生成（推奨）

依存：tree-cli

package.json に gen:tree を定義し、PRで最新化チェック（Actions任意）。

10. CI/CD（GitHub Pages想定）

GitHub Actions：build → upload-pages-artifact → deploy-pages

きっかけ：main への push / workflow_dispatch

成果物：dist/（Astroビルド）

11. 測定と改善（②×③）

計測イベント（GA4）

view_reserve / submit_reserve / click_line / view_faq / qr_entry

ダッシュボード（月次）

予約数、問い合わせ数、QR流入、記事別CVR、GSC掲載順位、CWV。

改善サイクル

仮説 → 実装 → 検証（ヒーロー見出し、CTA位置、FAQ強化、内部リンク再設計）。

12. マイルストーン

W1：情報設計Fix／ワイヤー（トップ・method・reserve）

W2：デザイン指針／構造化データ雛形／フォーム要件Fix

W3：実装（WP継続 or Astro雛形）／フォーム連携／計測設定

W4：コンテンツ5本投入／速度最適化／QA → 公開

W5–：月次改善（A/B、記事追加、口コミ収集）

13. 受け入れ条件（Definition of Done）

/reserve まで3クリック以内の導線（トップ→reserve 直行も可）。

予約フォーム送信→自動返信メール到達（Gmail/キャリアで確認）。

/faq の構造化データがリッチリザルトで検出。

CWV：LCP ≤ 2.5s（モバイル）、CLS ≤ 0.1、INP ≤ 200ms。

GA4で submit_reserve がイベント計測される。

QR起点のセッションがUTMで識別可能。

14. ライセンス方針

コード：MIT（再利用自由・帰属表示）

文書・画像：CC BY-NC 4.0（非営利・帰属必須）

外部素材（例：将棋駒など）はREADMEに出典明記。

15. ガバナンス／運用体制（①×②×③）

週1本のブログ更新（テンプレ準拠）。

PR運用：feature/hp-xxx → PR → main。1PR=1目的。

公開前チェックリスト：メタ／Hタグ／構造化／速度／OG／リンク切れ。

役割：

運営：コンテンツ決定、写真・事例収集、最終承認。

マーケ：編集・構造化・内部リンク・A/B仮説立案。

開発：実装・計測設定・CI/CD・性能最適化。

付録A：初期ファイル要点

package.json：scripts（dev/build/preview/check/format）、engines（Node ≥ 20.3.0）。

astro.config.mjs：Tailwind（@tailwindcss/vite）＋@astrojs/sitemap。

src/styles/global.css：@import "tailwindcss";

requirements.txt：Pillow / Jinja2 / python-slugify / requests（任意でcairosvg/reportlab/Google API）。

ドキュメント配置：README.md（TL;DR）／/docs/structure.md（自動生成・完全版）／CONTRIBUTING.md（運用ルール）。
