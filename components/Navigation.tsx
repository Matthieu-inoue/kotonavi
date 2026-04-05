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

// ============================================================
// ナビゲーションの項目リスト
// ここを編集するとメニューの内容が変わります！
// ============================================================
const NAV_ITEMS = [
  {
    // URLのパス（変更しないことを推奨）
    href: "/gallery",
    // メニューに表示されるラベル ← ここを書き換えると表示名が変わります
    label: "ギャラリー",
    // 英語ラベル（アイコン下に表示）← ここを書き換えると英語表示が変わります
    labelEn: "Gallery",
    // 記録用のスクリーン名（変更しないことを推奨）
    screen: "gallery",
    // アイコン（絵文字）← ここを別の絵文字に変えられます
    icon: "🖼️",
  },
  {
    href: "/training",
    label: "トレーニング",
    labelEn: "Training",
    screen: "training",
    icon: "💪",
  },
  {
    href: "/scan",
    label: "スキャン",
    labelEn: "Scan",
    screen: "scan",
    icon: "📷",
    // スキャンボタンは特別なデザインにするためのフラグ
    isMain: true,
  },
  {
    href: "/help",
    label: "ヘルプカード",
    labelEn: "Help",
    screen: "help",
    icon: "🪪",
  },
];

// ============================================================
// Navigation コンポーネント本体
// ============================================================
export default function Navigation() {
  // 現在のURLパスを取得（アクティブなタブの判定に使います）
  const pathname = usePathname();

  // ナビゲーションのリンクをクリックした時の処理
  const handleNavClick = (screen: string, label: string) => {
    logAction("nav_click", screen, `${label}ナビゲーションをタップ`);
  };

  return (
    <>
      {/* =====================================================
          スマホ用：画面下部に固定されるタブバー
          md: 以上の画面幅（768px以上）では非表示になります
          ===================================================== */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
        <div className="flex items-center justify-around h-16 px-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.screen, item.label)}
                className={`
                  flex flex-col items-center justify-center
                  min-w-[48px] min-h-[48px] px-3 py-1
                  rounded-xl transition-all duration-200
                  ${
                    item.isMain
                      ? // スキャンボタン（中央の特別なボタン）のスタイル
                        `bg-orange-500 text-white shadow-lg shadow-orange-200
                         -mt-4 w-16 h-16 rounded-2xl
                         ${isActive ? "bg-orange-600 scale-95" : "hover:bg-orange-600 active:scale-95"}`
                      : // 通常ボタンのスタイル
                        isActive
                        ? "text-sky-600"
                        : "text-gray-400 hover:text-gray-600"
                  }
                `}
              >
                {/* アイコン（絵文字） */}
                <span
                  className={`text-2xl leading-none ${item.isMain ? "text-white" : ""}`}
                >
                  {item.icon}
                </span>
                {/* ラベルテキスト */}
                <span
                  className={`text-xs mt-0.5 font-medium ${item.isMain ? "text-white" : ""}`}
                >
                  {item.label}
                </span>
                {/* アクティブな項目に表示される青い点 */}
                {isActive && !item.isMain && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-sky-500" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* =====================================================
          iPad・PC用：画面左側に固定されるサイドバー
          md: 以上の画面幅（768px以上）のみ表示されます
          ===================================================== */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 flex-col z-50">
        {/* アプリのロゴ・タイトル部分 */}
        <div className="p-6 border-b border-gray-100">
          {/* アプリ名 ← ここを書き換えるとサイドバーのタイトルが変わります */}
          <h1 className="text-2xl font-bold text-gray-900">
            コト<span className="text-sky-500">ナビ</span>
          </h1>
          {/* サブタイトル ← ここを書き換えるとサブタイトルが変わります */}
          <p className="text-sm text-gray-400 mt-1">KOTONAVI</p>
        </div>

        {/* メニュー項目リスト */}
        <div className="flex-1 p-4 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.screen, item.label)}
                className={`
                  flex items-center gap-4
                  min-h-[56px] px-4 py-3
                  rounded-2xl transition-all duration-200
                  ${
                    item.isMain
                      ? // スキャンボタンのスタイル（PC版）
                        `bg-orange-500 text-white shadow-md shadow-orange-200
                         ${isActive ? "bg-orange-600" : "hover:bg-orange-600"}`
                      : // 通常ボタンのスタイル（PC版）
                        isActive
                        ? "bg-sky-50 text-sky-600 font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                {/* アイコン */}
                <span className="text-2xl w-8 text-center">{item.icon}</span>
                {/* ラベル */}
                <span className="text-base font-medium">{item.label}</span>
                {/* アクティブな項目には右端に青いバーを表示 */}
                {isActive && !item.isMain && (
                  <span className="ml-auto w-1.5 h-6 rounded-full bg-sky-500" />
                )}
              </Link>
            );
          })}
        </div>

        {/* サイドバー下部（バージョン情報など） */}
        <div className="p-6 border-t border-gray-100">
          {/* バージョン表示 ← ここを書き換えるとバージョンが変わります */}
          <p className="text-xs text-gray-300 text-center">v0.1.0 プロトタイプ</p>
        </div>
      </nav>
    </>
  );
}
