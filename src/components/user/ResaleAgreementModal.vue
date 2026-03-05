<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close', 'agree'])

const handleClose = () => {
  emit('close')
}

const handleAgree = () => {
  emit('agree')
  emit('close')
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-[60] flex items-center justify-center">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/40 transition-opacity" @click="handleClose"></div>
    
    <!-- Modal -->
    <div class="relative bg-white rounded-[24px] w-[320px] md:w-[480px] p-6 shadow-2xl transform transition-all flex flex-col slide-up overflow-hidden">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-[24px] font-bold text-[#1a1a1a]">平台转售履约协议</h2>
        <button @click="handleClose" class="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-1.5 transition-colors">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="space-y-4 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
        <div class="space-y-2">
          <p class="text-[15px] leading-relaxed text-[#4b5563]">
            <span class="text-[#8B2CF5] font-bold mr-1">真实性承诺：</span>
            卖家承诺所售门票来源合法且真实有效。如因假票、无效票导致买家无法入场，卖家需承担全额退款及按平台规则支付最高达原票价3倍的违约金。
          </p>
        </div>

        <div class="space-y-2">
          <p class="text-[15px] leading-relaxed text-[#4b5563]">
            <span class="text-[#8B2CF5] font-bold mr-1">履约发货：</span>
            卖家需在买家付款后规定的时间内完成发货（如电子票转赠、纸质票邮寄）。超时未发货视为严重违约。
          </p>
        </div>

        <div class="space-y-2">
          <p class="text-[15px] leading-relaxed text-[#4b5563]">
            <span class="text-[#8B2CF5] font-bold mr-1">价格限制：</span>
            为抵制黄牛炒票，平台限制最高转售价不得超过票面原价的120%。
          </p>
        </div>

        <div class="space-y-2">
          <p class="text-[15px] leading-relaxed text-[#4b5563]">
            <span class="text-[#8B2CF5] font-bold mr-1">违约责任：</span>
            卖家单方面取消订单、虚假发货或因自身原因导致交易失败，平台将扣除卖家保证金，并永久限制卖家账户功能。
          </p>
        </div>
      </div>

      <!-- Action Button -->
      <div class="mt-8">
        <button 
          @click="handleAgree"
          class="w-full bg-[#8B2CF5] hover:bg-[#7a25d9] text-white rounded-[20px] h-[56px] text-[18px] font-bold transition-all shadow-[0_8px_20px_rgba(139,44,245,0.2)]"
        >
          我已阅读并同意
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-up {
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style>
