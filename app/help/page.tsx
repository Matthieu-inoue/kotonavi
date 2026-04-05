"use client";

// ============================================================
// help/page.tsx — ヘルプカード画面
//
// 自分の情報を周囲に見せる「名刺」のような画面です。
// ★ プロフィールの変更は constants/appText.ts の HELP.profile
//   を書き換えるだけでできます ★
// ============================================================

import { useEffect, useState } from "react";
import { Pencil, ChevronRight } from "lucide-react";
import { logAction, logPageView } from "@/lib/actionLogger";
import { HELP } from "@/constants/appText";

export default function HelpPage() {
  useEffect(() => {
    logPageView("help");
  }, []);

  // タップしたお願いカードのIDを管理（選択中は詳細が開く）
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  // ヘルプカード表示モーダルの開閉状態
  const [isShowingCard, setIsShowingCard] = useState(false);

  return (
    <div className="max-w-xl mx-auto">

      {/* ── ページヘッダー ── */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl px-6 py-5 header-line">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-ink tracking-tight">{HELP.title}</h1>
            <p className="text-xs text-muted mt-0.5 tracking-wide">{HELP.subtitle}</p>
          </div>
          {/* 編集ボタン（将来の機能 — 現在はログのみ） */}
          <button
            onClick={() => logAction("button_click", "help", "プロフィール編集をタップ")}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-surface rounded-[20px] hover:bg-[#F1F5F9] transition-colors text-xs text-[#64748B] font-medium tracking-wide"
          >
            <Pencil size={12} strokeWidth={1.5} color="#64748B" />
            {HELP.editButton}
          </button>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">

        {/* ── プロフィールカード ── */}
        {/* 白背景にカード影で浮かせるデザイン */}
        <div className="bg-white rounded-[20px] p-7"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)" }}>

          {/* アバター + 名前 */}
          <div className="flex items-center gap-5 mb-6">
            <div className="w-[72px] h-[72px] rounded-full bg-surface flex items-center justify-center text-4xl flex-shrink-0">
              {HELP.profile.avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold text-ink tracking-tight">{HELP.profile.name}</h2>
              {/* 読み方（プライマリカラーで控えめに） */}
              <p className="text-xs text-primary mt-1 tracking-[0.12em] font-medium">{HELP.profile.nameReading}</p>
            </div>
          </div>

          {/* 一言メッセージ（左にプライマリカラーの縦線でアクセント） */}
          <div className="pl-5 mb-7" style={{ borderLeft: "2px solid rgba(0,109,119,0.25)" }}>
            <p className="text-sm text-[#64748B] leading-7 tracking-wide">
              {HELP.profile.message}
            </p>
          </div>

          {/* このカードを見せるボタン（最も目立つ大きなボタン） */}
          <button
            onClick={() => {
              logAction("button_click", "help", "ヘルプカードを見せるボタンをタップ");
              setIsShowingCard(true);
            }}
            className="w-full bg-primary text-white font-bold py-4 rounded-[16px] text-sm tracking-wide hover:opacity-90 active:scale-[0.98] transition-all duration-150 min-h-[56px] primary-shadow"
          >
            {HELP.showCardButton}
          </button>
        </div>

        {/* ── クイックフレーズ ── */}
        {/* ワンタップですぐ伝えられることば */}
        <div>
          <h2 className="text-[10px] font-semibold text-muted tracking-[0.18em] mb-5">
            {HELP.quickPhrasesLabel}
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {HELP.quickPhrases.map((item) => (
              <button
                key={item.id}
                onClick={() => logAction("phrase_tap", "help", `クイックフレーズ「${item.phrase}」をタップ`)}
                className="bg-white rounded-[20px] p-4 min-h-[72px] flex flex-col items-center justify-center gap-2 active:scale-[0.97] transition-all duration-150"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)" }}
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-xs font-medium text-ink text-center leading-tight tracking-wide">
                  {item.phrase}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── お願いカード一覧 ── */}
        {/* タップすると詳細が開閉するアコーディオン */}
        <div>
          <h2 className="text-[10px] font-semibold text-muted tracking-[0.18em] mb-5">
            {HELP.requestsLabel}
          </h2>
          <div className="space-y-3">
            {HELP.requestCards.map((card) => (
              <button
                key={card.id}
                onClick={() => {
                  logAction("request_card_tap", "help", `お願いカード「${card.title}」をタップ`);
                  // 同じカードをもう一度タップすると閉じます
                  setSelectedCard(selectedCard === card.id ? null : card.id);
                }}
                className="w-full bg-white rounded-[20px] px-5 py-[18px] text-left min-h-[64px] active:scale-[0.99] transition-all duration-150"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)" }}
              >
                <div className="flex items-center gap-4">
                  {/* カードアイコン（絵文字） */}
                  <span className="text-2xl flex-shrink-0">{card.icon}</span>
                  <div className="flex-1">
                    {/* カードタイトル */}
                    <p className="font-semibold text-ink text-sm tracking-wide">{card.title}</p>
                    {/* 選択中のカードだけ詳細を表示 */}
                    {selectedCard === card.id && (
                      <p className="text-xs text-[#64748B] mt-2 leading-6 tracking-wide">
                        {card.detail}
                      </p>
                    )}
                  </div>
                  {/* 矢印アイコン（選択中は90度回転） */}
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
        <div className="bg-white rounded-[20px] px-5 py-4 flex items-center gap-4"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 1px rgba(254,202,202,0.5)" }}>
          {/* 赤い境界線で「緊急」を示します（boxShadow で枠線を表現） */}
          <span className="text-2xl">🆘</span>
          <div>
            <p className="font-semibold text-red-400 text-[11px] tracking-[0.1em]">
              {HELP.profile.contactLabel}
            </p>
            <p className="text-sm text-ink mt-0.5 tracking-wide">{HELP.profile.contact}</p>
          </div>
        </div>

        <div className="h-2" />
      </div>

      {/* ── ヘルプカードモーダル ── */}
      {/* 「このカードを見せる」ボタンを押すと出てくる、相手に見せる画面 */}
      {isShowingCard && (
        <div
          className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => {
            setIsShowingCard(false);
            logAction("modal_close", "help", "ヘルプカードモーダルを閉じた");
          }}
        >
          <div
            className="bg-white rounded-[24px] w-full max-w-sm p-8"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
            onClick={(e) => e.stopPropagation()} // モーダル内タップでは閉じない
          >
            {/* 読んでくれた相手への感謝の一言 */}
            <p className="text-center text-muted text-xs mb-8 tracking-wide leading-6">
              {HELP.modalGreeting}
            </p>

            {/* アバターと名前 */}
            <div className="text-center mb-7">
              <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center text-5xl mx-auto mb-4">
                {HELP.profile.avatar}
              </div>
              <h2 className="text-2xl font-bold text-ink tracking-tight">{HELP.profile.name}</h2>
            </div>

            {/* メッセージ（surface 背景で囲んで目立たせる） */}
            <div className="bg-surface rounded-[20px] p-5 mb-7">
              <p className="text-ink text-base leading-8 text-center tracking-wide">
                {HELP.profile.message}
              </p>
            </div>

            {/* お願いアイコン一覧（2列グリッド） */}
            <div className="grid grid-cols-2 gap-2.5 mb-8">
              {HELP.requestCards.map((card) => (
                <div key={card.id} className="bg-surface rounded-[16px] p-4 text-center">
                  <p className="text-2xl mb-2">{card.icon}</p>
                  <p className="text-xs font-medium text-ink tracking-wide leading-tight">{card.title}</p>
                </div>
              ))}
            </div>

            {/* 閉じるボタン（濃い色で「完了」を示す） */}
            <button
              onClick={() => {
                setIsShowingCard(false);
                logAction("modal_close", "help", "ヘルプカードモーダルを閉じた");
              }}
              className="w-full bg-ink text-white font-bold py-4 rounded-[16px] min-h-[56px] text-sm hover:opacity-80 active:scale-[0.98] transition-all tracking-wide"
            >
              {HELP.closeButton}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
