"use client";

// ============================================================
// training/page.tsx — トレーニング画面
//
// 毎日の練習習慣をつくる学習メニューページです。
// 表示テキストは constants/appText.ts の TRAINING で管理しています。
// ============================================================

import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { logAction, logPageView } from "@/lib/actionLogger";
import { TRAINING } from "@/constants/appText";

export default function TrainingPage() {
  useEffect(() => {
    logPageView("training");
  }, []);

  // カテゴリをタップしたときに「準備中」モーダルを表示するための状態管理
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // 連続学習日数 ← この数字を変えると表示が変わります（将来は自動取得）
  const streakDays = 5;

  return (
    <div className="max-w-xl mx-auto">

      {/* ── ページヘッダー ── */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl px-6 py-5 header-line">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-ink tracking-tight">{TRAINING.title}</h1>
            <p className="text-xs text-muted mt-0.5 tracking-wide">{TRAINING.subtitle}</p>
          </div>
          {/* 連続学習日数バッジ（炎アイコン + 日数） */}
          <div className="flex items-center gap-2 bg-surface px-3.5 py-2 rounded-[20px]">
            <Flame size={14} strokeWidth={1.5} color="#F97316" />
            <span className="text-xs font-semibold text-ink tracking-wide">
              {streakDays}{TRAINING.streakUnit}
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">

        {/* ── TODAY'S WORD カード ── */}
        {/* プライマリカラーの濃い背景で「今日のメインコンテンツ」を強調 */}
        <div className="bg-primary rounded-[20px] p-7 text-white primary-shadow">
          {/* ラベル（小さく・薄く） */}
          <p className="text-[10px] font-semibold text-white/50 mb-5 tracking-[0.18em]">
            {TRAINING.dailyChallenge.label}
          </p>

          {/* 今日のことば（大きく・くっきり） */}
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

          {/* 使う場面とポイント */}
          {/* 半透明の白背景で情報をグルーピング */}
          <div className="rounded-[16px] px-4 py-4 mb-6 space-y-1.5"
            style={{ background: "rgba(255,255,255,0.10)" }}>
            <p className="text-white/70 text-xs tracking-wide">📍 {TRAINING.dailyChallenge.situation}</p>
            <p className="text-white/50 text-xs tracking-wide">💡 {TRAINING.dailyChallenge.tip}</p>
          </div>

          {/* 練習開始ボタン（白背景にプライマリテキスト） */}
          <button
            onClick={() => {
              logAction("button_click", "training", "デイリーチャレンジ練習開始をタップ");
              setActiveCategory("daily_challenge");
            }}
            className="w-full bg-white text-primary font-bold py-4 rounded-[16px] text-sm tracking-wide hover:bg-white/90 active:scale-[0.98] transition-all duration-150 min-h-[56px]"
          >
            {TRAINING.dailyChallenge.buttonLabel}
          </button>
        </div>

        {/* ── カテゴリ一覧 ── */}
        <div>
          {/* セクションラベル（小さく・グレーで） */}
          <h2 className="text-[10px] font-semibold text-muted tracking-[0.18em] mb-5">
            {TRAINING.categoriesLabel}
          </h2>

          <div className="space-y-3">
            {TRAINING.categories.map((category) => {
              // プログレスバーの幅を計算（完了数 ÷ 総数 × 100%）
              const progress = Math.round((category.completed / category.total) * 100);

              return (
                <button
                  key={category.id}
                  onClick={() => {
                    logAction("category_click", "training", `${category.title}カテゴリをタップ`);
                    setActiveCategory(category.id);
                  }}
                  className="w-full bg-white rounded-[20px] px-5 py-5 flex items-center gap-4 min-h-[80px] active:scale-[0.99] transition-all duration-200 text-left"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)" }}
                >
                  {/* カテゴリアイコン */}
                  <div className="w-12 h-12 rounded-[16px] bg-surface flex items-center justify-center text-2xl flex-shrink-0">
                    {category.icon}
                  </div>

                  {/* テキスト情報 */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-ink text-sm tracking-wide">{category.title}</p>
                    <p className="text-xs text-muted mt-0.5 truncate tracking-wide">{category.description}</p>

                    {/* プログレスバー */}
                    <div className="mt-3 flex items-center gap-2.5">
                      {/* バー本体（グレー背景 → プライマリで塗りつぶし） */}
                      <div className="flex-1 bg-surface rounded-full h-1">
                        <div
                          className="h-1 rounded-full bg-primary transition-all duration-700"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      {/* 進捗数値 */}
                      <span className="text-[10px] text-muted flex-shrink-0 tabular-nums">
                        {category.completed}/{category.total}
                      </span>
                    </div>
                  </div>

                  {/* 右向き矢印アイコン */}
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

        {/* 余白 */}
        <div className="h-2" />
      </div>

      {/* ── 準備中モーダル ── */}
      {/* カテゴリをタップしたときに画面下から出てくるポップアップ */}
      {activeCategory && (
        <div
          className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-50 flex items-end md:items-center justify-center"
          onClick={() => setActiveCategory(null)} // 背景タップで閉じる
        >
          <div
            className="bg-white rounded-t-[28px] md:rounded-[24px] w-full max-w-md px-7 pt-8 pb-12"
            style={{ boxShadow: "0 -4px 40px rgba(0,0,0,0.12)" }}
            onClick={(e) => e.stopPropagation()} // モーダル内タップでは閉じない
          >
            {/* ドラッグハンドル（スマホ用） */}
            <div className="w-10 h-1 bg-muted/30 rounded-full mx-auto mb-7 md:hidden" />
            <div className="text-center mb-9">
              <p className="text-5xl mb-5">🚧</p>
              <h3 className="text-xl font-bold text-ink mb-3 tracking-wide">
                {TRAINING.comingSoon.title}
              </h3>
              <p className="text-[#64748B] text-sm leading-7 tracking-wide whitespace-pre-line">
                {TRAINING.comingSoon.body}
              </p>
            </div>
            <button
              onClick={() => {
                logAction("modal_close", "training", "練習モーダルを閉じた");
                setActiveCategory(null);
              }}
              className="w-full bg-primary text-white font-bold py-4 rounded-[16px] min-h-[56px] hover:opacity-90 active:scale-[0.98] transition-all text-sm tracking-wide primary-shadow"
            >
              {TRAINING.comingSoon.button}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
