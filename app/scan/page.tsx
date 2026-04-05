"use client";

// ============================================================
// スキャン画面（Scan）
// カメラで物を認識するメインアクション機能の画面です。
// 表示テキストは constants/text.ts の SCAN で管理しています。
// ============================================================

import { useEffect, useState } from "react";
import { HelpCircle } from "lucide-react";
import { logAction, logPageView } from "@/lib/actionLogger";
import { SCAN } from "@/constants/text";

export default function ScanPage() {
  useEffect(() => {
    logPageView("scan");
  }, []);

  const [isScanning, setIsScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleScan = () => {
    logAction("scan_start", "scan", "スキャンボタンをタップ");
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setShowResult(true);
      logAction("scan_complete", "scan", "スキャン完了（デモ）");
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto min-h-screen flex flex-col">

      {/* ── ページヘッダー ── */}
      <div className="sticky top-0 z-10 bg-white/96 backdrop-blur-xl px-6 py-5 header-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">{SCAN.title}</h1>
            <p className="text-xs text-[#94A3B8] mt-0.5 tracking-wide">{SCAN.subtitle}</p>
          </div>
          <button
            onClick={() => logAction("button_click", "scan", "使い方ボタンをタップ")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F8FAFC] transition-colors"
          >
            <HelpCircle size={20} strokeWidth={1.25} color="#94A3B8" />
          </button>
        </div>
      </div>

      {/* ── メインスキャンエリア ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-10 gap-8">

        {/* ビューファインダー枠 */}
        <div className="relative w-full max-w-[280px] aspect-square">

          {/* メイン枠（影のみ、枠線なし） */}
          <div className="absolute inset-0 rounded-2xl bg-[#F8FAFC] flex items-center justify-center overflow-hidden card-shadow">
            {/* スキャン中アニメーションライン */}
            {isScanning && (
              <div className="absolute inset-0">
                <div
                  className="absolute left-0 right-0 h-[1px] bg-[#064E3B] opacity-50"
                  style={{ animation: "scanline 1.5s ease-in-out infinite" }}
                />
              </div>
            )}

            {/* コンテンツエリア */}
            <div className="text-center p-8">
              {!isScanning && !showResult && (
                <>
                  <svg width="52" height="52" viewBox="0 0 24 24" fill="none"
                    stroke="#CBD5E1" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
                    className="mx-auto mb-4">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5l2-3h7l2 3H21a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <p className="text-[#94A3B8] text-sm tracking-wide">{SCAN.placeholder}</p>
                  <p className="text-[#CBD5E1] text-xs mt-1.5 tracking-wide">{SCAN.placeholderSub}</p>
                </>
              )}

              {isScanning && (
                <>
                  <svg width="52" height="52" viewBox="0 0 24 24" fill="none"
                    stroke="#064E3B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
                    className="mx-auto mb-4 animate-pulse">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <p className="text-[#064E3B] text-sm font-medium animate-pulse tracking-wide">
                    {SCAN.scanning}
                  </p>
                </>
              )}

              {showResult && (
                <div>
                  <p className="text-6xl mb-4">🍎</p>
                  <p className="text-3xl font-bold text-[#0F172A] mb-1.5 tracking-wide">りんご</p>
                  <p className="text-[#94A3B8] text-sm tracking-[0.1em]">Apple</p>
                  <p className="text-xs text-[#064E3B] mt-3 font-medium tracking-wide">
                    {SCAN.recognized}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 四隅のコーナーマーカー（エメラルド・細線） */}
          {[
            "top-0 left-0 border-t border-l rounded-tl-2xl",
            "top-0 right-0 border-t border-r rounded-tr-2xl",
            "bottom-0 left-0 border-b border-l rounded-bl-2xl",
            "bottom-0 right-0 border-b border-r rounded-br-2xl",
          ].map((cls, i) => (
            <div key={i} className={`absolute w-6 h-6 border-[#064E3B]/40 ${cls}`} />
          ))}
        </div>

        {/* メインスキャンボタン（エメラルドの丸） */}
        <button
          onClick={showResult
            ? () => { setShowResult(false); logAction("scan_reset", "scan", "スキャンリセット"); }
            : handleScan
          }
          disabled={isScanning}
          className={`
            w-24 h-24 rounded-2xl
            flex flex-col items-center justify-center gap-1.5
            text-white font-medium text-xs tracking-wide
            transition-all duration-200
            ${isScanning
              ? "bg-[#E2E8F0] cursor-not-allowed"
              : showResult
                ? "bg-[#059669] hover:opacity-90 active:scale-95"
                : "bg-[#064E3B] hover:opacity-90 active:scale-95 emerald-shadow"
            }
          `}
          aria-label={showResult ? "もう一度スキャン" : "スキャン開始"}
        >
          {isScanning ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
              stroke="#94A3B8" strokeWidth="1.25" strokeLinecap="round" className="animate-spin">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          ) : showResult ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5l2-3h7l2 3H21a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          )}
          <span>
            {isScanning ? SCAN.buttonScanning : showResult ? SCAN.buttonRetry : SCAN.buttonScan}
          </span>
        </button>

        {/* ヒントテキスト */}
        <p className="text-xs text-[#94A3B8] text-center tracking-wide">
          {isScanning ? SCAN.hintScanning : showResult ? SCAN.hintResult : SCAN.hintDefault}
        </p>

        {/* スキャン結果後のアクションボタン */}
        {showResult && (
          <div className="flex gap-3 w-full max-w-[260px]">
            <button
              onClick={() => logAction("button_click", "scan", "ギャラリーに投稿をタップ")}
              className="flex-1 bg-[#064E3B] text-white font-semibold py-4 rounded-xl min-h-[56px] text-sm hover:opacity-90 active:scale-[0.98] transition-all tracking-wide emerald-shadow"
            >
              {SCAN.postButton}
            </button>
            <button
              onClick={() => logAction("button_click", "scan", "練習に追加をタップ")}
              className="flex-1 bg-[#F8FAFC] text-[#64748B] font-semibold py-4 rounded-xl min-h-[56px] text-sm hover:bg-[#F1F5F9] active:scale-[0.98] transition-all tracking-wide card-shadow"
            >
              {SCAN.addButton}
            </button>
          </div>
        )}
      </div>

      {/* ── 使い方ガイド ── */}
      <div className="px-6 pb-8">
        <h2 className="text-[10px] font-semibold text-[#94A3B8] tracking-[0.18em] mb-5">
          {SCAN.howToLabel}
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {SCAN.howTo.map((step) => (
            <div key={step.step} className="bg-white rounded-2xl p-4 text-center card-shadow">
              <div className="w-6 h-6 rounded-full bg-[#064E3B] text-white text-xs flex items-center justify-center mx-auto mb-3 font-bold">
                {step.step}
              </div>
              <p className="text-xs font-semibold text-[#0F172A] tracking-wide">{step.title}</p>
              <p className="text-[10px] text-[#94A3B8] mt-1.5 leading-tight tracking-wide">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
