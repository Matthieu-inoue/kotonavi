// ============================================================
// ルートレイアウト（Root Layout）
// アプリ全体の「外枠」です。
// ここに書いた内容はすべてのページに共通で適用されます。
// ============================================================

import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

// ============================================================
// フォント設定
// Inter：欧文（アルファベット・数字）に使用
// Noto Sans JP：日本語に使用
// ============================================================

// Inter — モダンで可読性の高い欧文フォント
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Noto Sans JP — 日本語に最適化されたGoogleフォント
const noto = Noto_Sans_JP({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
});

// ============================================================
// メタデータ（ブラウザのタブやSNSシェア時に表示される情報）
// ここを書き換えるとタブの文字やシェア時の説明が変わります
// ============================================================
export const metadata: Metadata = {
  title: "コトナビ | KOTONAVI",
  description: "ことばのナビゲーター - あなたのコミュニケーションをサポートします",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      {/*
        フォントを body に適用します。
        Inter（欧文）→ Noto Sans JP（日本語）の順で読み込まれます。
      */}
      <body className={`${inter.variable} ${noto.variable} bg-white`}
        style={{ fontFamily: "var(--font-inter), var(--font-noto), sans-serif" }}>
        {/* ナビゲーションバー（スマホ：下部タブ、PC：左サイドバー） */}
        <Navigation />

        {/* メインコンテンツ */}
        {/* スマホ：タブバー分の下余白 / PC：サイドバー分の左余白 */}
        <main className="min-h-screen pb-24 md:pb-0 md:pl-60">
          {children}
        </main>
      </body>
    </html>
  );
}
