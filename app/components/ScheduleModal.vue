<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" @click.self="close">
    
    <div class="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden transform transition-all scale-100">
      
      <div class="bg-matka-primary px-6 py-4 text-white flex justify-between items-center">
        <h2 class="font-bold text-lg">予定を追加</h2>
        <button @click="close" class="text-white/80 hover:text-white">
          ✕
        </button>
      </div>

      <div class="p-6 space-y-4">
        
        <div>
          <label class="block text-xs font-bold text-gray-500 mb-1">時間</label>
          <input 
            v-model="form.time" 
            type="time" 
            class="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-matka-primary/50"
          >
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-500 mb-1">タイトル</label>
          <input 
            v-model="form.title" 
            type="text" 
            placeholder="例: ランチ、集合" 
            class="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-matka-primary/50 font-bold"
          >
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-500 mb-1">メモ (任意)</label>
          <textarea 
            v-model="form.memo" 
            rows="3" 
            placeholder="詳細や場所など" 
            class="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-matka-primary/50 text-sm"
          ></textarea>
        </div>

      </div>

      <div class="p-4 bg-gray-50 flex gap-3 justify-end border-t border-gray-100">
        <button @click="close" class="px-4 py-2 text-gray-500 font-bold hover:bg-gray-200 rounded-lg transition">
          キャンセル
        </button>
        <button 
          @click="save" 
          :disabled="!form.title"
          class="px-6 py-2 bg-matka-primary text-white font-bold rounded-lg shadow hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          保存する
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
// 親から「開いているかどうか」を受け取る
const props = defineProps<{
  isOpen: boolean
}>()

// 親にイベントを通知する設定
const emit = defineEmits(['close', 'save'])

// 入力データを管理する変数
const form = reactive({
  time: '',
  title: '',
  memo: ''
})

// 閉じるボタン
const close = () => {
  emit('close')
}

// 保存ボタン
const save = () => {
  // 親コンポーネントに入力データを渡す
  emit('save', { ...form })
  // フォームをリセット
  form.time = ''
  form.title = ''
  form.memo = ''
}
</script>