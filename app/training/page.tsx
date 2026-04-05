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
    // テーマカラー（Tailwindのグラデーションクラス）
    gradient: "from-yellow-400 to-orange-400",
    // 背景色
    bg: "bg-orange-50",
    // テキストカラー
    textColor: "text-orange-700",
  },
  {
    id: "shopping",
    title: "お店でのことば",
    icon: "🛒",
    description: "コンビニ・スーパーで使えるフレーズ",
    completed: 1,
    total: 8,
    gradient: "from-green-400 to-emerald-500",
    bg: "bg-emerald-50",
    textColor: "text-emerald-700",
  },
  {
    id: "transport",
    title: "電車・バス",
    icon: "🚃",
    description: "交通機関での移動に役立つことば",
    completed: 0,
    total: 6,
    gradient: "from-blue-400 to-sky-500",
    bg: "bg-sky-50",
    textColor: "text-sky-700",
  },
  {
    id: "hospital",
    title: "病院・薬局",
    icon: "🏥",
    description: "医療機関で使う大事なことば",
    completed: 0,
    total: 12,
    gradient: "from-red-400 to-rose-500",
    bg: "bg-rose-50",
    textColor: "text-rose-700",
  },
  {
    id: "feeling",
    title: "気持ちを伝える",
    icon: "💝",
    description: "感情や体調を伝えるフレーズ",
    completed: 5,
    total: 8,
    gradient: "from-pink-400 to-purple-400",
    bg: "bg-purple-50",
    textColor: "text-purple-700",
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
  // ページが表示されたときにログを記録します
  useEffect(() => {
    logPageView("training");
  }, []);

  // 練習開始モーダルの表示状態
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // 連続学習日数（将来はデータから取得）
  const streakDays = 5; // ← この数字を変えると連続日数が変わります

  return (
    <div className="max-w-2xl mx-auto">
      {/* ページヘッダー */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            {/* ページタイトル ← ここを書き換えると画面タイトルが変わります */}
            <h1 className="text-xl font-bold text-gray-900">トレーニング</h1>
            {/* サブタイトル ← ここを書き換えると変わります */}
            <p className="text-xs text-gray-400">毎日少しずつ練習しよう</p>
          </div>
          {/* 連続学習バッジ */}
          <div className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-full">
            <span className="text-lg">🔥</span>
            {/* ← ここの数字が連続学習日数です */}
            <span className="text-sm font-bold text-orange-600">
              {streakDays}日連続
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 今日のデイリーチャレンジカード */}
        <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-5 text-white shadow-lg shadow-sky-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              {/* ← ここを書き換えるとデイリーチャレンジのタイトルが変わります */}
              <p className="text-sky-200 text-xs font-medium mb-1">
                📅 今日の一言
              </p>
              <p className="text-2xl font-bold">{DAILY_CHALLENGE.word}</p>
              <p className="text-sky-200 text-sm mt-0.5">
                {DAILY_CHALLENGE.reading}
              </p>
            </div>
            <span className="text-4xl">🎯</span>
          </div>
          <p className="text-sky-100 text-sm mb-1">
            📍 {DAILY_CHALLENGE.situation}
          </p>
          <p className="text-sky-100 text-xs mb-4">
            💡 {DAILY_CHALLENGE.tip}
          </p>
          {/* 練習開始ボタン */}
          <button
            onClick={() => {
              logAction("button_click", "training", "デイリーチャレンジ練習開始をタップ");
              setActiveCategory("daily_challenge");
            }}
            className="
              w-full bg-white text-sky-600 font-bold
              py-3 rounded-2xl text-base
              hover:bg-sky-50 active:scale-95
              transition-all duration-200
              min-h-[48px]
            "
          >
            練習を始める →
          </button>
        </div>

        {/* 進捗サマリー */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "今日の練習", value: "3", unit: "問", icon: "✅" },
            { label: "総学習数", value: "47", unit: "問", icon: "📚" },
            { label: "達成率", value: "68", unit: "%", icon: "🏆" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-3 text-center border border-gray-100"
            >
              <p className="text-xl mb-1">{stat.icon}</p>
              <p className="text-xl font-bold text-gray-800">
                {stat.value}
                <span className="text-sm text-gray-400">{stat.unit}</span>
              </p>
              {/* ← ここを書き換えると統計ラベルが変わります */}
              <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* カテゴリ一覧 */}
        {/* ← ここのタイトルを書き換えると変わります */}
        <h2 className="text-base font-bold text-gray-700 mt-2">
          練習カテゴリ
        </h2>

        <div className="space-y-3">
          {TRAINING_CATEGORIES.map((category) => {
            // 進捗率を計算（0〜100の数値）
            const progress = Math.round(
              (category.completed / category.total) * 100
            );

            return (
              <button
                key={category.id}
                onClick={() => {
                  logAction(
                    "category_click",
                    "training",
                    `${category.title}カテゴリをタップ`
                  );
                  setActiveCategory(category.id);
                }}
                className={`
                  w-full ${category.bg} rounded-2xl p-4
                  flex items-center gap-4
                  min-h-[80px]
                  hover:opacity-90 active:scale-[0.98]
                  transition-all duration-200
                  text-left
                  border border-transparent hover:border-gray-200
                `}
              >
                {/* アイコン */}
                <div
                  className={`
                    w-14 h-14 rounded-2xl flex items-center justify-center text-3xl
                    bg-gradient-to-br ${category.gradient} shadow-sm flex-shrink-0
                  `}
                >
                  {category.icon}
                </div>

                {/* テキスト情報 */}
                <div className="flex-1 min-w-0">
                  <p className={`font-bold ${category.textColor} text-base`}>
                    {category.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    {category.description}
                  </p>
                  {/* プログレスバー */}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 bg-white/60 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full bg-gradient-to-r ${category.gradient}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {category.completed}/{category.total}
                    </span>
                  </div>
                </div>

                {/* 矢印 */}
                <span className="text-gray-300 text-xl flex-shrink-0">›</span>
              </button>
            );
          })}
        </div>

        {/* 練習開始モーダル（シンプルなプレースホルダー） */}
        {activeCategory && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center"
            onClick={() => setActiveCategory(null)}
          >
            <div
              className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <p className="text-5xl mb-3">🚧</p>
                {/* ← ここを書き換えるとモーダルのメッセージが変わります */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  準備中です
                </h3>
                <p className="text-gray-500 text-sm">
                  この機能は現在開発中です。
                  <br />
                  もうすぐ使えるようになります！
                </p>
              </div>
              <button
                onClick={() => {
                  logAction("modal_close", "training", "練習モーダルを閉じた");
                  setActiveCategory(null);
                }}
                className="w-full bg-sky-500 text-white font-bold py-3 rounded-2xl min-h-[48px] hover:bg-sky-600 active:scale-95 transition-all"
              >
                閉じる
              </button>
            </div>
          </div>
        )}

        {/* 下部パディング */}
        <div className="h-4" />
      </div>
    </div>
  );
}
