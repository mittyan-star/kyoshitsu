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
