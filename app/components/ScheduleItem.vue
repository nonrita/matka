<template>
  <div 
    @click="$emit('click')"
    class="bg-white rounded-xl p-4 shadow-sm border-l-4 border-matka-primary flex gap-4 items-start hover:shadow-md transition-shadow cursor-pointer active:scale-[0.99] transition-transform group"
  >
    <div class="text-gray-300 cursor-grab active:cursor-grabbing mt-1 drag-handle" @click.stop>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
    </div>

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
const props = defineProps<{
  schedule: any
}>()
defineEmits(['click'])
const formatTime = (timeStr?: string) => {
  if (!timeStr) return '--:--'
  return timeStr.slice(0, 5)
}
</script>