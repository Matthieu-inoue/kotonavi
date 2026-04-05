"use client";

// ============================================================
// Navigation コンポーネント
// スマホ：画面下部の「タブバー」（Instagram風）
// iPad/PC：画面左側の「サイドバー」
// 画面幅によって自動で切り替わります（768px が境界）。
// ============================================================

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Zap, Camera, User } from "lucide-react";
import { logAction } from "@/lib/actionLogger";
import { APP, NAV } from "@/constants/text";

// ============================================================
// ブランドカラー定数
// ACCENT を変えると全ナビのアクセント色が変わります
// ============================================================
const ACCENT   = "#064E3B"; // Midnight Emerald（選択状態のアイコン/テキスト）
const INACTIVE = "#94A3B8"; // 非選択状態のアイコン/テキスト（スレートグレー）

// ============================================================
// SVG アイコンコンポーネント（Lucide React 使用）
// strokeWidth={1.25} で細線の上品なスタイルにしています
// ============================================================
const IconGallery  = ({ active }: { active: boolean }) => (
  <LayoutGrid  size={22} strokeWidth={1.25} color={active ? ACCENT : INACTIVE} />
);
const IconTraining = ({ active }: { active: boolean }) => (
  <Zap         size={22} strokeWidth={1.25} color={active ? ACCENT : INACTIVE} />
);
const IconScan     = () => (
  <Camera      size={22} strokeWidth={1.25} color="#ffffff" />
);
const IconHelp     = ({ active }: { active: boolean }) => (
  <User        size={22} strokeWidth={1.25} color={active ? ACCENT : INACTIVE} />
);

// ============================================================
// ナビゲーション項目の定義
// ここを変えるとメニューの内容が変わります
// ============================================================
const NAV_ITEMS = [
  { href: "/gallery",  label: NAV.gallery,  screen: "gallery",  Icon: IconGallery,  isMain: false },
  { href: "/training", label: NAV.training, screen: "training", Icon: IconTraining, isMain: false },
  { href: "/scan",     label: NAV.scan,     screen: "scan",     Icon: IconScan,     isMain: true  },
  { href: "/help",     label: NAV.help,     screen: "help",     Icon: IconHelp,     isMain: false },
];

// ============================================================
// Navigation コンポーネント本体
// ============================================================
export default function Navigation() {
  const pathname = usePathname();

  const handleNavClick = (screen: string, label: string) => {
    logAction("nav_click", screen, `${label}ナビゲーションをタップ`);
  };

  return (
    <>
      {/* ===================================================
          スマホ用タブバー（768px 未満で表示）
          =================================================== */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/96 backdrop-blur-xl border-t border-[#E2E8F0] md:hidden">
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
                  /* スキャンボタン：エメラルドの丸ボタン */
                  <div className={`
                    w-14 h-14 rounded-2xl
                    flex flex-col items-center justify-center gap-0.5
                    bg-[#064E3B] emerald-shadow
                    transition-transform duration-200
                    ${isActive ? "scale-95" : "active:scale-95"}
                  `}>
                    <IconScan />
                    <span className="text-[9px] text-white font-medium leading-none tracking-wider">
                      {item.label}
                    </span>
                  </div>
                ) : (
                  /* 通常タブ */
                  <>
                    <item.Icon active={isActive} />
                    <span className={`
                      text-[10px] mt-1 font-medium tracking-wider
                      ${isActive ? "text-[#064E3B]" : "text-[#94A3B8]"}
                      transition-colors duration-200
                    `}>
                      {item.label}
                    </span>
                    {/* アクティブインジケーター（上部の細い線） */}
                    {isActive && (
                      <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-[#064E3B]" />
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ===================================================
          iPad/PC 用サイドバー（768px 以上で表示）
          =================================================== */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-60 bg-white flex-col z-50"
        style={{ boxShadow: "1px 0 0 #E2E8F0" }}>

        {/* アプリロゴ */}
        <div className="px-7 pt-10 pb-8">
          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
            {APP.name}
          </h1>
          <p className="text-[11px] text-[#94A3B8] mt-1 tracking-[0.15em] font-medium">
            {APP.tagline}
          </p>
        </div>

        {/* メニュー項目 */}
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
                  rounded-2xl transition-all duration-200
                  ${item.isMain
                    ? `bg-[#064E3B] text-white emerald-shadow ${isActive ? "opacity-90" : "hover:opacity-90"}`
                    : isActive
                      ? "bg-[#064E3B]/8 text-[#064E3B]"
                      : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                  }
                `}
              >
                <span className="flex-shrink-0">
                  {item.isMain ? <IconScan /> : <item.Icon active={isActive} />}
                </span>
                <span className={`text-sm font-medium tracking-wide ${item.isMain ? "text-white" : ""}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* バージョン */}
        <div className="px-7 py-6">
          <p className="text-[11px] text-[#CBD5E1] tracking-widest">{APP.version}</p>
        </div>
      </nav>
    </>
  );
}
