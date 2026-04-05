"use client";

// ============================================================
// トレーニング画面（Training）
// 毎日の練習習慣をつくる学習メニューページです。
// 表示テキストは constants/text.ts の TRAINING で管理しています。
// ============================================================

import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { logAction, logPageView } from "@/lib/actionLogger";
import { TRAINING } from "@/constants/text";

export default function TrainingPage() {
  useEffect(() => {
    logPageView("training");
  }, []);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // 連続学習日数（将来はデータから自動取得） ← 数字を変えると変わります
  const streakDays = 5;

  return (
    <div className="max-w-xl mx-auto">

      {/* ── ページヘッダー ── */}
      <div className="sticky top-0 z-10 bg-white/96 backdrop-blur-xl px-6 py-5 header-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              {TRAINING.title}
            </h1>
            <p className="text-xs text-[#94A3B8] mt-0.5 tracking-wide">{TRAINING.subtitle}</p>
          </div>
          {/* 連続学習バッジ */}
          <div className="flex items-center gap-2 border border-[#E2E8F0] px-3.5 py-2 rounded-2xl">
            <Flame size={14} strokeWidth={1.5} color="#F97316" />
            <span className="text-xs font-semibold text-[#0F172A] tracking-wide">
              {streakDays}{TRAINING.streakUnit}
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">

        {/* ── デイリーチャレンジカード ── */}
        <div className="bg-[#064E3B] rounded-2xl p-7 text-white emerald-shadow">
          <p className="text-[10px] font-semibold text-white/50 mb-5 tracking-[0.18em]">
            {TRAINING.dailyChallenge.label}
          </p>
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-3xl font-bold tracking-wide leading-tight">
                {TRAINING.dailyChallenge.word}
              </p>
              <p className="text-white/50 text-sm mt-2 tracking-[0.1em]">
                {TRAINING.dailyChallenge.reading}
              </p>
            </div>
            <span className="text-3xl opacity-70 mt-1">🎯</span>
          </div>

          {/* 場面・ヒント */}
          <div className="bg-white/8 rounded-xl px-4 py-3.5 mb-6 space-y-1.5">
            <p className="text-white/70 text-xs tracking-wide">
              📍 {TRAINING.dailyChallenge.situation}
            </p>
            <p className="text-white/50 text-xs tracking-wide">
              💡 {TRAINING.dailyChallenge.tip}
            </p>
          </div>

          {/* 練習開始ボタン */}
          <button
            onClick={() => {
              logAction("button_click", "training", "デイリーチャレンジ練習開始をタップ");
              setActiveCategory("daily_challenge");
            }}
            className="
              w-full bg-white text-[#064E3B] font-bold
              py-4 rounded-xl text-sm tracking-wide
              hover:bg-white/90 active:scale-[0.98]
              transition-all duration-150
              min-h-[56px]
            "
          >
            {TRAINING.dailyChallenge.buttonLabel}
          </button>
        </div>

        {/* ── カテゴリ一覧 ── */}
        <div>
          <h2 className="text-[10px] font-semibold text-[#94A3B8] tracking-[0.18em] mb-5">
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
                    w-full bg-white rounded-2xl px-5 py-5
                    flex items-center gap-4
                    min-h-[80px]
                    card-shadow hover:card-shadow-lg
                    active:scale-[0.99]
                    transition-all duration-200
                    text-left
                  "
                >
                  {/* アイコン */}
                  <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] flex items-center justify-center text-2xl flex-shrink-0">
                    {category.icon}
                  </div>

                  {/* テキスト */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#0F172A] text-sm tracking-wide">
                      {category.title}
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-0.5 truncate tracking-wide">
                      {category.description}
                    </p>
                    {/* プログレスバー */}
                    <div className="mt-3 flex items-center gap-2.5">
                      <div className="flex-1 bg-[#F1F5F9] rounded-full h-1">
                        <div
                          className="h-1 rounded-full bg-[#064E3B] transition-all duration-700"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-[#CBD5E1] flex-shrink-0 tabular-nums">
                        {category.completed}/{category.total}
                      </span>
                    </div>
                  </div>

                  {/* 矢印 */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
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
            className="fixed inset-0 bg-[#0F172A]/20 backdrop-blur-sm z-50 flex items-end md:items-center justify-center"
            onClick={() => setActiveCategory(null)}
          >
            <div
              className="bg-white rounded-t-3xl md:rounded-2xl w-full max-w-md px-7 pt-8 pb-12 card-shadow"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ドラッグハンドル */}
              <div className="w-10 h-1 bg-[#E2E8F0] rounded-full mx-auto mb-7 md:hidden" />
              <div className="text-center mb-9">
                <p className="text-5xl mb-5">🚧</p>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3 tracking-wide">
                  {TRAINING.comingSoon.title}
                </h3>
                <p className="text-[#64748B] text-sm leading-7 tracking-wide">
                  {TRAINING.comingSoon.body}
                </p>
              </div>
              <button
                onClick={() => {
                  logAction("modal_close", "training", "練習モーダルを閉じた");
                  setActiveCategory(null);
                }}
                className="w-full bg-[#064E3B] text-white font-bold py-4 rounded-xl min-h-[56px] hover:opacity-90 active:scale-[0.98] transition-all text-sm tracking-wide emerald-shadow"
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
