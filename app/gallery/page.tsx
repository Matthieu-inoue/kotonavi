"use client";

// ============================================================
// ギャラリー画面（Gallery）
// みんなが投稿した「ことば」が流れてくるSNS風の画面です。
// 表示テキストは lib/contents.ts の GALLERY で管理しています。
// ============================================================

import { useEffect } from "react";
import { logAction, logPageView } from "@/lib/actionLogger";
import { GALLERY } from "@/lib/contents";

export default function GalleryPage() {
  useEffect(() => {
    logPageView("gallery");
  }, []);

  return (
    <div className="max-w-xl mx-auto">

      {/* ── ページヘッダー ── */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-5 py-4"
        style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.05)" }}>

        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-bold text-[#1A1A1A] tracking-tight">
              {GALLERY.title}
            </h1>
            <p className="text-xs text-[#737373] mt-0.5">{GALLERY.subtitle}</p>
          </div>
          {/* 通知ボタン */}
          <button
            onClick={() => logAction("button_click", "gallery", "通知ボタンをタップ")}
            className="touch-target w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors"
            aria-label="通知"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="#B0B8C1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
        </div>

        {/* ── ストーリーエリア ── */}
        <div className="flex gap-4 overflow-x-auto pb-1">
          {/* 自分の投稿ボタン */}
          <button
            onClick={() => logAction("button_click", "gallery", "新規投稿ボタンをタップ")}
            className="flex-shrink-0 flex flex-col items-center gap-1.5"
          >
            <div className="w-14 h-14 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="#B0B8C1" strokeWidth="2" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <span className="text-[10px] text-[#B0B8C1] w-14 text-center truncate">
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
              <div className="w-14 h-14 rounded-full border-2 border-[#8EC4B8] p-0.5">
                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-xl">
                  {post.avatar}
                </div>
              </div>
              <span className="text-[10px] text-[#737373] w-14 text-center truncate">
                {post.author.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── 投稿カードリスト ── */}
      <div className="px-5 py-4 space-y-5">
        {GALLERY.posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-3xl p-6 card-shadow"
          >
            {/* 投稿者情報 */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg flex-shrink-0">
                {post.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-[#1A1A1A]">{post.author}</p>
                <p className="text-xs text-[#737373] mt-0.5">{post.time}</p>
              </div>
              <button
                onClick={() => logAction("button_click", "gallery", `${post.author}の投稿メニューをタップ`)}
                className="touch-target w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-50"
                aria-label="メニュー"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="#B0B8C1" strokeWidth="2" strokeLinecap="round">
                  <circle cx="5" cy="12" r="1.5" fill="#B0B8C1" />
                  <circle cx="12" cy="12" r="1.5" fill="#B0B8C1" />
                  <circle cx="19" cy="12" r="1.5" fill="#B0B8C1" />
                </svg>
              </button>
            </div>

            {/* ことばカード（メインコンテンツ） */}
            <div className="bg-[#F8FAFA] rounded-2xl px-6 py-8 mb-5 text-center">
              <p className="text-4xl font-bold text-[#1A1A1A] mb-2 tracking-wide">
                {post.word}
              </p>
              <p className="text-sm text-[#8EC4B8] font-medium tracking-widest">
                {post.reading}
              </p>
            </div>

            {/* 説明文 */}
            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              {post.description}
            </p>

            {/* タグ */}
            <div className="flex gap-2 flex-wrap mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs text-[#8EC4B8] font-medium tracking-wide">
                  #{tag}
                </span>
              ))}
            </div>

            {/* アクションボタン */}
            <div className="flex items-center gap-5 pt-4 border-t border-gray-100/80">
              {/* いいね */}
              <button
                onClick={() => logAction("like_click", "gallery", `投稿${post.id}にいいね`)}
                className="touch-target flex items-center gap-1.5 text-[#B0B8C1] hover:text-red-400 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span className="text-sm">{post.likes}</span>
              </button>

              {/* シェア */}
              <button
                onClick={() => logAction("share_click", "gallery", `投稿${post.id}をシェア`)}
                className="touch-target flex items-center gap-1.5 text-[#B0B8C1] hover:text-[#737373] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </button>

              {/* ブックマーク（右端） */}
              <button
                onClick={() => logAction("bookmark_click", "gallery", `投稿${post.id}をブックマーク`)}
                className="touch-target w-9 h-9 flex items-center justify-center ml-auto text-[#B0B8C1] hover:text-[#8EC4B8] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="h-6" />
    </div>
  );
}
