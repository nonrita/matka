// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default <Config>{
  // Tailwindを適用するファイルを指定
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      // Matka専用のカラーパレットを定義
      // 使うときは class="bg-matka-bg" や text-matka-primary のように書ける
      colors: {
        matka: {
          bg: '#F7F9F9',       // 背景色: 雪のような落ち着いた白
          primary: '#2C5F2D',  // メイン色: 北欧の森のような深い緑
          secondary: '#97BC62',// サブ色: 若草色（アクセントより控えめな強調）
          accent: '#EA5C2B',   // アクセント: 北欧雑貨にあるような温かいオレンジ赤
          text: '#2D3436',     // 文字色: 真っ黒ではない読みやすいダークグレー
        }
      }
    },
  },
  plugins: [],
}