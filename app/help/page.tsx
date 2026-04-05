"use client";

// ============================================================
// ヘルプカード画面（Help Card）
// 自分の情報を提示する画面です。
// 周囲に配慮をお願いする「名刺」の土台になります。
// ============================================================

import { useEffect, useState } from "react";
import { logAction, logPageView } from "@/lib/actionLogger";

// ============================================================
// ヘルプカードの個人情報
// ここを書き換えると表示される情報が変わります！
// 実際に使う場合は、ご自身の情報に書き換えてください。
// ============================================================
const PROFILE = {
  // 名前 ← ここを書き換えると名前が変わります
  name: "井上 ○○",
  // よみかた ← ここを書き換えると読み方が変わります
  nameReading: "いのうえ ○○",
  // アバター絵文字 ← ここを変えるとアイコンが変わります（写真機能は将来実装）
  avatar: "🧑",
  // 一言メッセージ ← ここを書き換えると一言が変わります
  message: "うまく話せないことがありますが、ゆっくり話していただけると助かります。",
  // 連絡先（緊急時など）← ここを書き換えると連絡先が変わります
  contact: "緊急連絡先：000-0000-0000",
};

// ============================================================
// お願いカードのリスト
// ここを書き換えるとカードの内容が変わります
// ============================================================
const REQUEST_CARDS = [
  {
    id: "slow",
    icon: "🐢",
    // タイトル ← ここを書き換えると変わります
    title: "ゆっくり話してください",
    // 詳細説明 ← ここを書き換えると変わります
    detail: "一つ一つの言葉を、はっきりゆっくりと話していただけると助かります。",
  },
  {
    id: "repeat",
    icon: "🔁",
    title: "もう一度言ってください",
    detail: "聞き取れなかったときは、もう一度お願いすることがあります。",
  },
  {
    id: "write",
    icon: "✏️",
    title: "書いてください",
    detail: "難しい言葉は、紙やスマホに書いていただけると理解しやすいです。",
  },
  {
    id: "wait",
    icon: "⏰",
    title: "少し待ってください",
    detail: "返事をするのに時間がかかることがあります。焦らず待っていただけると助かります。",
  },
];

// ============================================================
// クイックフレーズ（素早く伝えたいことば）
// ここを書き換えると表示されることばが変わります
// ============================================================
const QUICK_PHRASES = [
  { id: 1, phrase: "ありがとう", emoji: "🙏" },
  { id: 2, phrase: "すみません", emoji: "🙇" },
  { id: 3, phrase: "はい", emoji: "✅" },
  { id: 4, phrase: "いいえ", emoji: "❌" },
  { id: 5, phrase: "助けてください", emoji: "🆘" },
  { id: 6, phrase: "わかりません", emoji: "🤔" },
];

export default function HelpPage() {
  useEffect(() => {
    logPageView("help");
  }, []);

  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isShowingCard, setIsShowingCard] = useState(false);

  return (
    <div className="max-w-xl mx-auto">
      {/* ページヘッダー */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-100 px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            {/* ページタイトル ← ここを書き換えると画面タイトルが変わります */}
            <h1 className="text-lg font-bold text-[#1A1A1A] tracking-tight">ヘルプカード</h1>
            {/* サブタイトル ← ここを書き換えると変わります */}
            <p className="text-xs text-gray-400 mt-0.5">あなたのことを伝えよう</p>
          </div>
          {/* 編集ボタン（将来実装） */}
          <button
            onClick={() => logAction("button_click", "help", "プロフィール編集をタップ")}
            className="touch-target flex items-center gap-1.5 px-3 h-9 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-xs text-gray-500 font-medium"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            編集
          </button>
        </div>
      </div>

      <div className="px-5 py-5 space-y-5">
        {/* ============================================
            プロフィールカード
            グラデーション廃止 → 白カード＋#007AFFアクセント
            ============================================ */}
        <div className="border border-gray-100 rounded-2xl p-5">
          <div className="flex items-center gap-4 mb-4">
            {/* アバター */}
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-4xl flex-shrink-0">
              {PROFILE.avatar}
            </div>
            <div>
              {/* 名前（大きく表示） ← ここを書き換えると名前が変わります */}
              <h2 className="text-xl font-bold text-[#1A1A1A]">{PROFILE.name}</h2>
              {/* 読み方 */}
              <p className="text-xs text-gray-400 mt-0.5">{PROFILE.nameReading}</p>
            </div>
          </div>
          {/* メッセージ */}
          <p className="text-sm text-gray-600 leading-relaxed mb-5 border-l-2 border-[#007AFF] pl-3">
            {PROFILE.message}
          </p>
          {/* ヘルプカードを見せるボタン（大きく目立たせる） */}
          <button
            onClick={() => {
              logAction("button_click", "help", "ヘルプカードを見せるボタンをタップ");
              setIsShowingCard(true);
            }}
            className="
              w-full bg-[#007AFF] text-white font-bold
              py-4 rounded-xl text-base
              hover:opacity-90 active:scale-95
              transition-all duration-150
              min-h-[56px]
            "
          >
            このカードを見せる
          </button>
        </div>

        {/* ============================================
            クイックフレーズ
            ============================================ */}
        {/* ← ここを書き換えるとセクションタイトルが変わります */}
        <h2 className="text-sm font-semibold text-gray-400 tracking-wide">
          QUICK PHRASES
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {QUICK_PHRASES.map((item) => (
            <button
              key={item.id}
              onClick={() => logAction("phrase_tap", "help", `クイックフレーズ「${item.phrase}」をタップ`)}
              className="
                border border-gray-100 rounded-xl
                p-3 min-h-[64px]
                flex flex-col items-center justify-center gap-1
                hover:border-[#007AFF] hover:bg-blue-50/30
                active:scale-95 transition-all duration-150
              "
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-xs font-medium text-[#1A1A1A] text-center leading-tight">
                {item.phrase}
              </span>
            </button>
          ))}
        </div>

        {/* ============================================
            お願いカード一覧
            カラフル背景を廃止 → 白カード＋薄いボーダーに統一
            ============================================ */}
        {/* ← ここを書き換えるとセクションタイトルが変わります */}
        <h2 className="text-sm font-semibold text-gray-400 tracking-wide">
          REQUESTS
        </h2>

        <div className="space-y-2">
          {REQUEST_CARDS.map((card) => (
            <button
              key={card.id}
              onClick={() => {
                logAction("request_card_tap", "help", `お願いカード「${card.title}」をタップ`);
                setSelectedCard(selectedCard === card.id ? null : card.id);
              }}
              className="
                w-full border border-gray-100 rounded-xl px-4 py-4 text-left
                min-h-[60px]
                hover:border-gray-200 hover:bg-gray-50/50
                active:scale-[0.99]
                transition-all duration-150
              "
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl flex-shrink-0">{card.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-[#1A1A1A] text-sm">{card.title}</p>
                  {/* タップで詳細が開閉します */}
                  {selectedCard === card.id && (
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
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

        {/* 緊急連絡先（赤アクセントのみ残す） */}
        <div className="border border-red-100 rounded-xl px-4 py-3 flex items-center gap-3">
          <span className="text-2xl">🆘</span>
          <div>
            {/* ← ここを書き換えると緊急連絡先が変わります */}
            <p className="font-semibold text-red-600 text-xs">緊急連絡先</p>
            <p className="text-sm text-[#1A1A1A]">{PROFILE.contact}</p>
          </div>
        </div>

        <div className="h-2" />
      </div>

      {/* ============================================
          ヘルプカード表示モーダル（相手に見せる画面）
          ============================================ */}
      {isShowingCard && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-5"
          onClick={() => {
            setIsShowingCard(false);
            logAction("modal_close", "help", "ヘルプカードモーダルを閉じた");
          }}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-sm p-7 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 相手への案内文 */}
            <p className="text-center text-gray-400 text-xs mb-6">
              {/* ← ここを書き換えると案内文が変わります */}
              このカードをお読みいただきありがとうございます
            </p>

            {/* アバターと名前 */}
            <div className="text-center mb-5">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-5xl mx-auto mb-3">
                {PROFILE.avatar}
              </div>
              <h2 className="text-2xl font-bold text-[#1A1A1A]">{PROFILE.name}</h2>
            </div>

            {/* メッセージ（大きな文字で） */}
            <div className="border border-gray-100 rounded-xl p-4 mb-5">
              <p className="text-[#1A1A1A] text-base leading-relaxed text-center">
                {PROFILE.message}
              </p>
            </div>

            {/* お願いアイコン一覧（シンプルなグリッド） */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {REQUEST_CARDS.map((card) => (
                <div key={card.id} className="border border-gray-100 rounded-xl p-3 text-center">
                  <p className="text-2xl mb-1">{card.icon}</p>
                  <p className="text-xs font-medium text-[#1A1A1A]">{card.title}</p>
                </div>
              ))}
            </div>

            {/* 閉じるボタン */}
            <button
              onClick={() => {
                setIsShowingCard(false);
                logAction("modal_close", "help", "ヘルプカードモーダルを閉じた");
              }}
              className="w-full bg-[#1A1A1A] text-white font-bold py-4 rounded-xl min-h-[56px] text-base hover:opacity-80 active:scale-95 transition-all"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
