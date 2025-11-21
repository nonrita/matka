<template>
  <div class="min-h-screen bg-matka-bg text-matka-text flex flex-col items-center justify-center font-sans">
    
    <div class="text-center mb-8">
      <h1 class="text-6xl font-bold text-matka-primary mb-2">
        Matka
      </h1>
      <p class="text-lg text-gray-600">
        旅をまとめる、シンプルな記録。
      </p>
    </div>

    <div class="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
      <h2 class="text-2xl font-bold text-matka-primary mb-4">
        Setup Complete!
      </h2>
      <p class="mb-6 leading-relaxed">
        環境構築が完了しました。<br>
        Nuxt 3 + Supabase + Tailwind CSS<br>
        すべて正常に動作しています。
      </p>
      
      <button class="bg-matka-accent text-white px-8 py-3 rounded-full font-bold shadow-md hover:opacity-90 transition-opacity duration-200">
        開発を始める
      </button>
    </div>

    <div class="mt-12 text-sm text-gray-400">
      Running on localhost
    </div>
  </div>
</template>

<script setup lang="ts">
// ここにTypeScriptのロジックを書く
// 現段階では特に処理なし
</script>