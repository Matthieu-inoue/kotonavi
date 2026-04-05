"use client";

// ============================================================
// gallery/page.tsx — ギャラリー画面
//
// みんなが投稿した「ことば」を見る、SNS 風の画面です。
// 表示テキストは constants/appText.ts の GALLERY で管理しています。
//
// デザインのコンセプト:
//   白背景（#FFFFFF）に薄グレーのカード（#F8FAFC）を置くことで、
//   線なし・影なしでも情報の階層がわかるデザイン
// ============================================================

import { useEffect } from "react";
import { Bell } from "lucide-react";
import { logAction, logPageView } from "@/lib/actionLogger";
import { GALLERY } from "@/constants/appText";

export default function GalleryPage() {
  useEffect(() => {
    logPageView("gallery");
  }, []);

  return (
    <div className="max-w-xl mx-auto">

      {/* ── ページヘッダー ── */}
      {/* sticky: スクロールしても上部に固定されます */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl px-6 py-5 header-line">
        <div className="flex items-center justify-between mb-5">
          <div>
            {/* 画面タイトル（大きく・太く） */}
            <h1 className="text-xl font-bold text-ink tracking-tight">{GALLERY.title}</h1>
            {/* サブタイトル（薄く・小さく） */}
            <p className="text-xs text-muted mt-0.5 tracking-wide">{GALLERY.subtitle}</p>
          </div>
          {/* 通知ボタン */}
          <button
            onClick={() => logAction("button_click", "gallery", "通知ボタンをタップ")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface transition-colors"
            aria-label="通知"
          >
            <Bell size={20} strokeWidth={1.2} color="#94A3B8" />
          </button>
        </div>

        {/* ── ストーリーエリア（横スクロール） ── */}
        <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-hide">
          {/* 自分のストーリー追加ボタン */}
          <button
            onClick={() => logAction("button_click", "gallery", "新規投稿ボタンをタップ")}
            className="flex-shrink-0 flex flex-col items-center gap-1.5"
          >
            {/* 点線の丸（投稿追加のアイコン） */}
            <div className="w-14 h-14 rounded-full bg-surface flex items-center justify-center"
              style={{ border: "1.5px dashed #CBD5E1" }}>
              <span className="text-muted text-2xl font-light">+</span>
            </div>
            <span className="text-[10px] text-muted w-14 text-center truncate tracking-wide">
              {GALLERY.yourStoryLabel}
            </span>
          </button>

          {/* 他のユーザーのストーリー */}
          {GALLERY.posts.slice(0, 3).map((post) => (
            <button
              key={post.id}
              onClick={() => logAction("story_click", "gallery", `${post.author}のストーリーをタップ`)}
              className="flex-shrink-0 flex flex-col items-center gap-1.5"
            >
              {/* グラデーションリング（ストーリーが未読であることを示す） */}
              <div
                className="w-14 h-14 rounded-full p-[2px]"
                style={{ background: "linear-gradient(135deg, #006D77, #34D399)" }}
              >
                <div className="w-full h-full rounded-full bg-surface flex items-center justify-center text-xl">
                  {post.avatar}
                </div>
              </div>
              <span className="text-[10px] text-[#64748B] w-14 text-center truncate tracking-wide">
                {post.author.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── 投稿カードリスト ── */}
      <div className="px-6 py-6 space-y-5">
        {GALLERY.posts.map((post) => (
          <article key={post.id} className="bg-white rounded-[20px] p-6"
            style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)" }}>

            {/* 投稿者情報（アバター・名前・時刻） */}
            <div className="flex items-center gap-3 mb-6">
              {/* アバター（絵文字） */}
              <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-lg flex-shrink-0">
                {post.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-ink tracking-wide">{post.author}</p>
                <p className="text-xs text-muted mt-0.5">{post.time}</p>
              </div>
              {/* メニューボタン（三点リーダー） */}
              <button
                onClick={() => logAction("button_click", "gallery", `${post.author}の投稿メニューをタップ`)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface transition-colors"
                aria-label="メニュー"
              >
                <span className="text-muted text-lg leading-none tracking-[3px]">···</span>
              </button>
            </div>

            {/* ことばカード（メインコンテンツ） */}
            {/* 背景を surface (#F8FAFC) にすることで、白いカードの中で浮き立ちます */}
            <div className="bg-surface rounded-[20px] px-6 py-10 mb-5 text-center">
              {/* ことば本文（大きく・くっきりと） */}
              <p className="text-5xl font-bold text-ink mb-3 tracking-wide">
                {post.word}
              </p>
              {/* 読み方（プライマリカラーで控えめに） */}
              <p className="text-sm text-primary font-medium tracking-[0.1em]">
                {post.reading}
              </p>
            </div>

            {/* 説明文 */}
            <p className="text-sm text-[#64748B] leading-7 mb-4 tracking-wide">
              {post.description}
            </p>

            {/* タグ */}
            <div className="flex gap-2 flex-wrap mb-5">
              {post.tags.map((tag) => (
                // タグはプライマリカラーのテキストのみ（背景・枠線なし）
                <span key={tag} className="text-xs text-primary font-medium tracking-wide">
                  #{tag}
                </span>
              ))}
            </div>

            {/* アクションボタン（いいね・シェア・ブックマーク） */}
            <div className="flex items-center gap-5 pt-4"
              style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
              {/* いいねボタン */}
              <button
                onClick={() => logAction("like_click", "gallery", `投稿${post.id}にいいね`)}
                className="flex items-center gap-2 text-muted hover:text-red-400 transition-colors min-h-[44px]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span className="text-sm">{post.likes}</span>
              </button>

              {/* シェアボタン */}
              <button
                onClick={() => logAction("share_click", "gallery", `投稿${post.id}をシェア`)}
                className="flex items-center gap-2 text-muted hover:text-[#64748B] transition-colors min-h-[44px]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </button>

              {/* ブックマークボタン（右端に配置） */}
              <button
                onClick={() => logAction("bookmark_click", "gallery", `投稿${post.id}をブックマーク`)}
                className="ml-auto flex items-center justify-center text-muted hover:text-primary transition-colors min-h-[44px] w-10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* 下部の余白 */}
      <div className="h-8" />
    </div>
  );
}
