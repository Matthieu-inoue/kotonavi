"use client";

// ============================================================
// scan/page.tsx — スキャン画面
//
// カメラで物を認識するメインアクション機能の画面です。
// 表示テキストは constants/appText.ts の SCAN で管理しています。
// ============================================================

import { useEffect, useState } from "react";
import { HelpCircle } from "lucide-react";
import { logAction, logPageView } from "@/lib/actionLogger";
import { SCAN } from "@/constants/appText";

export default function ScanPage() {
  useEffect(() => {
    logPageView("scan");
  }, []);

  // スキャン中かどうかを管理します
  const [isScanning, setIsScanning] = useState(false);
  // 結果を表示しているかどうかを管理します
  const [showResult, setShowResult] = useState(false);

  // スキャンボタンを押したときの処理
  const handleScan = () => {
    logAction("scan_start", "scan", "スキャンボタンをタップ");
    setIsScanning(true);
    // 2秒後にスキャン完了（将来はAIの応答に置き換えます）
    setTimeout(() => {
      setIsScanning(false);
      setShowResult(true);
      logAction("scan_complete", "scan", "スキャン完了（デモ）");
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto min-h-screen flex flex-col">

      {/* ── ページヘッダー ── */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl px-6 py-5 header-line">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-ink tracking-tight">{SCAN.title}</h1>
            <p className="text-xs text-muted mt-0.5 tracking-wide">{SCAN.subtitle}</p>
          </div>
          {/* 使い方ボタン */}
          <button
            onClick={() => logAction("button_click", "scan", "使い方ボタンをタップ")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface transition-colors"
          >
            <HelpCircle size={20} strokeWidth={1.2} color="#94A3B8" />
          </button>
        </div>
      </div>

      {/* ── メインスキャンエリア ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-10 gap-8">

        {/* ── ビューファインダー枠 ── */}
        <div className="relative w-full max-w-[280px] aspect-square">

          {/* カメラ枠本体（背景: surface, 枠線なし, 影のみ） */}
          <div
            className="absolute inset-0 rounded-[24px] bg-surface flex items-center justify-center overflow-hidden"
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
          >
            {/* スキャン中: 横線が上から下へ流れるアニメーション */}
            {isScanning && (
              <div className="absolute inset-0">
                <div
                  className="absolute left-0 right-0 h-[1px] bg-primary opacity-60"
                  style={{ animation: "scanline 1.5s ease-in-out infinite" }}
                />
              </div>
            )}

            {/* コンテンツエリア（状態によって表示が変わります） */}
            <div className="text-center p-8">

              {/* 通常状態: カメラアイコン + 案内文 */}
              {!isScanning && !showResult && (
                <>
                  <svg width="52" height="52" viewBox="0 0 24 24" fill="none"
                    stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
                    className="mx-auto mb-4">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5l2-3h7l2 3H21a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <p className="text-muted text-sm tracking-wide">{SCAN.placeholder}</p>
                  <p className="text-muted/60 text-xs mt-1.5 tracking-wide">{SCAN.placeholderSub}</p>
                </>
              )}

              {/* スキャン中: 虫眼鏡アイコン（脈動アニメーション） */}
              {isScanning && (
                <>
                  <svg width="52" height="52" viewBox="0 0 24 24" fill="none"
                    stroke="#006D77" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
                    className="mx-auto mb-4 animate-pulse">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <p className="text-primary text-sm font-medium animate-pulse tracking-wide">
                    {SCAN.scanning}
                  </p>
                </>
              )}

              {/* 認識完了: 結果を表示 */}
              {showResult && (
                <div>
                  <p className="text-6xl mb-4">🍎</p>
                  <p className="text-3xl font-bold text-ink mb-1.5 tracking-wide">りんご</p>
                  <p className="text-muted text-sm tracking-[0.1em]">Apple</p>
                  <p className="text-xs text-primary mt-3 font-medium tracking-wide">{SCAN.recognized}</p>
                </div>
              )}
            </div>
          </div>

          {/* 四隅のコーナーマーカー（フレームを示す装飾） */}
          {[
            "top-0 left-0 border-t border-l rounded-tl-[20px]",
            "top-0 right-0 border-t border-r rounded-tr-[20px]",
            "bottom-0 left-0 border-b border-l rounded-bl-[20px]",
            "bottom-0 right-0 border-b border-r rounded-br-[20px]",
          ].map((cls, i) => (
            // プライマリカラーの薄い線でコーナーを表現
            <div key={i} className={`absolute w-6 h-6 border-primary/30 ${cls}`} />
          ))}
        </div>

        {/* ── メインスキャンボタン ── */}
        {/* 状態によってボタンの見た目と動作が変わります */}
        <button
          onClick={showResult
            ? () => { setShowResult(false); logAction("scan_reset", "scan", "スキャンリセット"); }
            : handleScan
          }
          disabled={isScanning}
          className={`
            w-24 h-24 rounded-[20px]
            flex flex-col items-center justify-center gap-1.5
            text-white font-medium text-xs tracking-wide
            transition-all duration-200
            ${isScanning
              // スキャン中: 操作不可・グレー
              ? "bg-surface cursor-not-allowed"
              : showResult
                // 認識完了: 緑（もう一度）
                ? "bg-[#059669] hover:opacity-90 active:scale-95"
                // 通常: プライマリカラー
                : "bg-primary hover:opacity-90 active:scale-95 primary-shadow"
            }
          `}
          aria-label={showResult ? "もう一度スキャン" : "スキャン開始"}
        >
          {/* スキャン中: 回転するローディングアイコン */}
          {isScanning ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
              stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" className="animate-spin">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          ) : showResult ? (
            // 認識完了: リセット（やり直し）アイコン
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
            </svg>
          ) : (
            // 通常: カメラアイコン
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5l2-3h7l2 3H21a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          )}
          {/* ボタンのラベルテキスト */}
          <span>
            {isScanning ? SCAN.buttonScanning : showResult ? SCAN.buttonRetry : SCAN.buttonScan}
          </span>
        </button>

        {/* ヒントテキスト（ボタンの下の小さな説明） */}
        <p className="text-xs text-muted text-center tracking-wide">
          {isScanning ? SCAN.hintScanning : showResult ? SCAN.hintResult : SCAN.hintDefault}
        </p>

        {/* 認識完了後のアクションボタン（投稿 / 練習追加） */}
        {showResult && (
          <div className="flex gap-3 w-full max-w-[260px]">
            {/* 投稿ボタン（メインアクション: プライマリカラー） */}
            <button
              onClick={() => logAction("button_click", "scan", "ギャラリーに投稿をタップ")}
              className="flex-1 bg-primary text-white font-semibold py-4 rounded-[16px] min-h-[56px] text-sm hover:opacity-90 active:scale-[0.98] transition-all tracking-wide primary-shadow"
            >
              {SCAN.postButton}
            </button>
            {/* 練習追加ボタン（サブアクション: surface背景） */}
            <button
              onClick={() => logAction("button_click", "scan", "練習に追加をタップ")}
              className="flex-1 bg-surface text-[#64748B] font-semibold py-4 rounded-[16px] min-h-[56px] text-sm hover:bg-[#F1F5F9] active:scale-[0.98] transition-all tracking-wide"
            >
              {SCAN.addButton}
            </button>
          </div>
        )}
      </div>

      {/* ── 使い方ガイド ── */}
      <div className="px-6 pb-8">
        <h2 className="text-[10px] font-semibold text-muted tracking-[0.18em] mb-5">
          {SCAN.howToLabel}
        </h2>
        {/* 3ステップを横並びで表示 */}
        <div className="grid grid-cols-3 gap-3">
          {SCAN.howTo.map((step) => (
            <div key={step.step}
              className="bg-white rounded-[20px] p-4 text-center"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)" }}>
              {/* ステップ番号の丸（プライマリカラー） */}
              <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center mx-auto mb-3 font-bold">
                {step.step}
              </div>
              <p className="text-xs font-semibold text-ink tracking-wide">{step.title}</p>
              <p className="text-[10px] text-muted mt-1.5 leading-tight tracking-wide">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
