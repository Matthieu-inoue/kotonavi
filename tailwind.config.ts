import type { Config } from "tailwindcss";

const config: Config = {
  // Tailwind CSSが適用されるファイルの場所を指定します
  // ここを変えると、どのファイルにCSSが当たるかが変わります
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ここでアプリ全体のカラーテーマを変更できます
      colors: {
        // メインカラー（ボタンやアクセントに使う色）
        // この値を変えるとアプリ全体の印象が変わります
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
        },
        // スキャンボタンなど、強調したい場所に使うオレンジ色
        accent: {
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
        },
      },
      // ボタンなどの最小サイズ（アクセシビリティのため48px以上を推奨）
      minHeight: {
        touch: "48px",
      },
      minWidth: {
        touch: "48px",
      },
    },
  },
  plugins: [],
};

export default config;
