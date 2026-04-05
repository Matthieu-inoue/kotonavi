"use client";

// ============================================================
// スキャン画面（Scan）
// カメラで物を認識するメインアクション機能の土台です。
// 中央に大きなボタンを配置し、直感的に使えるUIにします。
// ============================================================

import { useEffect, useState } from "react";
import { logAction, logPageView } from "@/lib/actionLogger";

// ============================================================
// スキャンの使い方ガイド
// ここを書き換えると使い方の説明が変わります
// ============================================================
const HOW_TO_USE = [
  {
    step: 1,
    icon: "📷",
    // 手順のタイトル ← ここを書き換えると変わります
    title: "カメラを向ける",
    // 手順の説明 ← ここを書き換えると変わります
    description: "読みたいものや、名前を知りたいものにカメラを向けます",
  },
  {
    step: 2,
    icon: "🔍",
    title: "ボタンを押す",
    description: "大きなオレンジのボタンを押してスキャンします",
  },
  {
    step: 3,
    icon: "💬",
    title: "ことばが出てくる",
    description: "見つけたことばや名前が大きく表示されます",
  },
];

// ============================================================
// 最近スキャンしたアイテム（サンプルデータ）
// 将来は自動保存されたデータが表示されます
// ============================================================
const RECENT_SCANS = [
  {
    id: 1,
    // スキャンしたもの ← 将来は自動入力されます
    label: "りんご",
    // 読み方
    reading: "Apple",
    // スキャンした時刻
    time: "10分前",
    emoji: "🍎",
  },
  {
    id: 2,
    label: "電車",
    reading: "Train",
    time: "1時間前",
    emoji: "🚃",
  },
  {
    id: 3,
    label: "病院",
    reading: "Hospital",
    time: "昨日",
    emoji: "🏥",
  },
];

export default function ScanPage() {
  // ページが表示されたときにログを記録します
  useEffect(() => {
    logPageView("scan");
  }, []);

  // スキャン中の状態管理
  const [isScanning, setIsScanning] = useState(false);
  // スキャン結果の表示状態
  const [showResult, setShowResult] = useState(false);

  // スキャンボタンを押した時の処理
  const handleScan = () => {
    logAction("scan_start", "scan", "スキャンボタンをタップ");
    setIsScanning(true);

    // 2秒後にデモ結果を表示（将来はカメラ・AI処理に置き換えます）
    setTimeout(() => {
      setIsScanning(false);
      setShowResult(true);
      logAction("scan_complete", "scan", "スキャン完了（デモ）");
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto min-h-screen flex flex-col">
      {/* ページヘッダー */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            {/* ページタイトル ← ここを書き換えると画面タイトルが変わります */}
            <h1 className="text-xl font-bold text-gray-900">スキャン</h1>
            {/* サブタイトル ← ここを書き換えると変わります */}
            <p className="text-xs text-gray-400">カメラでことばを見つけよう</p>
          </div>
          {/* 使い方ヘルプボタン */}
          <button
            onClick={() => logAction("button_click", "scan", "使い方ボタンをタップ")}
            className="touch-target flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100 transition-colors"
          >
            <span className="text-2xl">❓</span>
          </button>
        </div>
      </div>

      {/* メインスキャンエリア */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-8">
        {/* カメラビューファインダー風の枠 */}
        <div className="relative w-full max-w-sm aspect-square">
          {/* 枠線デザイン */}
          <div className="absolute inset-0 rounded-3xl bg-gray-900/5 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
            {/* スキャン中のアニメーション */}
            {isScanning && (
              <div className="absolute inset-0 flex flex-col">
                {/* スキャンライン */}
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-[scanline_1.5s_ease-in-out_infinite]" />
              </div>
            )}

            {/* プレースホルダーコンテンツ */}
            <div className="text-center p-8">
              {!isScanning && !showResult && (
                <>
                  <p className="text-7xl mb-4">📷</p>
                  {/* ← ここを書き換えると案内文が変わります */}
                  <p className="text-gray-400 text-sm font-medium">
                    カメラがここに表示されます
                  </p>
                  <p className="text-gray-300 text-xs mt-1">
                    下のボタンを押して試してみよう
                  </p>
                </>
              )}

              {isScanning && (
                <>
                  <p className="text-7xl mb-4 animate-pulse">🔍</p>
                  {/* ← ここを書き換えると処理中メッセージが変わります */}
                  <p className="text-orange-500 text-sm font-bold animate-pulse">
                    スキャン中...
                  </p>
                </>
              )}

              {showResult && (
                <div className="animate-[fadeIn_0.5s_ease-out]">
                  <p className="text-7xl mb-3">🍎</p>
                  {/* スキャン結果（将来はAIが返す内容になります） */}
                  <p className="text-4xl font-bold text-gray-900 mb-1">
                    りんご
                  </p>
                  <p className="text-gray-400 text-sm">Apple</p>
                  <p className="text-xs text-emerald-500 mt-2 font-medium">
                    ✅ 認識しました！
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 四隅の装飾 */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-4 border-l-4 border-orange-400 rounded-tl-xl" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-4 border-r-4 border-orange-400 rounded-tr-xl" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-4 border-l-4 border-orange-400 rounded-bl-xl" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-4 border-r-4 border-orange-400 rounded-br-xl" />
        </div>

        {/* メインスキャンボタン（大きく・押しやすく） */}
        <button
          onClick={showResult ? () => { setShowResult(false); logAction("scan_reset", "scan", "スキャンリセット"); } : handleScan}
          disabled={isScanning}
          className={`
            w-28 h-28 rounded-full
            flex flex-col items-center justify-center gap-1
            text-white font-bold text-base
            shadow-2xl
            transition-all duration-200
            ${isScanning
              ? "bg-gray-400 cursor-not-allowed"
              : showResult
                ? "bg-emerald-500 hover:bg-emerald-600 active:scale-95 shadow-emerald-200"
                : "bg-orange-500 hover:bg-orange-600 active:scale-95 shadow-orange-200"
            }
          `}
          aria-label={showResult ? "もう一度スキャン" : "スキャン開始"}
        >
          <span className="text-4xl">
            {isScanning ? "⏳" : showResult ? "🔄" : "📷"}
          </span>
          <span className="text-xs">
            {isScanning ? "読み取り中" : showResult ? "もう一度" : "スキャン"}
          </span>
        </button>

        {/* 操作ヒント ← ここを書き換えるとヒントが変わります */}
        <p className="text-sm text-gray-400 text-center">
          {isScanning
            ? "カメラが物を認識しています..."
            : showResult
              ? "ことばが見つかりました！ギャラリーに投稿できます"
              : "オレンジのボタンを押してスキャンしてみよう"}
        </p>

        {/* スキャン結果後のアクションボタン */}
        {showResult && (
          <div className="flex gap-3 w-full max-w-xs">
            <button
              onClick={() => logAction("button_click", "scan", "ギャラリーに投稿をタップ")}
              className="flex-1 bg-sky-500 text-white font-bold py-3 rounded-2xl min-h-[48px] text-sm hover:bg-sky-600 active:scale-95 transition-all"
            >
              📤 投稿する
            </button>
            <button
              onClick={() => logAction("button_click", "scan", "練習に追加をタップ")}
              className="flex-1 bg-purple-500 text-white font-bold py-3 rounded-2xl min-h-[48px] text-sm hover:bg-purple-600 active:scale-95 transition-all"
            >
              💪 練習に追加
            </button>
          </div>
        )}
      </div>

      {/* 使い方ガイド */}
      <div className="px-4 pb-4">
        <h2 className="text-sm font-bold text-gray-500 mb-3 px-1">
          {/* ← ここを書き換えるとセクションタイトルが変わります */}
          使い方
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {HOW_TO_USE.map((step) => (
            <div
              key={step.step}
              className="bg-gray-50 rounded-2xl p-3 text-center"
            >
              <p className="text-2xl mb-1">{step.icon}</p>
              <p className="text-xs font-bold text-gray-700">{step.title}</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-tight">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 最近のスキャン履歴 */}
      <div className="px-4 pb-4">
        <h2 className="text-sm font-bold text-gray-500 mb-3 px-1">
          {/* ← ここを書き換えるとセクションタイトルが変わります */}
          最近スキャンしたもの
        </h2>
        <div className="space-y-2">
          {RECENT_SCANS.map((scan) => (
            <button
              key={scan.id}
              onClick={() =>
                logAction("history_click", "scan", `履歴：${scan.label}をタップ`)
              }
              className="w-full flex items-center gap-3 bg-white rounded-2xl p-3 min-h-[56px] hover:bg-gray-50 active:scale-[0.98] transition-all border border-gray-100 text-left"
            >
              <span className="text-3xl">{scan.emoji}</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{scan.label}</p>
                <p className="text-xs text-gray-400">{scan.reading}</p>
              </div>
              <p className="text-xs text-gray-300">{scan.time}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
