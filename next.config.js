/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages用の静的エクスポート設定
  // これによりスマホ・PCどこからでもアクセスできるようになります
  output: "export",

  // GitHub Pages のリポジトリ名に合わせたパス設定
  // リポジトリ名が "kotonavi" の場合 "/kotonavi" になります
  // ← ここのリポジトリ名を変えた場合は、この値も同じ名前に書き換えてください
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",

  // 画像の最適化を無効化（静的エクスポートでは必要な設定）
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
