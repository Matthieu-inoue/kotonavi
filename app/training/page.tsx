"use client";

// ============================================================
// トレーニング画面（Training）
// 毎日の練習習慣を作る学習メニューページです。
// 表示テキストは lib/contents.ts の TRAINING で管理しています。
// ============================================================

import { useEffect, useState } from "react";
import { logAction, logPageView } from "@/lib/actionLogger";
import { TRAINING } from "@/lib/contents";

export default function TrainingPage() {
  useEffect(() => {
    logPageView("training");
  }, []);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // 連続学習日数（将来はデータから取得） ← この数字を変えると変わります
  const streakDays = 5;

  return (
    <div className="max-w-xl mx-auto">

      {/* ── ページヘッダー ── */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-5 py-4"
        style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.05)" }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-[#1A1A1A] tracking-tight">
              {TRAINING.title}
            </h1>
            <p className="text-xs text-[#737373] mt-0.5">{TRAINING.subtitle}</p>
          </div>
          {/* 連続学習バッジ */}
          <div className="flex items-center gap-1.5 border border-gray-100 px-3 py-1.5 rounded-full card-shadow">
            <span className="text-base">🔥</span>
            <span className="text-xs font-semibold text-[#1A1A1A] tracking-wide">
              {streakDays}{TRAINING.streakUnit}
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 py-6 space-y-6">

        {/* ── デイリーチャレンジカード ── */}
        <div className="bg-[#8EC4B8] rounded-3xl p-6 text-white sage-shadow">
          <p className="text-xs font-medium text-white/70 mb-4 tracking-widest">
            {TRAINING.dailyChallenge.label}
          </p>
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-3xl font-bold tracking-wide">
                {TRAINING.dailyChallenge.word}
              </p>
              <p className="text-white/70 text-sm mt-1.5 tracking-wide">
                {TRAINING.dailyChallenge.reading}
              </p>
            </div>
            <span className="text-3xl opacity-80">🎯</span>
          </div>
          <p className="text-white/80 text-xs mb-1.5 tracking-wide">
            📍 {TRAINING.dailyChallenge.situation}
          </p>
          <p className="text-white/60 text-xs mb-6 tracking-wide">
            💡 {TRAINING.dailyChallenge.tip}
          </p>
          <button
            onClick={() => {
              logAction("button_click", "training", "デイリーチャレンジ練習開始をタップ");
              setActiveCategory("daily_challenge");
            }}
            className="
              w-full bg-white text-[#8EC4B8] font-bold
              py-3.5 rounded-2xl text-sm tracking-wide
              hover:bg-white/90 active:scale-95
              transition-all duration-150
              min-h-[48px]
            "
          >
            {TRAINING.dailyChallenge.buttonLabel}
          </button>
        </div>

        {/* ── カテゴリ一覧 ── */}
        <div>
          <h2 className="text-xs font-semibold text-[#B0B8C1] tracking-widest mb-4">
            {TRAINING.categoriesLabel}
          </h2>

          <div className="space-y-3">
            {TRAINING.categories.map((category) => {
              const progress = Math.round((category.completed / category.total) * 100);

              return (
                <button
                  key={category.id}
                  onClick={() => {
                    logAction("category_click", "training", `${category.title}カテゴリをタップ`);
                    setActiveCategory(category.id);
                  }}
                  className="
                    w-full bg-white rounded-3xl px-5 py-5
                    flex items-center gap-4
                    min-h-[80px]
                    card-shadow
                    hover:card-shadow-hover
                    active:scale-[0.99]
                    transition-all duration-200
                    text-left
                  "
                >
                  {/* アイコン */}
                  <div className="w-12 h-12 rounded-2xl bg-[#F8FAFA] flex items-center justify-center text-2xl flex-shrink-0">
                    {category.icon}
                  </div>

                  {/* テキスト情報 */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#1A1A1A] text-sm tracking-wide">
                      {category.title}
                    </p>
                    <p className="text-xs text-[#737373] mt-0.5 truncate tracking-wide">
                      {category.description}
                    </p>
                    {/* プログレスバー */}
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full bg-[#8EC4B8] transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-[#B0B8C1] flex-shrink-0 tabular-nums">
                        {category.completed}/{category.total}
                      </span>
                    </div>
                  </div>

                  {/* 矢印 */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className="flex-shrink-0">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>

        {/* 準備中モーダル */}
        {activeCategory && (
          <div
            className="fixed inset-0 bg-black/20 z-50 flex items-end md:items-center justify-center"
            onClick={() => setActiveCategory(null)}
          >
            <div
              className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md px-6 pt-8 pb-10 card-shadow"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6 md:hidden" />
              <div className="text-center mb-8">
                <p className="text-5xl mb-5">🚧</p>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 tracking-wide">
                  {TRAINING.comingSoon.title}
                </h3>
                <p className="text-[#737373] text-sm leading-relaxed tracking-wide">
                  {TRAINING.comingSoon.body}
                </p>
              </div>
              <button
                onClick={() => {
                  logAction("modal_close", "training", "練習モーダルを閉じた");
                  setActiveCategory(null);
                }}
                className="w-full bg-[#8EC4B8] text-white font-bold py-4 rounded-2xl min-h-[48px] hover:opacity-90 active:scale-95 transition-all text-sm tracking-wide sage-shadow"
              >
                {TRAINING.comingSoon.button}
              </button>
            </div>
          </div>
        )}

        <div className="h-2" />
      </div>
    </div>
  );
}
