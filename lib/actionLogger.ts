// ============================================================
// ActionLogger（アクションロガー）
// 「誰が・いつ・どの機能を触ったか」を記録する共通関数です。
// 将来のデータ分析や使用状況の把握に使います。
// ============================================================

// アクションの型定義
// ここに新しい記録項目を追加できます
export type ActionLog = {
  // アクションの種類（例: "button_click", "page_view"）
  action: string;

  // どの画面で起きたか（例: "gallery", "training", "scan", "help"）
  screen: string;

  // 何をしたか（例: "投稿を開いた", "練習を開始した"）
  label: string;

  // いつ起きたか（自動で入ります）
  timestamp: string;

  // 追加情報があれば入れる場所（任意）
  extra?: Record<string, unknown>;
};

// ============================================================
// logAction 関数
// 使い方：logAction("button_click", "gallery", "投稿を開いた")
// ============================================================
export function logAction(
  action: string,
  screen: string,
  label: string,
  extra?: Record<string, unknown>
): void {
  const log: ActionLog = {
    action,
    screen,
    label,
    // 現在時刻を日本時間で記録します
    timestamp: new Date().toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
    }),
    extra,
  };

  // ブラウザのコンソールに記録（開発中の確認用）
  // F12キー → Console タブで確認できます
  console.log("[KotoNavi ActionLog]", log);

  // ここに将来のデータ保存処理を追加できます
  // 例: サーバーに送信、localStorageに保存、など
  // saveToServer(log);
  // saveToLocalStorage(log);
}

// ============================================================
// ページ表示を記録するヘルパー関数
// 各ページコンポーネントで使います
// ============================================================
export function logPageView(screen: string): void {
  logAction("page_view", screen, `${screen}画面を表示`);
}
