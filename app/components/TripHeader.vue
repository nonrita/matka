<template>
  <header class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
    <div class="max-w-md mx-auto px-4 py-3 flex justify-between items-center">
      
      <div class="flex-1 min-w-0 mr-4">
        <h1 class="text-xl font-bold text-matka-primary truncate">
          {{ title || '読み込み中...' }}
        </h1>
        <p class="text-xs text-gray-400">
          Matka Trip Guide
        </p>
      </div>

      <button class="text-matka-secondary bg-green-50 p-2 rounded-full hover:bg-green-100 transition">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
      </button>

    </div>
  </header>
</template>

<script setup lang="ts">
// 親コンポーネントから「タイトル」を受け取る設定
defineProps<{
  title?: string
}>()
</script>