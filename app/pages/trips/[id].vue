<template>
  <div class="min-h-screen bg-matka-bg pb-24">
    
    <TripHeader :title="trip?.title" />

    <main class="max-w-md mx-auto p-4">
      
      <div v-if="pending" class="text-center py-20 text-gray-400 animate-pulse">Loading...</div>
      <div v-else-if="error || !trip" class="text-center py-20 text-red-500">データが見つかりません</div>

      <div v-else class="space-y-4 mt-4">
        <div v-if="schedules && schedules.length > 0" class="space-y-3">
          <ScheduleItem v-for="item in schedules" :key="item?.id" :schedule="item" />
        </div>
        
        <div v-else class="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-white/50">
          <p class="text-matka-primary font-bold mb-2">予定がまだありません</p>
          <p class="text-sm text-gray-500">下のボタンから予定を追加しましょう</p>
        </div>
      </div>
    </main>

    <button 
      @click="isModalOpen = true"
      class="fixed bottom-6 right-6 bg-matka-accent text-white p-4 rounded-full shadow-lg shadow-orange-200 hover:scale-110 transition-transform active:scale-95 z-50"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    </button>

    <ScheduleModal 
      :isOpen="isModalOpen" 
      @close="isModalOpen = false"
      @save="handleSave"
    />

  </div>
</template>

<script setup lang="ts">
const route = useRoute()
// ★修正1: <any> をつけて、型チェックを少し緩める（Insertエラー回避）
const client = useSupabaseClient<any>()
const tripId = route.params.id as string

// モーダルの開閉状態
const isModalOpen = ref(false)

// ★修正2: データの型を定義する
type Trip = {
  id: string
  title: string
}

type Schedule = {
  id: string
  trip_id: string
  title: string
  memo: string | null
  start_time: string | null
  order_index: number
}

// データの取得 (Read)
// ★修正3: useAsyncDataに <Trip> 型を指定
const { data: trip, pending, error } = await useAsyncData<Trip>(`trip-${tripId}`, async () => {
  const { data, error } = await client.from('trips').select('*').eq('id', tripId).single()
  if (error) throw error
  return data
})

// ★修正4: useAsyncDataに <Schedule[]> (配列) 型を指定
const { data: schedules, refresh: refreshSchedules } = await useAsyncData<Schedule[]>(`schedules-${tripId}`, async () => {
  const { data, error } = await client.from('schedules').select('*').eq('trip_id', tripId).order('order_index', { ascending: true })
  if (error) throw error
  return data
})

// データの保存 (Create)
const handleSave = async (formData: any) => {
  try {
    // DBに登録
    const { error } = await client
      .from('schedules')
      .insert({
        trip_id: tripId,
        title: formData.title,
        memo: formData.memo,
        start_time: formData.time || null,
        // schedules.value が null の可能性を考慮して安全に長さを取得
        order_index: schedules.value?.length ?? 0 
      })
    
    if (error) throw error

    // 成功したらモーダルを閉じて、リストを再取得
    isModalOpen.value = false
    await refreshSchedules()

  } catch (e) {
    console.error('Error adding schedule:', e)
    alert('保存に失敗しました')
  }
}
</script>