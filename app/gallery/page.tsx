"use client";

// ============================================================
// ギャラリー画面（Gallery）
// Instagram風の投稿一覧ページです。
// みんなが見つけた「ことば」が流れてくるSNSの土台になります。
// ============================================================

import { useEffect } from "react";
import { logAction, logPageView } from "@/lib/actionLogger";

// ============================================================
// 仮のデータ（プレースホルダー）
// 将来はサーバーやデータベースから取得する部分です。
// ============================================================
const SAMPLE_POSTS = [
  {
    id: 1,
    // 投稿者の名前 ← ここを書き換えると名前が変わります
    author: "田中 花子",
    // 投稿者のアバター絵文字 ← ここを画像URLに変えられます
    avatar: "👩",
    // 投稿されたことば ← ここが本文です
    word: "ありがとう",
    // ことばの読み方
    reading: "ありがとう",
    // 使った場面・説明
    description: "コンビニでお釣りをもらったとき、笑顔でこう言えました！",
    // 投稿日時 ← 将来は自動取得になります
    time: "2分前",
    // いいね数
    likes: 12,
    // コメント数
    comments: 3,
    // タグ
    tags: ["日常", "感謝"],
  },
  {
    id: 2,
    author: "山田 太郎",
    avatar: "👨",
    word: "すみません",
    reading: "すみません",
    description: "道を聞くときに使いました。相手がとても親切に教えてくれました。",
    time: "15分前",
    likes: 8,
    comments: 1,
    tags: ["外出", "挨拶"],
  },
  {
    id: 3,
    author: "鈴木 さくら",
    avatar: "👩‍🦰",
    word: "おいしい",
    reading: "おいしい",
    description: "新しいカフェでランチを食べてみました。スタッフさんも喜んでくれた！",
    time: "1時間前",
    likes: 24,
    comments: 5,
    tags: ["食事", "感想"],
  },
  {
    id: 4,
    author: "佐藤 健",
    avatar: "🧑",
    word: "もう一度お願いします",
    reading: "もう いちど おねがいします",
    description: "聞き取れなかったときに使えた！これが言えるようになって楽になりました。",
    time: "3時間前",
    likes: 31,
    comments: 7,
    tags: ["コミュニケーション", "便利"],
  },
];

export default function GalleryPage() {
  useEffect(() => {
    logPageView("gallery");
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      {/* ページヘッダー */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-100 px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            {/* ページタイトル ← ここを書き換えると画面タイトルが変わります */}
            <h1 className="text-lg font-bold text-[#1A1A1A] tracking-tight">
              ギャラリー
            </h1>
            {/* サブタイトル ← ここを書き換えると変わります */}
            <p className="text-xs text-gray-400 mt-0.5">みんなのことば</p>
          </div>
          {/* 通知ボタン */}
          <button
            onClick={() => logAction("button_click", "gallery", "通知ボタンをタップ")}
            className="touch-target w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors"
            aria-label="通知"
          >
            {/* 通知ベルアイコン（SVG細線） */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="#9CA3AF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
        </div>

        {/* ストーリーエリア */}
        <div className="flex gap-4 mt-4 overflow-x-auto pb-1">
          {/* 自分の投稿ボタン */}
          <button
            onClick={() => logAction("button_click", "gallery", "新規投稿ボタンをタップ")}
            className="flex-shrink-0 flex flex-col items-center gap-1.5"
          >
            <div className="w-14 h-14 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            {/* ← ここを書き換えると「あなた」の表示が変わります */}
            <span className="text-[10px] text-gray-400 w-14 text-center truncate">あなた</span>
          </button>
          {/* サンプルストーリー */}
          {SAMPLE_POSTS.slice(0, 3).map((post) => (
            <button
              key={post.id}
              onClick={() => logAction("story_click", "gallery", `${post.author}のストーリーをタップ`)}
              className="flex-shrink-0 flex flex-col items-center gap-1.5"
            >
              {/* ストーリーリング：#007AFFの細いリング */}
              <div className="w-14 h-14 rounded-full border-2 border-[#007AFF] p-0.5">
                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-xl">
                  {post.avatar}
                </div>
              </div>
              <span className="text-[10px] text-gray-400 w-14 text-center truncate">
                {post.author.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 投稿カードリスト */}
      <div className="divide-y divide-gray-100">
        {SAMPLE_POSTS.map((post) => (
          <article key={post.id} className="bg-white px-5 py-5">
            {/* 投稿者情報 */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg flex-shrink-0">
                {post.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-[#1A1A1A]">{post.author}</p>
                <p className="text-xs text-gray-400">{post.time}</p>
              </div>
              <button
                onClick={() => logAction("button_click", "gallery", `${post.author}の投稿メニューをタップ`)}
                className="touch-target w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-50"
                aria-label="メニュー"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
                  <circle cx="5" cy="12" r="1.5" fill="#9CA3AF" />
                  <circle cx="12" cy="12" r="1.5" fill="#9CA3AF" />
                  <circle cx="19" cy="12" r="1.5" fill="#9CA3AF" />
                </svg>
              </button>
            </div>

            {/* ことばカード（メインコンテンツ）
                カラフルな背景を廃止し、白地＋薄いボーダーに統一 */}
            <div className="border border-gray-100 rounded-2xl px-6 py-6 mb-4 text-center bg-gray-50/50">
              {/* ことば本文（大きく・くっきり表示） */}
              <p className="text-4xl font-bold text-[#1A1A1A] mb-2 tracking-wide">
                {post.word}
              </p>
              {/* 読み方（ルビ風） */}
              <p className="text-sm text-gray-400">{post.reading}</p>
            </div>

            {/* 説明文 */}
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              {post.description}
            </p>

            {/* タグ */}
            <div className="flex gap-2 flex-wrap mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-[#007AFF] font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* アクションボタン */}
            <div className="flex items-center gap-5 pt-3 border-t border-gray-100">
              {/* いいねボタン */}
              <button
                onClick={() => logAction("like_click", "gallery", `投稿${post.id}にいいねをタップ`)}
                className="touch-target flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span className="text-sm">{post.likes}</span>
              </button>
              {/* コメントボタン */}
              <button
                onClick={() => logAction("comment_click", "gallery", `投稿${post.id}のコメントをタップ`)}
                className="touch-target flex items-center gap-1.5 text-gray-400 hover:text-[#007AFF] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="text-sm">{post.comments}</span>
              </button>
              {/* シェアボタン */}
              <button
                onClick={() => logAction("share_click", "gallery", `投稿${post.id}をシェアタップ`)}
                className="touch-target flex items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors"
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
                className="touch-target w-9 h-9 flex items-center justify-center ml-auto text-gray-400 hover:text-[#007AFF] transition-colors"
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

      <div className="h-8" />
    </div>
  );
}
