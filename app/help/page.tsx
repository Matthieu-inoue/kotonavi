"use client";

// ============================================================
// ヘルプカード画面（Help Card）
// 自分の情報を周囲に見せるための「名刺」画面です。
//
// ★ プロフィールの変更は constants/text.ts の HELP.profile を
//   書き換えるだけでできます ★
// ============================================================

import { useEffect, useState } from "react";
import { Pencil, ChevronRight } from "lucide-react";
import { logAction, logPageView } from "@/lib/actionLogger";
import { HELP } from "@/constants/text";

export default function HelpPage() {
  useEffect(() => {
    logPageView("help");
  }, []);

  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isShowingCard, setIsShowingCard] = useState(false);

  return (
    <div className="max-w-xl mx-auto">

      {/* ── ページヘッダー ── */}
      <div className="sticky top-0 z-10 bg-white/96 backdrop-blur-xl px-6 py-5 header-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">{HELP.title}</h1>
            <p className="text-xs text-[#94A3B8] mt-0.5 tracking-wide">{HELP.subtitle}</p>
          </div>
          {/* 編集ボタン */}
          <button
            onClick={() => logAction("button_click", "help", "プロフィール編集をタップ")}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#F8FAFC] rounded-2xl hover:bg-[#F1F5F9] transition-colors text-xs text-[#64748B] font-medium tracking-wide card-shadow"
          >
            <Pencil size={12} strokeWidth={1.5} color="#64748B" />
            {HELP.editButton}
          </button>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">

        {/* ── プロフィールカード ── */}
        <div className="bg-white rounded-2xl p-7 card-shadow">
          <div className="flex items-center gap-5 mb-6">
            {/* アバター */}
            <div className="w-18 h-18 w-[72px] h-[72px] rounded-full bg-[#F8FAFC] flex items-center justify-center text-4xl flex-shrink-0">
              {HELP.profile.avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">{HELP.profile.name}</h2>
              <p className="text-xs text-[#064E3B] mt-1 tracking-[0.12em] font-medium">{HELP.profile.nameReading}</p>
            </div>
          </div>

          {/* メッセージ */}
          <div className="pl-5 border-l-2 border-[#064E3B]/30 mb-7">
            <p className="text-sm text-[#64748B] leading-7 tracking-wide">
              {HELP.profile.message}
            </p>
          </div>

          {/* このカードを見せるボタン */}
          <button
            onClick={() => {
              logAction("button_click", "help", "ヘルプカードを見せるボタンをタップ");
              setIsShowingCard(true);
            }}
            className="
              w-full bg-[#064E3B] text-white font-bold
              py-4 rounded-xl text-sm tracking-wide
              hover:opacity-90 active:scale-[0.98]
              transition-all duration-150
              min-h-[56px] emerald-shadow
            "
          >
            {HELP.showCardButton}
          </button>
        </div>

        {/* ── クイックフレーズ ── */}
        <div>
          <h2 className="text-[10px] font-semibold text-[#94A3B8] tracking-[0.18em] mb-5">
            {HELP.quickPhrasesLabel}
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {HELP.quickPhrases.map((item) => (
              <button
                key={item.id}
                onClick={() => logAction("phrase_tap", "help", `クイックフレーズ「${item.phrase}」をタップ`)}
                className="
                  bg-white rounded-2xl
                  p-4 min-h-[72px]
                  flex flex-col items-center justify-center gap-2
                  card-shadow hover:card-shadow-lg
                  active:scale-[0.97] transition-all duration-150
                "
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-xs font-medium text-[#0F172A] text-center leading-tight tracking-wide">
                  {item.phrase}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── お願いカード一覧 ── */}
        <div>
          <h2 className="text-[10px] font-semibold text-[#94A3B8] tracking-[0.18em] mb-5">
            {HELP.requestsLabel}
          </h2>
          <div className="space-y-3">
            {HELP.requestCards.map((card) => (
              <button
                key={card.id}
                onClick={() => {
                  logAction("request_card_tap", "help", `お願いカード「${card.title}」をタップ`);
                  setSelectedCard(selectedCard === card.id ? null : card.id);
                }}
                className="
                  w-full bg-white rounded-2xl px-5 py-4.5 py-[18px] text-left
                  min-h-[64px]
                  card-shadow hover:card-shadow-lg
                  active:scale-[0.99]
                  transition-all duration-150
                "
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl flex-shrink-0">{card.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-[#0F172A] text-sm tracking-wide">{card.title}</p>
                    {selectedCard === card.id && (
                      <p className="text-xs text-[#64748B] mt-2 leading-6 tracking-wide">
                        {card.detail}
                      </p>
                    )}
                  </div>
                  <ChevronRight
                    size={16} strokeWidth={1.5} color="#CBD5E1"
                    className={`flex-shrink-0 transition-transform duration-150 ${selectedCard === card.id ? "rotate-90" : ""}`}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 緊急連絡先 */}
        <div className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4 card-shadow border border-red-50">
          <span className="text-2xl">🆘</span>
          <div>
            <p className="font-semibold text-red-400 text-[11px] tracking-[0.1em]">{HELP.profile.contactLabel}</p>
            <p className="text-sm text-[#0F172A] mt-0.5 tracking-wide">{HELP.profile.contact}</p>
          </div>
        </div>

        <div className="h-2" />
      </div>

      {/* ── ヘルプカード表示モーダル（相手に見せる画面） ── */}
      {isShowingCard && (
        <div
          className="fixed inset-0 bg-[#0F172A]/25 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => {
            setIsShowingCard(false);
            logAction("modal_close", "help", "ヘルプカードモーダルを閉じた");
          }}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-sm p-8 card-shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 案内文 */}
            <p className="text-center text-[#94A3B8] text-xs mb-8 tracking-wide leading-6">
              {HELP.modalGreeting}
            </p>

            {/* アバターと名前 */}
            <div className="text-center mb-7">
              <div className="w-20 h-20 rounded-full bg-[#F8FAFC] flex items-center justify-center text-5xl mx-auto mb-4">
                {HELP.profile.avatar}
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">{HELP.profile.name}</h2>
            </div>

            {/* メッセージ */}
            <div className="bg-[#F8FAFC] rounded-2xl p-5 mb-7">
              <p className="text-[#0F172A] text-base leading-8 text-center tracking-wide">
                {HELP.profile.message}
              </p>
            </div>

            {/* お願いアイコン一覧 */}
            <div className="grid grid-cols-2 gap-2.5 mb-8">
              {HELP.requestCards.map((card) => (
                <div key={card.id} className="bg-[#F8FAFC] rounded-2xl p-4 text-center">
                  <p className="text-2xl mb-2">{card.icon}</p>
                  <p className="text-xs font-medium text-[#0F172A] tracking-wide leading-tight">{card.title}</p>
                </div>
              ))}
            </div>

            {/* 閉じるボタン */}
            <button
              onClick={() => {
                setIsShowingCard(false);
                logAction("modal_close", "help", "ヘルプカードモーダルを閉じた");
              }}
              className="w-full bg-[#0F172A] text-white font-bold py-4 rounded-xl min-h-[56px] text-sm hover:opacity-80 active:scale-[0.98] transition-all tracking-wide"
            >
              {HELP.closeButton}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
