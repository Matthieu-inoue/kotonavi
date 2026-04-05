"use client";

// ============================================================
// スキャン画面（Scan）
// カメラで物を認識するメインアクション機能の画面です。
// 表示テキストは lib/contents.ts の SCAN で管理しています。
// ============================================================

import { useEffect, useState } from "react";
import { logAction, logPageView } from "@/lib/actionLogger";
import { SCAN } from "@/lib/contents";

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
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-5 py-4"
        style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.05)" }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-[#1A1A1A] tracking-tight">{SCAN.title}</h1>
            <p className="text-xs text-[#737373] mt-0.5">{SCAN.subtitle}</p>
          </div>
          <button
            onClick={() => logAction("button_click", "scan", "使い方ボタンをタップ")}
            className="touch-target w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="#B0B8C1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── メインスキャンエリア ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-10 gap-7">

        {/* ビューファインダー枠 */}
        <div className="relative w-full max-w-xs aspect-square">
          {/* メイン枠（影のみ、枠線なし） */}
          <div className="absolute inset-0 rounded-3xl bg-[#F8FAFA] flex items-center justify-center overflow-hidden card-shadow">

            {/* スキャン中アニメーション */}
            {isScanning && (
              <div className="absolute inset-0">
                <div
                  className="absolute left-0 right-0 h-px bg-[#8EC4B8] opacity-70"
                  style={{ animation: "scanline 1.5s ease-in-out infinite" }}
                />
              </div>
            )}

            {/* コンテンツエリア */}
            <div className="text-center p-8">
              {!isScanning && !showResult && (
                <>
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none"
                    stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    className="mx-auto mb-4">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5l2-3h7l2 3H21a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <p className="text-[#B0B8C1] text-sm tracking-wide">{SCAN.placeholder}</p>
                  <p className="text-[#D1D5DB] text-xs mt-1 tracking-wide">{SCAN.placeholderSub}</p>
                </>
              )}

              {isScanning && (
                <>
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none"
                    stroke="#8EC4B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    className="mx-auto mb-4 animate-pulse">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <p className="text-[#8EC4B8] text-sm font-medium animate-pulse tracking-wide">
                    {SCAN.scanning}
                  </p>
                </>
              )}

              {showResult && (
                <div>
                  <p className="text-6xl mb-3">🍎</p>
                  <p className="text-3xl font-bold text-[#1A1A1A] mb-1.5 tracking-wide">りんご</p>
                  <p className="text-[#B0B8C1] text-sm tracking-widest">Apple</p>
                  <p className="text-xs text-[#8EC4B8] mt-2.5 font-medium tracking-wide">
                    {SCAN.recognized}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 四隅のコーナーマーカー */}
          {["top-0 left-0 border-t-2 border-l-2 rounded-tl-3xl",
            "top-0 right-0 border-t-2 border-r-2 rounded-tr-3xl",
            "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-3xl",
            "bottom-0 right-0 border-b-2 border-r-2 rounded-br-3xl",
          ].map((cls, i) => (
            <div key={i} className={`absolute w-7 h-7 border-[#8EC4B8] opacity-60 ${cls}`} />
          ))}
        </div>

        {/* メインスキャンボタン */}
        <button
          onClick={showResult
            ? () => { setShowResult(false); logAction("scan_reset", "scan", "スキャンリセット"); }
            : handleScan
          }
          disabled={isScanning}
          className={`
            w-24 h-24 rounded-full
            flex flex-col items-center justify-center gap-1.5
            text-white font-medium text-xs tracking-wide
            transition-all duration-200
            ${isScanning
              ? "bg-gray-200 cursor-not-allowed"
              : showResult
                ? "bg-[#34C759] hover:opacity-90 active:scale-95"
                : "bg-[#8EC4B8] hover:opacity-90 active:scale-95 sage-shadow"
            }
          `}
          aria-label={showResult ? "もう一度スキャン" : "スキャン開始"}
          style={isScanning || showResult ? undefined : { boxShadow: "0 4px 20px rgba(142,196,184,0.45)" }}
        >
          {isScanning ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="1.75" strokeLinecap="round" className="animate-spin">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          ) : showResult ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5l2-3h7l2 3H21a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          )}
          <span>
            {isScanning ? SCAN.buttonScanning : showResult ? SCAN.buttonRetry : SCAN.buttonScan}
          </span>
        </button>

        {/* 操作ヒント */}
        <p className="text-xs text-[#B0B8C1] text-center tracking-wide">
          {isScanning ? SCAN.hintScanning : showResult ? SCAN.hintResult : SCAN.hintDefault}
        </p>

        {/* スキャン結果後のアクション */}
        {showResult && (
          <div className="flex gap-3 w-full max-w-xs">
            <button
              onClick={() => logAction("button_click", "scan", "ギャラリーに投稿をタップ")}
              className="flex-1 bg-[#8EC4B8] text-white font-semibold py-3.5 rounded-2xl min-h-[48px] text-sm hover:opacity-90 active:scale-95 transition-all tracking-wide sage-shadow"
            >
              {SCAN.postButton}
            </button>
            <button
              onClick={() => logAction("button_click", "scan", "練習に追加をタップ")}
              className="flex-1 bg-gray-50 text-[#737373] font-semibold py-3.5 rounded-2xl min-h-[48px] text-sm hover:bg-gray-100 active:scale-95 transition-all tracking-wide card-shadow"
            >
              {SCAN.addButton}
            </button>
          </div>
        )}
      </div>

      {/* ── 使い方ガイド ── */}
      <div className="px-5 pb-6">
        <h2 className="text-xs font-semibold text-[#B0B8C1] tracking-widest mb-4">
          {SCAN.howToLabel}
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {SCAN.howTo.map((step) => (
            <div key={step.step} className="bg-white rounded-3xl p-4 text-center card-shadow">
              <div className="w-6 h-6 rounded-full bg-[#8EC4B8] text-white text-xs flex items-center justify-center mx-auto mb-2.5 font-bold">
                {step.step}
              </div>
              <p className="text-xs font-semibold text-[#1A1A1A] tracking-wide">{step.title}</p>
              <p className="text-[10px] text-[#737373] mt-1 leading-tight tracking-wide">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
