"use client";

// ============================================================
// トレーニング画面（Training）
// Duolingo風の学習メニューページです。
// 毎日のリハビリ習慣を作る練習の土台になります。
// ============================================================

import { useEffect, useState } from "react";
import { logAction, logPageView } from "@/lib/actionLogger";

// ============================================================
// 練習カテゴリのデータ
// ここを書き換えると練習メニューの内容が変わります
// ============================================================
const TRAINING_CATEGORIES = [
  {
    id: "daily",
    // カテゴリ名 ← ここを書き換えると表示名が変わります
    title: "日常会話",
    // 絵文字アイコン ← ここを変えるとアイコンが変わります
    icon: "☀️",
    // 説明文 ← ここを書き換えると説明が変わります
    description: "毎日使う挨拶と基本フレーズ",
    // 完了済み問題数 ← 将来は自動計算になります
    completed: 3,
    // 総問題数 ← ここを変えると総数が変わります
    total: 10,
  },
  {
    id: "shopping",
    title: "お店でのことば",
    icon: "🛒",
    description: "コンビニ・スーパーで使えるフレーズ",
    completed: 1,
    total: 8,
  },
  {
    id: "transport",
    title: "電車・バス",
    icon: "🚃",
    description: "交通機関での移動に役立つことば",
    completed: 0,
    total: 6,
  },
  {
    id: "hospital",
    title: "病院・薬局",
    icon: "🏥",
    description: "医療機関で使う大事なことば",
    completed: 0,
    total: 12,
  },
  {
    id: "feeling",
    title: "気持ちを伝える",
    icon: "💝",
    description: "感情や体調を伝えるフレーズ",
    completed: 5,
    total: 8,
  },
];

// ============================================================
// 今日の一言データ（デイリーチャレンジ）
// ここを書き換えると今日の課題が変わります
// ============================================================
const DAILY_CHALLENGE = {
  // 今日練習することば ← ここを書き換えると変わります
  word: "おはようございます",
  // 読み方
  reading: "おはよう ございます",
  // 使う場面
  situation: "朝、職場や学校で会う人に",
  // ポイント説明
  tip: "笑顔と一緒に使うと、より伝わりやすくなります",
};

export default function TrainingPage() {
  useEffect(() => {
    logPageView("training");
  }, []);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // 連続学習日数（将来はデータから取得）
  const streakDays = 5; // ← この数字を変えると連続日数が変わります

  return (
    <div className="max-w-xl mx-auto">
      {/* ページヘッダー */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-100 px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            {/* ページタイトル ← ここを書き換えると画面タイトルが変わります */}
            <h1 className="text-lg font-bold text-[#1A1A1A] tracking-tight">
              トレーニング
            </h1>
            {/* サブタイトル ← ここを書き換えると変わります */}
            <p className="text-xs text-gray-400 mt-0.5">毎日少しずつ練習しよう</p>
          </div>
          {/* 連続学習バッジ：グレー系でシンプルに */}
          <div className="flex items-center gap-1.5 border border-gray-200 px-3 py-1.5 rounded-full">
            <span className="text-base">🔥</span>
            {/* ← ここの数字が連続学習日数です */}
            <span className="text-xs font-semibold text-[#1A1A1A]">
              {streakDays}日連続
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 py-5 space-y-5">
        {/* ============================================
            デイリーチャレンジカード
            グラデーション廃止 → #007AFF単色 + 白テキスト
            ============================================ */}
        <div className="bg-[#007AFF] rounded-2xl p-5 text-white">
          {/* ラベル ← ここを書き換えるとデイリーチャレンジのタイトルが変わります */}
          <p className="text-xs font-medium text-blue-200 mb-3 tracking-wide">
            TODAY&apos;S WORD
          </p>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-3xl font-bold tracking-wide">
                {DAILY_CHALLENGE.word}
              </p>
              <p className="text-blue-200 text-sm mt-1">
                {DAILY_CHALLENGE.reading}
              </p>
            </div>
            <span className="text-3xl opacity-80">🎯</span>
          </div>
          <p className="text-blue-100 text-xs mb-1">
            📍 {DAILY_CHALLENGE.situation}
          </p>
          <p className="text-blue-100 text-xs mb-5 opacity-80">
            💡 {DAILY_CHALLENGE.tip}
          </p>
          {/* 練習開始ボタン */}
          <button
            onClick={() => {
              logAction("button_click", "training", "デイリーチャレンジ練習開始をタップ");
              setActiveCategory("daily_challenge");
            }}
            className="
              w-full bg-white text-[#007AFF] font-bold
              py-3 rounded-xl text-sm
              hover:bg-blue-50 active:scale-95
              transition-all duration-150
              min-h-[48px]
            "
          >
            練習を始める
          </button>
        </div>

        {/* 進捗サマリー（3つの統計） */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "今日の練習", value: "3", unit: "問" },
            { label: "総学習数", value: "47", unit: "問" },
            { label: "達成率", value: "68", unit: "%" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border border-gray-100 rounded-2xl p-4 text-center"
            >
              <p className="text-2xl font-bold text-[#1A1A1A]">
                {stat.value}
                <span className="text-sm font-normal text-gray-400">{stat.unit}</span>
              </p>
              {/* ← ここを書き換えると統計ラベルが変わります */}
              <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* セクションタイトル ← ここを書き換えると変わります */}
        <h2 className="text-sm font-semibold text-gray-400 tracking-wide pt-1">
          CATEGORIES
        </h2>

        {/* カテゴリ一覧
            カラフル背景を廃止 → 白カード＋薄いボーダーに統一 */}
        <div className="space-y-2">
          {TRAINING_CATEGORIES.map((category) => {
            const progress = Math.round((category.completed / category.total) * 100);

            return (
              <button
                key={category.id}
                onClick={() => {
                  logAction("category_click", "training", `${category.title}カテゴリをタップ`);
                  setActiveCategory(category.id);
                }}
                className="
                  w-full bg-white border border-gray-100 rounded-2xl px-4 py-4
                  flex items-center gap-4
                  min-h-[76px]
                  hover:border-gray-200 hover:bg-gray-50/50
                  active:scale-[0.99]
                  transition-all duration-150
                  text-left
                "
              >
                {/* アイコン枠：グレー系でシンプルに */}
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
                  {category.icon}
                </div>

                {/* テキスト情報 */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#1A1A1A] text-sm">
                    {category.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {category.description}
                  </p>
                  {/* プログレスバー：#007AFF単色 */}
                  <div className="mt-2.5 flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-1">
                      <div
                        className="h-1 rounded-full bg-[#007AFF]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 flex-shrink-0 tabular-nums">
                      {category.completed}/{category.total}
                    </span>
                  </div>
                </div>

                {/* 矢印アイコン */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className="flex-shrink-0">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            );
          })}
        </div>

        {/* 準備中モーダル */}
        {activeCategory && (
          <div
            className="fixed inset-0 bg-black/30 z-50 flex items-end md:items-center justify-center"
            onClick={() => setActiveCategory(null)}
          >
            <div
              className="bg-white rounded-t-3xl md:rounded-2xl w-full max-w-md px-6 pt-8 pb-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ドラッグハンドル（スマホ用） */}
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6 md:hidden" />
              <div className="text-center mb-8">
                <p className="text-5xl mb-4">🚧</p>
                {/* ← ここを書き換えるとモーダルのメッセージが変わります */}
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">準備中です</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  この機能は現在開発中です。<br />もうすぐ使えるようになります！
                </p>
              </div>
              <button
                onClick={() => {
                  logAction("modal_close", "training", "練習モーダルを閉じた");
                  setActiveCategory(null);
                }}
                className="w-full bg-[#007AFF] text-white font-bold py-3.5 rounded-xl min-h-[48px] hover:opacity-90 active:scale-95 transition-all text-sm"
              >
                閉じる
              </button>
            </div>
          </div>
        )}

        <div className="h-2" />
      </div>
    </div>
  );
}
