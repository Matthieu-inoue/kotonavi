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
// ここを実際のデータに置き換えてください。
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
    // テーマカラー（Tailwindのカラークラス）
    color: "bg-sky-50",
    accent: "text-sky-600",
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
    color: "bg-emerald-50",
    accent: "text-emerald-600",
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
    color: "bg-amber-50",
    accent: "text-amber-600",
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
    color: "bg-purple-50",
    accent: "text-purple-600",
  },
];

export default function GalleryPage() {
  // ページが表示されたときにログを記録します
  useEffect(() => {
    logPageView("gallery");
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      {/* ページヘッダー */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            {/* ページタイトル ← ここを書き換えると画面タイトルが変わります */}
            <h1 className="text-xl font-bold text-gray-900">ギャラリー</h1>
            {/* サブタイトル ← ここを書き換えると変わります */}
            <p className="text-xs text-gray-400">みんなのことば</p>
          </div>
          {/* 通知アイコン（将来の機能用プレースホルダー） */}
          <button
            onClick={() => logAction("button_click", "gallery", "通知ボタンをタップ")}
            className="touch-target flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="通知"
          >
            <span className="text-2xl">🔔</span>
          </button>
        </div>

        {/* ストーリー風のクイック投稿エリア（将来の機能用プレースホルダー） */}
        <div className="flex gap-3 mt-3 overflow-x-auto pb-1 scrollbar-hide">
          {/* 自分の投稿ボタン */}
          <button
            onClick={() =>
              logAction("button_click", "gallery", "新規投稿ボタンをタップ")
            }
            className="flex-shrink-0 flex flex-col items-center gap-1"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-2xl border-2 border-white shadow-sm">
              +
            </div>
            {/* ← ここを書き換えると「あなた」の表示が変わります */}
            <span className="text-xs text-gray-500 w-14 text-center truncate">
              あなた
            </span>
          </button>
          {/* サンプルストーリー */}
          {SAMPLE_POSTS.slice(0, 3).map((post) => (
            <button
              key={post.id}
              onClick={() =>
                logAction("story_click", "gallery", `${post.author}のストーリーをタップ`)
              }
              className="flex-shrink-0 flex flex-col items-center gap-1"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-2xl border-2 border-white shadow-sm">
                {post.avatar}
              </div>
              <span className="text-xs text-gray-500 w-14 text-center truncate">
                {post.author.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 投稿カードリスト */}
      <div className="divide-y divide-gray-100">
        {SAMPLE_POSTS.map((post) => (
          <article key={post.id} className="bg-white p-4">
            {/* 投稿者情報 */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                {post.avatar}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-900">{post.author}</p>
                <p className="text-xs text-gray-400">{post.time}</p>
              </div>
              {/* もっと見るボタン */}
              <button
                onClick={() =>
                  logAction("button_click", "gallery", `${post.author}の投稿メニューをタップ`)
                }
                className="touch-target flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100"
                aria-label="メニュー"
              >
                <span className="text-gray-400 text-lg">•••</span>
              </button>
            </div>

            {/* ことばカード（メインコンテンツ） */}
            <div
              className={`${post.color} rounded-2xl p-5 mb-3 text-center`}
            >
              {/* ことば本文（大きく表示） */}
              <p className={`text-4xl font-bold ${post.accent} mb-1`}>
                {post.word}
              </p>
              {/* 読み方（ルビ風） */}
              <p className="text-sm text-gray-400">{post.reading}</p>
            </div>

            {/* 説明文 */}
            <p className="text-sm text-gray-700 mb-3">{post.description}</p>

            {/* タグ */}
            <div className="flex gap-2 flex-wrap mb-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* アクションボタン（いいね・コメント・シェア） */}
            <div className="flex items-center gap-4 pt-2 border-t border-gray-50">
              {/* いいねボタン */}
              <button
                onClick={() =>
                  logAction("like_click", "gallery", `投稿${post.id}にいいねをタップ`)
                }
                className="touch-target flex items-center gap-1.5 text-gray-500 hover:text-red-500 transition-colors"
              >
                <span className="text-xl">🤍</span>
                <span className="text-sm font-medium">{post.likes}</span>
              </button>
              {/* コメントボタン */}
              <button
                onClick={() =>
                  logAction("comment_click", "gallery", `投稿${post.id}のコメントをタップ`)
                }
                className="touch-target flex items-center gap-1.5 text-gray-500 hover:text-sky-500 transition-colors"
              >
                <span className="text-xl">💬</span>
                <span className="text-sm font-medium">{post.comments}</span>
              </button>
              {/* シェアボタン（将来実装） */}
              <button
                onClick={() =>
                  logAction("share_click", "gallery", `投稿${post.id}をシェアタップ`)
                }
                className="touch-target flex items-center gap-1.5 text-gray-500 hover:text-green-500 transition-colors"
              >
                <span className="text-xl">🔗</span>
                <span className="text-sm font-medium">シェア</span>
              </button>
              {/* ブックマークボタン（右端） */}
              <button
                onClick={() =>
                  logAction("bookmark_click", "gallery", `投稿${post.id}をブックマーク`)
                }
                className="touch-target flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 ml-auto"
              >
                <span className="text-xl">🔖</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* リスト末尾のパディング */}
      <div className="h-8" />
    </div>
  );
}
