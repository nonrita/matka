<template>
  <div class="min-h-screen bg-matka-bg pb-24">
    
    <TripHeader :title="trip?.title" />

    <main class="max-w-md mx-auto p-4">
      
      <div v-if="pending" class="text-center py-20 text-gray-400 animate-pulse">Loading...</div>
      
      <div v-else-if="error || !trip" class="text-center py-20 text-red-500">データが見つかりません</div>

      <div v-else class="mt-4">
        
        <ClientOnly>
          
          <div class="space-y-4">
            
            <draggable 
              v-if="schedules && schedules.length > 0"
              v-model="schedules" 
              item-key="id"
              handle=".drag-handle"
              :animation="200"
              class="space-y-3"
              @end="onDragEnd"
            >
              <template #item="{ element }">
                <ScheduleItem 
                  :schedule="element" 
                  @click="openModal(element)" 
                />
              </template>
            </draggable>
            
            <div v-else class="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-white/50">
              <p class="text-matka-primary font-bold mb-2">予定がまだありません</p>
              <p class="text-sm text-gray-500">
                下のボタンから<br>最初の予定を追加しましょう
              </p>
            </div>

          </div>

          <template #fallback>
             <div class="text-center text-gray-400 py-10">読み込み中...</div>
          </template>
          
        </ClientOnly>

      </div>
    </main>

    <button 
      @click="openModal(null)"
      class="fixed bottom-6 right-6 bg-matka-accent text-white p-4 rounded-full shadow-lg shadow-orange-200 hover:scale-110 transition-transform active:scale-95 z-50"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    </button>

    <ScheduleModal 
      :isOpen="isModalOpen" 
      :initialData="editingSchedule"
      @close="isModalOpen = false"
      @save="handleSave"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
// ★重要: vuedraggable をインポート
import draggable from 'vuedraggable'

const route = useRoute()
const client = useSupabaseClient<any>() // 型チェック緩和
const tripId = route.params.id as string

// 状態管理
const isModalOpen = ref(false)
const editingSchedule = ref<Schedule | null>(null)

// 型定義
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

// --- データ取得 (Read) ---

// 1. 旅行情報の取得
const { data: trip, pending, error } = await useAsyncData<Trip>(`trip-${tripId}`, async () => {
  const { data, error } = await client.from('trips').select('*').eq('id', tripId).single()
  if (error) throw error
  return data
})

// 2. スケジュール一覧の取得
const { data: schedules, refresh: refreshSchedules } = await useAsyncData<Schedule[]>(`schedules-${tripId}`, async () => {
  const { data, error } = await client
    .from('schedules')
    .select('*')
    .eq('trip_id', tripId)
    .order('order_index', { ascending: true })
  
  if (error) throw error
  return data
})

// --- アクション ---

// モーダルを開く
const openModal = (schedule: Schedule | null) => {
  editingSchedule.value = schedule
  isModalOpen.value = true
}

// 保存処理 (新規作成 & 更新)
const handleSave = async (formData: any) => {
  try {
    const commonData = {
      title: formData.title,
      memo: formData.memo,
      start_time: formData.time || null,
    }

    if (editingSchedule.value) {
      // Update
      const { error } = await client
        .from('schedules')
        .update(commonData)
        .eq('id', editingSchedule.value.id)
      if (error) throw error
    } else {
      // Insert
      const { error } = await client
        .from('schedules')
        .insert({
          trip_id: tripId,
          ...commonData,
          order_index: schedules.value?.length ?? 0
        })
      if (error) throw error
    }

    isModalOpen.value = false
    await refreshSchedules()

  } catch (e) {
    console.error('Error saving:', e)
    alert('保存に失敗しました')
  }
}

// 削除処理
const handleDelete = async () => {
  if (!editingSchedule.value) return
  if (!confirm('本当に削除しますか？')) return

  try {
    const { error } = await client
      .from('schedules')
      .delete()
      .eq('id', editingSchedule.value.id)
    
    if (error) throw error

    isModalOpen.value = false
    await refreshSchedules()
  } catch (e) {
    console.error('Error deleting:', e)
    alert('削除に失敗しました')
  }
}

// --- ドラッグ＆ドロップ処理 (Issue #8) ---
const onDragEnd = async () => {
  if (!schedules.value) return

  try {
    // 1. 並び替え後の配列に基づいて、indexを振り直す
    const updates = schedules.value.map((item, index) => ({
      id: item.id,
      trip_id: tripId,
      title: item.title,
      // ここで新しい順番(index)をセットする
      order_index: index 
    }))

    // 2. Supabaseに一括更新 (Upsert)
    const { error } = await client
      .from('schedules')
      .upsert(updates)

    if (error) throw error
    
  } catch (e) {
    console.error('Error reordering:', e)
    alert('並び順の保存に失敗しました')
  }
}
</script>