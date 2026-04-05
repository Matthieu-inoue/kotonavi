"use client";

// ============================================================
// ヘルプカード画面（Help Card）
// 自分の情報を周囲に見せるための「名刺」画面です。
// 表示テキストは lib/contents.ts の HELP で管理しています。
// ★ プロフィールの変更は contents.ts の HELP.profile を編集してください ★
// ============================================================

import { useEffect, useState } from "react";
import { logAction, logPageView } from "@/lib/actionLogger";
import { HELP } from "@/lib/contents";

export default function HelpPage() {
  useEffect(() => {
    logPageView("help");
  }, []);

  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isShowingCard, setIsShowingCard] = useState(false);

  return (
    <div className="max-w-xl mx-auto">

      {/* ── ページヘッダー ── */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-5 py-4"
        style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.05)" }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-[#1A1A1A] tracking-tight">{HELP.title}</h1>
            <p className="text-xs text-[#737373] mt-0.5">{HELP.subtitle}</p>
          </div>
          {/* 編集ボタン */}
          <button
            onClick={() => logAction("button_click", "help", "プロフィール編集をタップ")}
            className="touch-target flex items-center gap-1.5 px-3 h-9 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors text-xs text-[#737373] font-medium tracking-wide card-shadow"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            {HELP.editButton}
          </button>
        </div>
      </div>

      <div className="px-5 py-6 space-y-6">

        {/* ── プロフィールカード ── */}
        <div className="bg-white rounded-3xl p-6 card-shadow">
          <div className="flex items-center gap-4 mb-5">
            {/* アバター */}
            <div className="w-16 h-16 rounded-full bg-[#F8FAFA] flex items-center justify-center text-4xl flex-shrink-0">
              {HELP.profile.avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1A1A1A] tracking-tight">{HELP.profile.name}</h2>
              <p className="text-xs text-[#8EC4B8] mt-0.5 tracking-widest font-medium">{HELP.profile.nameReading}</p>
            </div>
          </div>

          {/* メッセージ */}
          <p className="text-sm text-[#737373] leading-relaxed mb-6 pl-4 border-l-2 border-[#8EC4B8] tracking-wide">
            {HELP.profile.message}
          </p>

          {/* このカードを見せるボタン */}
          <button
            onClick={() => {
              logAction("button_click", "help", "ヘルプカードを見せるボタンをタップ");
              setIsShowingCard(true);
            }}
            className="
              w-full bg-[#8EC4B8] text-white font-bold
              py-4 rounded-2xl text-base tracking-wide
              hover:opacity-90 active:scale-95
              transition-all duration-150
              min-h-[56px] sage-shadow
            "
          >
            {HELP.showCardButton}
          </button>
        </div>

        {/* ── クイックフレーズ ── */}
        <div>
          <h2 className="text-xs font-semibold text-[#B0B8C1] tracking-widest mb-4">
            {HELP.quickPhrasesLabel}
          </h2>
          <div className="grid grid-cols-3 gap-2.5">
            {HELP.quickPhrases.map((item) => (
              <button
                key={item.id}
                onClick={() => logAction("phrase_tap", "help", `クイックフレーズ「${item.phrase}」をタップ`)}
                className="
                  bg-white rounded-3xl
                  p-3 min-h-[72px]
                  flex flex-col items-center justify-center gap-1.5
                  card-shadow
                  hover:card-shadow-hover
                  active:scale-95 transition-all duration-150
                "
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-xs font-medium text-[#1A1A1A] text-center leading-tight tracking-wide">
                  {item.phrase}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── お願いカード一覧 ── */}
        <div>
          <h2 className="text-xs font-semibold text-[#B0B8C1] tracking-widest mb-4">
            {HELP.requestsLabel}
          </h2>
          <div className="space-y-2.5">
            {HELP.requestCards.map((card) => (
              <button
                key={card.id}
                onClick={() => {
                  logAction("request_card_tap", "help", `お願いカード「${card.title}」をタップ`);
                  setSelectedCard(selectedCard === card.id ? null : card.id);
                }}
                className="
                  w-full bg-white rounded-3xl px-5 py-4 text-left
                  min-h-[64px]
                  card-shadow
                  hover:card-shadow-hover
                  active:scale-[0.99]
                  transition-all duration-150
                "
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl flex-shrink-0">{card.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-[#1A1A1A] text-sm tracking-wide">{card.title}</p>
                    {selectedCard === card.id && (
                      <p className="text-xs text-[#737373] mt-2 leading-relaxed tracking-wide">
                        {card.detail}
                      </p>
                    )}
                  </div>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className={`flex-shrink-0 transition-transform duration-150 ${selectedCard === card.id ? "rotate-90" : ""}`}>
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 緊急連絡先 */}
        <div className="bg-white rounded-3xl px-5 py-4 flex items-center gap-3 card-shadow">
          <span className="text-2xl">🆘</span>
          <div>
            <p className="font-semibold text-red-400 text-xs tracking-wide">{HELP.profile.contactLabel}</p>
            <p className="text-sm text-[#1A1A1A] mt-0.5 tracking-wide">{HELP.profile.contact}</p>
          </div>
        </div>

        <div className="h-2" />
      </div>

      {/* ── ヘルプカード表示モーダル（相手に見せる画面） ── */}
      {isShowingCard && (
        <div
          className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-5"
          onClick={() => {
            setIsShowingCard(false);
            logAction("modal_close", "help", "ヘルプカードモーダルを閉じた");
          }}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-sm p-7 card-shadow"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 案内文 */}
            <p className="text-center text-[#B0B8C1] text-xs mb-7 tracking-wide">
              {HELP.modalGreeting}
            </p>

            {/* アバターと名前 */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[#F8FAFA] flex items-center justify-center text-5xl mx-auto mb-3">
                {HELP.profile.avatar}
              </div>
              <h2 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">{HELP.profile.name}</h2>
            </div>

            {/* メッセージ */}
            <div className="bg-[#F8FAFA] rounded-2xl p-5 mb-6">
              <p className="text-[#1A1A1A] text-base leading-relaxed text-center tracking-wide">
                {HELP.profile.message}
              </p>
            </div>

            {/* お願いアイコン一覧 */}
            <div className="grid grid-cols-2 gap-2.5 mb-7">
              {HELP.requestCards.map((card) => (
                <div key={card.id} className="bg-[#F8FAFA] rounded-2xl p-3.5 text-center">
                  <p className="text-2xl mb-1.5">{card.icon}</p>
                  <p className="text-xs font-medium text-[#1A1A1A] tracking-wide">{card.title}</p>
                </div>
              ))}
            </div>

            {/* 閉じるボタン */}
            <button
              onClick={() => {
                setIsShowingCard(false);
                logAction("modal_close", "help", "ヘルプカードモーダルを閉じた");
              }}
              className="w-full bg-[#1A1A1A] text-white font-bold py-4 rounded-2xl min-h-[56px] text-base hover:opacity-80 active:scale-95 transition-all tracking-wide"
            >
              {HELP.closeButton}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
