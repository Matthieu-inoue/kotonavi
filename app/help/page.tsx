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
// 周囲の人にお願いしたいことを書きます
// ここを書き換えるとカードの内容が変わります
// ============================================================
const REQUEST_CARDS = [
  {
    id: "slow",
    icon: "🐢",
    // カードのタイトル ← ここを書き換えると変わります
    title: "ゆっくり話してください",
    // カードの詳細説明 ← ここを書き換えると変わります
    detail: "一つ一つの言葉を、はっきりゆっくりと話していただけると助かります。",
    // カードの背景色
    bg: "bg-blue-50",
    // テキストカラー
    textColor: "text-blue-700",
    // ボーダーカラー
    border: "border-blue-200",
  },
  {
    id: "repeat",
    icon: "🔁",
    title: "もう一度言ってください",
    detail: "聞き取れなかったときは、もう一度お願いすることがあります。",
    bg: "bg-green-50",
    textColor: "text-green-700",
    border: "border-green-200",
  },
  {
    id: "write",
    icon: "✏️",
    title: "書いてください",
    detail: "難しい言葉は、紙やスマホに書いていただけると理解しやすいです。",
    bg: "bg-yellow-50",
    textColor: "text-yellow-700",
    border: "border-yellow-200",
  },
  {
    id: "wait",
    icon: "⏰",
    title: "少し待ってください",
    detail: "返事をするのに時間がかかることがあります。焦らず待っていただけると助かります。",
    bg: "bg-purple-50",
    textColor: "text-purple-700",
    border: "border-purple-200",
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
  // ページが表示されたときにログを記録します
  useEffect(() => {
    logPageView("help");
  }, []);

  // 選択されたカードの表示状態
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  // ヘルプカード表示モードかどうか
  const [isShowingCard, setIsShowingCard] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      {/* ページヘッダー */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            {/* ページタイトル ← ここを書き換えると画面タイトルが変わります */}
            <h1 className="text-xl font-bold text-gray-900">ヘルプカード</h1>
            {/* サブタイトル ← ここを書き換えると変わります */}
            <p className="text-xs text-gray-400">あなたのことを伝えよう</p>
          </div>
          {/* 編集ボタン（将来実装） */}
          <button
            onClick={() => logAction("button_click", "help", "プロフィール編集をタップ")}
            className="touch-target flex items-center gap-1 px-3 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-sm text-gray-600"
          >
            <span>✏️</span>
            <span className="font-medium">編集</span>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* ============================================
            プロフィールカード
            ============================================ */}
        <div className="bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-200">
          <div className="flex items-center gap-4 mb-4">
            {/* アバター */}
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-5xl border-2 border-white/30">
              {PROFILE.avatar}
            </div>
            <div>
              {/* 名前（大きく表示） ← ここを書き換えると名前が変わります */}
              <h2 className="text-2xl font-bold">{PROFILE.name}</h2>
              {/* 読み方 */}
              <p className="text-sky-200 text-sm">{PROFILE.nameReading}</p>
            </div>
          </div>
          {/* メッセージ */}
          <p className="text-sky-100 text-sm leading-relaxed bg-white/10 rounded-2xl p-4">
            {PROFILE.message}
          </p>
          {/* ヘルプカードを見せるボタン（大きく目立たせる） */}
          <button
            onClick={() => {
              logAction("button_click", "help", "ヘルプカードを見せるボタンをタップ");
              setIsShowingCard(true);
            }}
            className="
              w-full mt-4 bg-white text-sky-600 font-bold
              py-4 rounded-2xl text-lg
              hover:bg-sky-50 active:scale-95
              transition-all duration-200
              min-h-[56px]
              shadow-sm
            "
          >
            📋 このカードを見せる
          </button>
        </div>

        {/* ============================================
            クイックフレーズ（素早く伝えたいことば）
            ============================================ */}
        {/* ← ここを書き換えるとセクションタイトルが変わります */}
        <h2 className="text-base font-bold text-gray-700">
          すぐに伝えたいことば
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {QUICK_PHRASES.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                logAction(
                  "phrase_tap",
                  "help",
                  `クイックフレーズ「${item.phrase}」をタップ`
                );
              }}
              className="
                bg-white border border-gray-200 rounded-2xl
                p-3 min-h-[64px]
                flex flex-col items-center justify-center gap-1
                hover:bg-sky-50 hover:border-sky-300
                active:scale-95 transition-all duration-150
              "
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-xs font-semibold text-gray-700 text-center leading-tight">
                {item.phrase}
              </span>
            </button>
          ))}
        </div>

        {/* ============================================
            お願いカード一覧
            ============================================ */}
        {/* ← ここを書き換えるとセクションタイトルが変わります */}
        <h2 className="text-base font-bold text-gray-700">
          周りの人へのお願い
        </h2>

        <div className="space-y-3">
          {REQUEST_CARDS.map((card) => (
            <button
              key={card.id}
              onClick={() => {
                logAction(
                  "request_card_tap",
                  "help",
                  `お願いカード「${card.title}」をタップ`
                );
                setSelectedCard(
                  selectedCard === card.id ? null : card.id
                );
              }}
              className={`
                w-full ${card.bg} border ${card.border}
                rounded-2xl p-4 text-left
                min-h-[64px]
                hover:opacity-90 active:scale-[0.98]
                transition-all duration-200
              `}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{card.icon}</span>
                <div className="flex-1">
                  <p className={`font-bold ${card.textColor} text-base`}>
                    {card.title}
                  </p>
                  {/* タップで詳細が開閉します */}
                  {selectedCard === card.id && (
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {card.detail}
                    </p>
                  )}
                </div>
                <span className="text-gray-300 text-xl">
                  {selectedCard === card.id ? "∧" : "∨"}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* 緊急連絡先 */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
          <span className="text-3xl">🆘</span>
          <div>
            {/* ← ここを書き換えると緊急連絡先が変わります */}
            <p className="font-bold text-red-700 text-sm">緊急連絡先</p>
            <p className="text-red-600 text-sm">{PROFILE.contact}</p>
          </div>
        </div>

        {/* 下部パディング */}
        <div className="h-4" />
      </div>

      {/* ============================================
          ヘルプカード表示モーダル
          相手に見せるための大画面表示
          ============================================ */}
      {isShowingCard && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setIsShowingCard(false);
            logAction("modal_close", "help", "ヘルプカードモーダルを閉じた");
          }}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 相手への案内文 */}
            <p className="text-center text-gray-500 text-sm mb-6 leading-relaxed">
              {/* ← ここを書き換えると案内文が変わります */}
              このカードをお読みいただきありがとうございます。
            </p>

            {/* 大きなアバターと名前 */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-sky-100 flex items-center justify-center text-6xl mx-auto mb-3">
                {PROFILE.avatar}
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                {PROFILE.name}
              </h2>
            </div>

            {/* メッセージ（大きな文字で） */}
            <div className="bg-sky-50 rounded-2xl p-5 mb-6">
              <p className="text-gray-700 text-lg leading-relaxed text-center font-medium">
                {PROFILE.message}
              </p>
            </div>

            {/* お願いアイコン一覧 */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {REQUEST_CARDS.slice(0, 4).map((card) => (
                <div
                  key={card.id}
                  className={`${card.bg} rounded-2xl p-3 text-center`}
                >
                  <p className="text-2xl mb-1">{card.icon}</p>
                  <p className={`text-xs font-bold ${card.textColor}`}>
                    {card.title}
                  </p>
                </div>
              ))}
            </div>

            {/* 閉じるボタン */}
            <button
              onClick={() => {
                setIsShowingCard(false);
                logAction("modal_close", "help", "ヘルプカードモーダルを閉じた");
              }}
              className="w-full bg-gray-800 text-white font-bold py-4 rounded-2xl min-h-[56px] text-lg hover:bg-gray-700 active:scale-95 transition-all"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
