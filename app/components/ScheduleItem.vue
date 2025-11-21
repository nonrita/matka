<template>
  <div class="bg-white rounded-xl p-4 shadow-sm border-l-4 border-matka-primary flex gap-4 items-start hover:shadow-md transition-shadow">
    
    <div class="text-center min-w-[3rem]">
      <div class="text-lg font-bold text-matka-text leading-none">
        {{ formatTime(schedule.start_time) }}
      </div>
    </div>

    <div class="flex-1 min-w-0">
      <h3 class="font-bold text-lg text-gray-800 leading-tight mb-1 truncate">
        {{ schedule.title }}
      </h3>
      <p v-if="schedule.memo" class="text-sm text-gray-500 whitespace-pre-wrap break-words">
        {{ schedule.memo }}
      </p>
    </div>

  </div>
</template>

<script setup lang="ts">
// 親からデータを受け取る
const props = defineProps<{
  schedule: any // 本来は型定義すべきですが一旦anyで進めます
}>()

// 時間 (HH:MM:SS) を (HH:MM) に整形する関数
const formatTime = (timeStr?: string) => {
  if (!timeStr) return '--:--'
  // "10:00:00" -> "10:00" にカット
  return timeStr.slice(0, 5)
}
</script>