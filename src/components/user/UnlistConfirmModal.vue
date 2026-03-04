<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close', 'confirm'])

const handleClose = () => {
  emit('close')
}

const handleConfirm = () => {
  emit('confirm')
  emit('close')
}
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/40" @click="handleClose"></div>
      
      <!-- Modal Content -->
      <div class="relative bg-white rounded-[24px] w-full max-w-[480px] pt-16 pb-8 px-8 shadow-2xl flex flex-col items-center animate-modal-up">
        <!-- Icon Section -->
        <div class="flex items-center gap-3 mb-16 w-full justify-center">
          <div class="w-8 h-8 rounded-full bg-[#FF3D57] flex items-center justify-center shrink-0">
            <span class="text-white text-[18px] font-bold">!</span>
          </div>
          <h2 class="text-[20px] font-bold text-[#FF3D57]">你确认要下架商品吗？</h2>
        </div>

        <!-- Buttons Section -->
        <div class="flex gap-4 w-full">
          <button 
            @click="handleConfirm"
            class="flex-1 h-[56px] rounded-[16px] border border-[#E5E7EB] bg-white text-[#999999] text-[18px] font-medium transition-colors hover:bg-gray-50"
          >
            确认下架
          </button>
          <button 
            @click="handleClose"
            class="flex-1 h-[56px] rounded-[16px] bg-[#8B2CF5] text-white text-[18px] font-medium transition-opacity hover:opacity-90 shadow-lg shadow-[#8B2CF5]/30"
          >
            再考虑一下
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-modal-up {
  animation: modalUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes modalUp {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
