// ============================================================
// layout.tsx — ルートレイアウト
// アプリ全体の「外枠」です。
// ここに書いた内容はすべてのページに共通で適用されます。
// ============================================================

import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

// ── フォント設定 ───────────────────────────────────────────
// Inter     : アルファベット・数字（欧文）用
// Noto Sans JP : 日本語用（Light 300 〜 Bold 700）
// ──────────────────────────────────────────────────────────

// 欧文フォント（Inter） — モダンで可読性が高い
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // CSS変数名（tailwind.config.ts で参照）
  display: "swap",           // フォント読み込み中も文字を表示する設定
});

// 日本語フォント（Noto Sans JP）
const noto = Noto_Sans_JP({
  weight: ["300", "400", "500", "700"], // 細い〜太いの4段階を読み込む
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
});

// ── メタデータ ─────────────────────────────────────────────
// ブラウザのタブや SNS シェア時に表示される情報です。
// ここを変えるとタブのタイトル・説明文が変わります。
// ──────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "コトナビ | KOTONAVI",
  description: "ことばのナビゲーター - あなたのコミュニケーションをサポートします",
};

// ── レイアウト本体 ─────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        // フォント変数を body に適用します
        className={`${inter.variable} ${noto.variable} bg-white font-sans`}
      >
        {/* ナビゲーションバー（スマホ：下部 / PC：左サイドバー） */}
        <Navigation />

        {/* メインコンテンツエリア */}
        {/* スマホ：タブバー分の下余白 / PC：サイドバー分の左余白 */}
        <main className="min-h-screen pb-24 md:pb-0 md:pl-60">
          {children}
        </main>
      </body>
    </html>
  );
}
