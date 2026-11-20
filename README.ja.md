# Svelte Base

[English](./README.md) | **日本語**

**SvelteKit 3**・**Svelte 5**・**TypeScript**・**microCMS** で作った、ポートフォリオ兼ブログサイトです。
記事はビルド時に microCMS から取得して静的な HTML として書き出すので、表示が速く、サーバーの負担もほとんどありません。

ページ全体は「山登り」をテーマにしています。ふもと（Hero）からスクロールで山頂（Contact）まで登っていき、画面の横の標高計がいまどこにいるかを示します。

## 主な機能

- **ブログの静的生成** – トップページと各記事ページを、ビルド時に microCMS から生成
- **スクロール連動のヒーロー** – 山に寄りながらタイトルが左右に割れ、下から雲が湧いて次のセクションへつながる
- **ローディング** – 黄色い幕が山の稜線の形で上がっていく（初回表示のみ）
- **標高計** – Hero から Contact までのスクロール位置を表示（ワイド画面）
- **Skills の絞り込み** – カテゴリで絞り込み。同じ microCMS を他のフレームワークで作ったデモへのリンク付き
- **お問い合わせフォーム** – [felte](https://felte.dev/) での入力チェック、reCAPTCHA v3、[Nodemailer](https://nodemailer.com/) でのメール送信
- **アクセシビリティ** – キーボード操作できるメニュー、`aria-*` による状態の通知、`prefers-reduced-motion` への対応

## 技術スタック

| 分類             | 使用技術                                                                                       |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| フレームワーク   | [SvelteKit 3](https://svelte.dev/docs/kit) / [Svelte 5](https://svelte.dev/docs/svelte)（Runes） |
| 言語             | [TypeScript 6](https://www.typescriptlang.org/)                                                |
| スタイル         | [Sass](https://sass-lang.com/)（パーシャルに分割）                                             |
| コンテンツ       | [microCMS](https://microcms.io/) + [microcms-js-sdk](https://github.com/microcmsio/microcms-js-sdk) |
| フォーム         | [felte](https://felte.dev/)、[reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3)、[Nodemailer](https://nodemailer.com/) |
| ホスティング     | [Vercel](https://vercel.com/)（[@sveltejs/adapter-vercel](https://svelte.dev/docs/kit/adapter-vercel)） |

## はじめかた

**Node.js 24** が必要です。

```bash
npm install
cp .env.example .env   # 値を入力する
npm run dev
```

<http://localhost:5173> を開きます。

### 環境変数

環境変数は [`src/env.ts`](./src/env.ts) で定義・検証し、`$app/env/private` から読み込みます。

| 名前                      | 必須 | 説明                                                  |
| ------------------------- | ---- | ----------------------------------------------------- |
| `MICROCMS_SERVICE_DOMAIN` | ○    | `xxx.microcms.io` の `xxx` の部分                     |
| `MICROCMS_API_KEY`        | ○    | microCMS の API キー                                  |
| `CONTACT_TO_EMAIL`        | –    | お問い合わせを受け取るメールアドレス                  |
| `SMTP_HOST`               | –    | SMTP ホスト（既定: `smtp.gmail.com`）                 |
| `SMTP_PORT`               | –    | SMTP ポート（既定: `465`）                            |
| `SMTP_USER`               | –    | SMTP ユーザー                                         |
| `SMTP_PASS`               | –    | SMTP パスワード（Gmail ならアプリパスワード）         |
| `RECAPTCHA_SECRET_KEY`    | –    | reCAPTCHA v3 のシークレットキー。未設定なら検証しない |

reCAPTCHA の**サイトキー**は [`src/components/Contact.svelte`](./src/components/Contact.svelte) に書いています。

### microCMS の API スキーマ

エンドポイント `blogs` のリスト形式 API を作成します。

| フィールド ID | 種類                               |
| ------------- | ---------------------------------- |
| `title`       | テキストフィールド                 |
| `content`     | リッチエディタ                     |
| `eyecatch`    | 画像（任意）                       |
| `category`    | コンテンツ参照（`name` フィールド） |

トップページには、カテゴリが `Svelte` の記事を新しい順に 3 件表示します。

## コマンド

| コマンド          | 内容                                 |
| ----------------- | ------------------------------------ |
| `npm run dev`     | 開発サーバーを起動                   |
| `npm run build`   | 本番用にビルド（静的生成）           |
| `npm run preview` | ビルド結果をプレビュー               |
| `npm run check`   | `svelte-check` で型チェック          |

## ディレクトリ構成

```text
src/
├── env.ts                # 環境変数の定義
├── components/           # Loading, Header, Hero, About, Skills, Blog, Contact, Footer, Altimeter
├── lib/                  # microCMS クライアント、reveal アクション、動き・日付の関数（#lib で読み込み）
├── routes/
│   ├── +page.svelte      # トップページ
│   ├── [slug]/           # 記事ページ
│   ├── api/contact/      # お問い合わせの送信 API
│   ├── thanks/ error/    # 送信結果のページ
└── styles/
    ├── style.scss        # エントリーポイント
    ├── abstracts/        # ブレークポイントの mixin
    ├── base/             # デザイントークン、リセット、ユーティリティ
    ├── components/       # ボタン、チップ、見出し
    ├── layout/           # ヘッダー、セクション、フッター
    ├── features/         # ローディング、標高計
    ├── sections/         # トップページの各セクション
    └── pages/            # 記事ページ、送信結果のページ
```

## デプロイ

[`@sveltejs/adapter-vercel`](https://svelte.dev/docs/kit/adapter-vercel) を使い、ランタイムは `nodejs24.x` です（[`vite.config.ts`](./vite.config.ts) で設定）。
Vercel のプロジェクトに環境変数を設定してください。記事の公開と同時にサイトへ反映させるには、microCMS の Webhook から Vercel の Deploy Hook を呼び出します。

## 関連デモ

同じ microCMS のコンテンツを、他のフレームワークでサイトにしたものです。

- [Astro](https://astrobase.vercel.app/)
- [Next.js](https://next-tech-trigger.vercel.app/)
- [Nuxt](https://nuxtbase-gsap.vercel.app/)
