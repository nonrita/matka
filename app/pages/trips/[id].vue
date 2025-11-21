<template>
  <div class="min-h-screen bg-matka-bg flex flex-col items-center justify-center p-4">
    <div class="bg-white p-8 rounded-2xl shadow-md text-center max-w-lg w-full">
      
      <h1 class="text-2xl font-bold text-matka-primary mb-4">
        🎉 しおり作成成功！
      </h1>
      
      <p class="text-gray-600 mb-6">
        あなただけの旅行ページが発行されました。
      </p>

      <div class="bg-gray-100 p-4 rounded-lg font-mono text-sm break-all text-gray-500 mb-4">
        Trip ID: {{ route.params.id }}
      </div>

      <NuxtLink to="/" class="text-matka-secondary hover:underline font-bold">
        ← トップに戻る
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// URLの情報を取得するための機能
const route = useRoute()
</script>