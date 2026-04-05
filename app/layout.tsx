// ============================================================
// ルートレイアウト（Root Layout）
// アプリ全体の「外枠」です。
// ここに書いた内容はすべてのページに共通で表示されます。
// ============================================================

import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

// ============================================================
// メタデータ（ブラウザのタブやSNSシェア時に表示される情報）
// ここを書き換えるとブラウザのタブの文字が変わります
// ============================================================
export const metadata: Metadata = {
  // ブラウザのタブに表示されるタイトル ← ここを書き換えると変わります
  title: "コトナビ | KOTONAVI",
  // 検索エンジンやSNSシェア時に表示される説明文 ← ここを書き換えると変わります
  description: "ことばのナビゲーター - あなたのコミュニケーションをサポートします",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-white text-[#1A1A1A]">
        {/* ナビゲーションバー（スマホ：下部、PC：左側） */}
        <Navigation />

        {/* メインコンテンツエリア */}
        {/* スマホ：下部タブバー分の余白(pb-20)を追加 */}
        {/* PC：左サイドバー分の余白(md:pl-60)を追加（サイドバー幅に合わせています） */}
        <main className="min-h-screen pb-24 md:pb-0 md:pl-60">
          {children}
        </main>
      </body>
    </html>
  );
}
