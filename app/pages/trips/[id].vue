<template>
  <div class="min-h-screen bg-matka-bg pb-24">
    
    <TripHeader :title="trip?.title" />

    <main class="max-w-md mx-auto p-4">
      
      <div v-if="pending" class="text-center py-20 text-gray-400">
        Loading...
      </div>

      <div v-else-if="error || !trip" class="text-center py-20 text-red-500">
        <p class="font-bold">旅行データが見つかりません</p>
        <NuxtLink to="/" class="text-sm underline mt-2">トップへ戻る</NuxtLink>
      </div>

      <div v-else class="space-y-4 mt-4">
        
        <div class="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-white/50">
          <p class="text-matka-primary font-bold mb-2">予定がまだありません</p>
          <p class="text-sm text-gray-500">
            下のボタンから<br>最初の予定を追加しましょう
          </p>
        </div>

        </div>
    </main>

    <button 
      class="fixed bottom-6 right-6 bg-matka-accent text-white p-4 rounded-full shadow-lg shadow-orange-200 hover:scale-110 transition-transform active:scale-95 z-50"
      aria-label="予定を追加"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    </button>

  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const client = useSupabaseClient()
const tripId = route.params.id as string

// DBから旅行データ(trips)を取得する
// useAsyncDataを使うことで、サーバーサイドレンダリング時にも効率よく取得できる
const { data: trip, pending, error } = await useAsyncData(`trip-${tripId}`, async () => {
  const { data, error } = await client
    .from('trips')
    .select('*')
    .eq('id', tripId)
    .single()
  
  if (error) throw error
  return data
})
</script>