"use client";

// ============================================================
// スキャン画面（Scan）
// カメラで物を認識するメインアクション機能の土台です。
// 中央に大きなボタンを配置し、直感的に使えるUIにします。
// ============================================================

import { useEffect, useState } from "react";
import { logAction, logPageView } from "@/lib/actionLogger";

// ============================================================
// 使い方ガイド
// ここを書き換えると使い方の説明が変わります
// ============================================================
const HOW_TO_USE = [
  {
    step: 1,
    // 手順のタイトル ← ここを書き換えると変わります
    title: "カメラを向ける",
    // 手順の説明 ← ここを書き換えると変わります
    description: "読みたいものにカメラを向けます",
  },
  {
    step: 2,
    title: "ボタンを押す",
    description: "青いボタンを押してスキャン",
  },
  {
    step: 3,
    title: "ことばが出る",
    description: "名前や読み方が表示されます",
  },
];

// ============================================================
// 最近スキャンしたアイテム（サンプルデータ）
// 将来は自動保存されたデータが表示されます
// ============================================================
const RECENT_SCANS = [
  { id: 1, label: "りんご", reading: "Apple", time: "10分前", emoji: "🍎" },
  { id: 2, label: "電車", reading: "Train", time: "1時間前", emoji: "🚃" },
  { id: 3, label: "病院", reading: "Hospital", time: "昨日", emoji: "🏥" },
];

export default function ScanPage() {
  useEffect(() => {
    logPageView("scan");
  }, []);

  const [isScanning, setIsScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleScan = () => {
    logAction("scan_start", "scan", "スキャンボタンをタップ");
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setShowResult(true);
      logAction("scan_complete", "scan", "スキャン完了（デモ）");
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto min-h-screen flex flex-col">
      {/* ページヘッダー */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-100 px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            {/* ページタイトル ← ここを書き換えると画面タイトルが変わります */}
            <h1 className="text-lg font-bold text-[#1A1A1A] tracking-tight">スキャン</h1>
            {/* サブタイトル ← ここを書き換えると変わります */}
            <p className="text-xs text-gray-400 mt-0.5">カメラでことばを見つけよう</p>
          </div>
          <button
            onClick={() => logAction("button_click", "scan", "使い方ボタンをタップ")}
            className="touch-target w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="#9CA3AF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* メインスキャンエリア */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-6">
        {/* ビューファインダー枠
            装飾を極力省いた、清潔感のある四角い枠 */}
        <div className="relative w-full max-w-xs aspect-square">
          {/* メイン枠 */}
          <div className="absolute inset-0 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden">
            {/* スキャン中：アニメーションライン */}
            {isScanning && (
              <div className="absolute inset-0">
                <div
                  className="absolute left-0 right-0 h-px bg-[#007AFF] opacity-60"
                  style={{ animation: "scanline 1.5s ease-in-out infinite" }}
                />
              </div>
            )}

            {/* コンテンツエリア */}
            <div className="text-center p-8">
              {!isScanning && !showResult && (
                <>
                  {/* カメラアイコン（SVG） */}
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none"
                    stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    className="mx-auto mb-4">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5l2-3h7l2 3H21a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  {/* ← ここを書き換えると案内文が変わります */}
                  <p className="text-gray-400 text-sm">カメラがここに表示されます</p>
                  <p className="text-gray-300 text-xs mt-1">下のボタンを押して試してみよう</p>
                </>
              )}

              {isScanning && (
                <>
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none"
                    stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    className="mx-auto mb-4 animate-pulse">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  {/* ← ここを書き換えると処理中メッセージが変わります */}
                  <p className="text-[#007AFF] text-sm font-medium animate-pulse">スキャン中...</p>
                </>
              )}

              {showResult && (
                <div>
                  <p className="text-6xl mb-3">🍎</p>
                  {/* スキャン結果（将来はAIが返す内容になります） */}
                  <p className="text-3xl font-bold text-[#1A1A1A] mb-1">りんご</p>
                  <p className="text-gray-400 text-sm">Apple</p>
                  <p className="text-xs text-[#007AFF] mt-2 font-medium">認識しました</p>
                </div>
              )}
            </div>
          </div>

          {/* 四隅のコーナーマーカー（#007AFF、細め） */}
          {["top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl",
            "top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl",
            "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl",
            "bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl",
          ].map((cls, i) => (
            <div key={i} className={`absolute w-6 h-6 border-[#007AFF] ${cls}`} />
          ))}
        </div>

        {/* メインスキャンボタン（大きく・押しやすく）
            オレンジを廃止 → #007AFF（青）に統一 */}
        <button
          onClick={showResult
            ? () => { setShowResult(false); logAction("scan_reset", "scan", "スキャンリセット"); }
            : handleScan
          }
          disabled={isScanning}
          className={`
            w-24 h-24 rounded-full
            flex flex-col items-center justify-center gap-1.5
            text-white font-medium text-xs
            shadow-lg
            transition-all duration-200
            ${isScanning
              ? "bg-gray-200 cursor-not-allowed shadow-none"
              : showResult
                ? "bg-[#34C759] hover:opacity-90 active:scale-95 shadow-green-200"
                : "bg-[#007AFF] hover:opacity-90 active:scale-95 shadow-blue-200"
            }
          `}
          aria-label={showResult ? "もう一度スキャン" : "スキャン開始"}
        >
          {isScanning ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="1.75" strokeLinecap="round" className="animate-spin">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          ) : showResult ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5l2-3h7l2 3H21a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          )}
          <span>
            {isScanning ? "読み取り中" : showResult ? "もう一度" : "スキャン"}
          </span>
        </button>

        {/* 操作ヒント ← ここを書き換えるとヒントが変わります */}
        <p className="text-xs text-gray-400 text-center">
          {isScanning
            ? "認識しています..."
            : showResult
              ? "ことばが見つかりました。投稿または練習に追加できます"
              : "青いボタンを押してスキャンしてみよう"}
        </p>

        {/* スキャン結果後のアクション */}
        {showResult && (
          <div className="flex gap-3 w-full max-w-xs">
            <button
              onClick={() => logAction("button_click", "scan", "ギャラリーに投稿をタップ")}
              className="flex-1 bg-[#007AFF] text-white font-semibold py-3 rounded-xl min-h-[48px] text-sm hover:opacity-90 active:scale-95 transition-all"
            >
              投稿する
            </button>
            <button
              onClick={() => logAction("button_click", "scan", "練習に追加をタップ")}
              className="flex-1 border border-gray-200 text-[#1A1A1A] font-semibold py-3 rounded-xl min-h-[48px] text-sm hover:bg-gray-50 active:scale-95 transition-all"
            >
              練習に追加
            </button>
          </div>
        )}
      </div>

      {/* 使い方ガイド */}
      <div className="px-5 pb-5">
        <h2 className="text-sm font-semibold text-gray-400 tracking-wide mb-3">
          {/* ← ここを書き換えるとセクションタイトルが変わります */}
          HOW TO USE
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {HOW_TO_USE.map((step) => (
            <div key={step.step} className="border border-gray-100 rounded-xl p-3 text-center">
              {/* ステップ番号 */}
              <div className="w-5 h-5 rounded-full bg-[#007AFF] text-white text-xs flex items-center justify-center mx-auto mb-2 font-bold">
                {step.step}
              </div>
              <p className="text-xs font-semibold text-[#1A1A1A]">{step.title}</p>
              <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 最近のスキャン履歴 */}
      <div className="px-5 pb-5">
        <h2 className="text-sm font-semibold text-gray-400 tracking-wide mb-3">
          {/* ← ここを書き換えるとセクションタイトルが変わります */}
          RECENT SCANS
        </h2>
        <div className="space-y-2">
          {RECENT_SCANS.map((scan) => (
            <button
              key={scan.id}
              onClick={() => logAction("history_click", "scan", `履歴：${scan.label}をタップ`)}
              className="w-full flex items-center gap-3 border border-gray-100 rounded-xl px-4 py-3 min-h-[56px] hover:bg-gray-50 active:scale-[0.99] transition-all text-left"
            >
              <span className="text-2xl">{scan.emoji}</span>
              <div className="flex-1">
                <p className="font-semibold text-[#1A1A1A] text-sm">{scan.label}</p>
                <p className="text-xs text-gray-400">{scan.reading}</p>
              </div>
              <p className="text-xs text-gray-300 tabular-nums">{scan.time}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
