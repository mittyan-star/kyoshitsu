## Project Map (TL;DR)
/src
  ├─ pages/         # ルーティング（/reserve 等）
  ├─ layouts/       # 共通レイアウト
  ├─ components/    # UIコンポーネント
  ├─ content/       # コンテンツ（blog, events）
  └─ lib/           # 分析・JSON-LDなどユーティリティ
/public              # 画像・静的アセット
/docs                # ドキュメント（構造・運用ルール）
→ 詳細は [/docs/structure.md](./docs/structure.md) を参照。

## セットアップ

1. プロジェクトルート（このREADMEがあるディレクトリ）で以下を実行して依存関係と `package-lock.json` を作成します。

   ```bash
   npm install
   ```

2. CIなどでクリーンインストールしたい場合は、同じくプロジェクトルートでロックファイルをコミットした上で `npm ci` を使用してください。

## ベースパス付きリンク (`withBase` ヘルパー)

Astro 本体には Next.js の `withBasePath` のようなビルトイン関数はありませんが、このプロジェクトでは `import.meta.env.BASE_URL` を利用した独自の `withBase` ヘルパーを `src/lib/url.ts` に用意しています。

```ts
import { withBase } from '../lib/url';

const url = withBase('/blog');
```

`href` や画像パスなど、デプロイ先でサブディレクトリ配下に配置される可能性があるリンクを生成する際には、このヘルパーを経由することでベースパスが自動で付与され、GitHub Pages などでも正しく遷移できます。
