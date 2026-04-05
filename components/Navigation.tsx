"use client";

// ============================================================
// Navigation コンポーネント
// スマホ：画面下部にボタンが並ぶ「タブバー」
// iPad・PC：画面左側に縦に並ぶ「サイドバー」
// 画面の幅によって自動で切り替わります。
// ============================================================

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logAction } from "@/lib/actionLogger";
import { APP, NAV } from "@/lib/contents";

// ============================================================
// ブランドカラー定数
// ここを変えるとアクセントカラーが全ナビに反映されます
// ============================================================
const ACCENT = "#8EC4B8";       // セージグリーン
const INACTIVE = "#B0B8C1";     // 非アクティブのアイコン色

// ============================================================
// SVGアイコン（細線ストロークタイプ）
// ============================================================

// ギャラリー：4マスのグリッド
const IconGallery = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke={active ? ACCENT : INACTIVE} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
    <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
    <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
    <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
  </svg>
);

// トレーニング：稲妻
const IconTraining = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke={active ? ACCENT : INACTIVE} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z" />
  </svg>
);

// スキャン：カメラ（常に白、背景色が濃いため）
const IconScan = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5l2-3h7l2 3H21a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
);

// ヘルプカード：IDカード
const IconHelp = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke={active ? ACCENT : INACTIVE} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2.5" />
    <circle cx="8.5" cy="12" r="2.5" />
    <path d="M14 10h5" />
    <path d="M14 14h3.5" />
  </svg>
);

// ============================================================
// ナビゲーションの項目リスト
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
      {/* =====================================================
          スマホ用：画面下部タブバー（768px未満で表示）
          ===================================================== */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-100/80 md:hidden">
        <div className="flex items-center justify-around h-16 px-1 pb-safe">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.screen, item.label)}
                className={`
                  relative flex flex-col items-center justify-center
                  min-w-[48px] min-h-[48px] px-3
                  transition-all duration-200
                  ${item.isMain ? "-mt-5" : ""}
                `}
              >
                {item.isMain ? (
                  /* スキャンボタン：セージグリーンの丸ボタン */
                  <div className={`
                    w-14 h-14 rounded-full
                    flex flex-col items-center justify-center gap-0.5
                    bg-[#8EC4B8] sage-shadow
                    transition-transform duration-200
                    ${isActive ? "scale-95" : "active:scale-95"}
                  `}>
                    <IconScan />
                    <span className="text-[9px] text-white font-medium leading-none tracking-wide">
                      {item.label}
                    </span>
                  </div>
                ) : (
                  /* 通常タブボタン */
                  <>
                    <item.Icon active={isActive} />
                    <span className={`
                      text-[10px] mt-0.5 font-medium tracking-wide
                      ${isActive ? "text-[#8EC4B8]" : "text-[#B0B8C1]"}
                    `}>
                      {item.label}
                    </span>
                    {/* アクティブインジケーター（上部の細い線） */}
                    {isActive && (
                      <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full bg-[#8EC4B8]" />
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* =====================================================
          iPad・PC用：左サイドバー（768px以上で表示）
          ===================================================== */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-60 bg-white flex-col z-50"
        style={{ boxShadow: "2px 0 20px rgba(0,0,0,0.04)" }}>
        {/* アプリロゴ */}
        <div className="px-6 pt-8 pb-6">
          <h1 className="text-xl font-bold text-[#1A1A1A] tracking-tight">
            {APP.name}
          </h1>
          <p className="text-xs text-[#B0B8C1] mt-0.5 tracking-widest font-medium">
            {APP.tagline}
          </p>
        </div>

        {/* メニュー項目 */}
        <div className="flex-1 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.screen, item.label)}
                className={`
                  flex items-center gap-3
                  min-h-[48px] px-3 py-2.5
                  rounded-2xl transition-all duration-200
                  ${item.isMain
                    ? `bg-[#8EC4B8] text-white sage-shadow ${isActive ? "opacity-90" : "hover:opacity-90"}`
                    : isActive
                      ? "bg-[#8EC4B8]/10 text-[#8EC4B8]"
                      : "text-[#737373] hover:bg-gray-50/80 hover:text-[#1A1A1A]"
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

        {/* バージョン情報 */}
        <div className="px-6 py-5">
          <p className="text-xs text-[#B0B8C1] tracking-widest">{APP.version}</p>
        </div>
      </nav>
    </>
  );
}
