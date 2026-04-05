"use client";

// ============================================================
// Navigation.tsx — ナビゲーションコンポーネント
//
// スマホ（768px 未満）: 画面下部に「タブバー」を表示
// PC / タブレット (768px 以上): 画面左側に「サイドバー」を表示
//
// デザインのコンセプト: Instagram・X (旧Twitter) のような
// 「線を引かず、色の差だけで空間を分ける」ミニマルナビ
// ============================================================

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Zap, Camera, User } from "lucide-react";
import { logAction } from "@/lib/actionLogger";
import { APP, NAV } from "@/constants/appText";

// ── アイコンのストロークウェイト ──────────────────────────
// 細くするほど「知的・上品」な印象になります
// 太くするほど「力強い・見やすい」印象になります
const STROKE = 1.2;

// ── アイコンカラー ────────────────────────────────────────
// ACTIVE  : 選択中のタブのアイコン色（tailwind.config.ts の primary）
// INACTIVE: 非選択タブのアイコン色（薄いグレー）
const ACTIVE_COLOR   = "#006D77"; // ← tailwind.config.ts の primary と同じ値
const INACTIVE_COLOR = "#94A3B8";

// ── SVG アイコンコンポーネント ────────────────────────────
// Lucide React のアイコンを細い線（STROKE）で描画します

// ギャラリーアイコン（4つのマス）
const IconGallery  = ({ active }: { active: boolean }) => (
  <LayoutGrid size={22} strokeWidth={STROKE} color={active ? ACTIVE_COLOR : INACTIVE_COLOR} />
);

// トレーニングアイコン（稲妻）
const IconTraining = ({ active }: { active: boolean }) => (
  <Zap size={22} strokeWidth={STROKE} color={active ? ACTIVE_COLOR : INACTIVE_COLOR} />
);

// スキャンアイコン（カメラ）— 常に白（濃い背景の上に置くため）
const IconScan = () => (
  <Camera size={22} strokeWidth={STROKE} color="#ffffff" />
);

// ヘルプカードアイコン（人物シルエット）
const IconHelp = ({ active }: { active: boolean }) => (
  <User size={22} strokeWidth={STROKE} color={active ? ACTIVE_COLOR : INACTIVE_COLOR} />
);

// ── ナビゲーション項目の定義 ──────────────────────────────
// ここを変えるとメニューの内容・ページリンクが変わります
const NAV_ITEMS = [
  { href: "/gallery",  label: NAV.gallery,  screen: "gallery",  Icon: IconGallery,  isMain: false },
  { href: "/training", label: NAV.training, screen: "training", Icon: IconTraining, isMain: false },
  { href: "/scan",     label: NAV.scan,     screen: "scan",     Icon: IconScan,     isMain: true  },
  { href: "/help",     label: NAV.help,     screen: "help",     Icon: IconHelp,     isMain: false },
];

// ── ナビゲーションコンポーネント本体 ─────────────────────
export default function Navigation() {
  // 現在開いているページのパスを取得します
  const pathname = usePathname();

  // ナビゲーションをタップしたときの記録（ログ）
  const handleNavClick = (screen: string, label: string) => {
    logAction("nav_click", screen, `${label}ナビゲーションをタップ`);
  };

  return (
    <>
      {/* =================================================
          スマホ用タブバー（画面幅 768px 未満で表示）
          Instagram / X 風：アイコン + 小さなラベル
          ================================================= */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl md:hidden"
        style={{ boxShadow: "0 -1px 0 rgba(0,0,0,0.05)" }}
        // 線を引かずに「影」だけで上の境界を表現しています
      >
        <div className="flex items-center justify-around h-16 px-2 pb-safe">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.screen, item.label)}
                className={`
                  relative flex flex-col items-center justify-center
                  min-w-[56px] min-h-[56px] px-3
                  transition-all duration-200
                  ${item.isMain ? "-mt-6" : ""}
                `}
              >
                {item.isMain ? (
                  /* スキャンボタン: メインアクション用の目立つ丸ボタン */
                  <div className={`
                    w-14 h-14 rounded-[20px]
                    flex flex-col items-center justify-center gap-0.5
                    bg-primary primary-shadow
                    transition-transform duration-200
                    ${isActive ? "scale-95" : "active:scale-95"}
                  `}>
                    <IconScan />
                    <span className="text-[9px] text-white font-medium leading-none tracking-wider">
                      {item.label}
                    </span>
                  </div>
                ) : (
                  /* 通常タブ: アイコン + ラベル */
                  <>
                    <item.Icon active={isActive} />
                    <span className={`
                      text-[10px] mt-1 font-medium tracking-wider
                      transition-colors duration-200
                      ${isActive ? "text-primary" : "text-muted"}
                    `}>
                      {item.label}
                    </span>
                    {/* アクティブ時のインジケーター（上部の細い点） */}
                    {isActive && (
                      <span className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-primary" />
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* =================================================
          PC / タブレット用サイドバー（768px 以上で表示）
          ================================================= */}
      <nav
        className="hidden md:flex fixed left-0 top-0 bottom-0 w-60 bg-white flex-col z-50"
        style={{ boxShadow: "1px 0 0 rgba(0,0,0,0.05)" }}
        // 右端の線も「影」で表現し、強い境界線を使わないデザイン
      >
        {/* アプリロゴ */}
        <div className="px-7 pt-10 pb-8">
          <h1 className="text-xl font-bold text-ink tracking-tight">
            {APP.name}
          </h1>
          <p className="text-[11px] text-muted mt-1 tracking-[0.15em] font-medium">
            {APP.tagline}
          </p>
        </div>

        {/* メニュー項目一覧 */}
        <div className="flex-1 px-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.screen, item.label)}
                className={`
                  flex items-center gap-3.5
                  min-h-[52px] px-4 py-3
                  rounded-[20px] transition-all duration-200
                  ${item.isMain
                    // スキャン: 常にプライマリカラーで目立たせる
                    ? `bg-primary text-white primary-shadow ${isActive ? "opacity-90" : "hover:opacity-90"}`
                    // 通常: 選択時は薄いプライマリ背景、非選択時はグレー
                    : isActive
                      ? "bg-primary/8 text-primary"
                      : "text-[#64748B] hover:bg-surface hover:text-ink"
                  }
                `}
              >
                {/* アイコン */}
                <span className="flex-shrink-0">
                  {item.isMain ? <IconScan /> : <item.Icon active={isActive} />}
                </span>
                {/* ラベル */}
                <span className={`text-sm font-medium tracking-wide ${item.isMain ? "text-white" : ""}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* バージョン表示 */}
        <div className="px-7 py-6">
          <p className="text-[11px] text-muted/60 tracking-widest">{APP.version}</p>
        </div>
      </nav>
    </>
  );
}
