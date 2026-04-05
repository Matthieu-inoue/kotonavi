// ============================================================
// ルートレイアウト（Root Layout）
// アプリ全体の「外枠」です。
// ここに書いた内容はすべてのページに共通で表示されます。
// ============================================================

import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

// ============================================================
// フォント設定（Noto Sans JP）
// 日本語に最適なGoogleフォントを読み込みます
// ============================================================
const noto = Noto_Sans_JP({
  // 使用するウェイト（太さ）の指定
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// ============================================================
// メタデータ（ブラウザのタブやSNSシェア時に表示される情報）
// ここを書き換えるとブラウザのタブの文字が変わります
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
      {/* noto.className でNoto Sans JPフォントを全体に適用 */}
      <body className={`${noto.className} bg-white text-[#1A1A1A]`}>
        {/* ナビゲーションバー（スマホ：下部、PC：左側） */}
        <Navigation />

        {/* メインコンテンツエリア */}
        {/* スマホ：下部タブバー分の余白を追加 */}
        {/* PC：左サイドバー分の余白を追加 */}
        <main className="min-h-screen pb-24 md:pb-0 md:pl-60">
          {children}
        </main>
      </body>
    </html>
  );
}
