<template>
  <div class="min-h-screen bg-matka-bg text-matka-text flex flex-col items-center justify-center p-4 text-center font-sans">
    
    <div class="mb-12">
      <h1 class="text-6xl font-bold text-matka-primary mb-4 tracking-tight">
        Matka
      </h1>
      <p class="text-lg text-gray-600 font-medium">
        URLひとつで、旅がはじまる。
      </p>
    </div>

    <div class="space-y-4">
      <button 
        @click="createTrip" 
        :disabled="isLoading"
        class="bg-matka-accent text-white text-lg font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="isLoading">作成中...</span>
        <span v-else>新しいしおりを作る</span>
      </button>
      
      <p class="text-sm text-gray-400">
        会員登録・ログインは不要です
      </p>
    </div>

  </div>
</template>

<script setup lang="ts">
// Supabaseを使うためのクライアントを取得
const client = useSupabaseClient()
// ローディング状態を管理する変数
const isLoading = ref(false)

/**
 * しおりを作成して詳細ページへ遷移する関数
 */
const createTrip = async () => {
  try {
    // ボタンを連打できないようにローディング中にする
    isLoading.value = true
    
    // 1. DBの trips テーブルに新しい行を追加
    // .select() .single() をつけることで、作成したデータをその場で受け取れる
    const { data, error } = await client
      .from('trips')
      .insert({
        title: '新しい旅', // デフォルトタイトル
      })
      .select()
      .single()

    if (error) throw error

    // 2. 作成されたデータのIDを使って、詳細ページへジャンプ
    if (data) {
      await navigateTo(`/trips/${data.id}`)
    }

  } catch (e) {
    console.error('Error:', e)
    alert('しおりの作成に失敗しました。')
  } finally {
    // 処理が終わったらローディングを解除
    isLoading.value = false
  }
}
</script>