<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import ResaleAgreementModal from './ResaleAgreementModal.vue'
import CustomDatePicker from './CustomDatePicker.vue'

const props = defineProps<{
  isOpen: boolean
  ticket: any
}>()

const emit = defineEmits(['close', 'confirm'])

const resalePrice = ref<number | string>('')
const endTime = ref('')
const agreed = ref(false)
const showAgreement = ref(false)
const toastMessage = ref('')
let promptTimer: ReturnType<typeof setTimeout> | null = null

const showToast = (msg: string) => {
  toastMessage.value = msg
  if (promptTimer) clearTimeout(promptTimer)
  promptTimer = setTimeout(() => {
    toastMessage.value = ''
  }, 2000)
}
const currentView = ref<'form' | 'date'>('form')

const formatDate = (val: string) => {
  if (!val) return 'Select Date'
  const [datePart, timePart] = val.split(' ')
  const date = new Date(datePart)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${timePart || ''}`
}

// Reset when modal opens
watch(() => props.isOpen, (newVal) => {
  if (newVal && props.ticket) {
    resalePrice.value = props.ticket.price
    agreed.value = false
    currentView.value = 'form'
    const today = new Date()
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    endTime.value = `${dateStr} 18:28:55`
  }
})

const maxPrice = computed(() => {
  if (!props.ticket || !props.ticket.price) return 0
  return Number(props.ticket.price) * 1.2
})

const serviceFee = computed(() => {
  const price = Number(resalePrice.value) || 0
  return (price * 0.05).toFixed(2)
})

const payout = computed(() => {
  const price = Number(resalePrice.value) || 0
  return (price * 0.95).toFixed(2)
})

const isPriceValid = computed(() => {
  const price = Number(resalePrice.value)
  return price > 0 && price <= maxPrice.value
})

const handleClose = () => {
  emit('close')
}

const handleSubmit = () => {
  if (!agreed.value) {
    showToast('请阅读并同意《POPTIX平台转售履约协议》')
    return
  }
  if (!isPriceValid.value) {
    showToast('请输入有效的转售价格，不可超过原价120%')
    return
  }
  if (!endTime.value) {
    showToast('请设置挂售结束时间')
    return
  }

  emit('confirm', {
    price: Number(resalePrice.value),
    endTime: endTime.value
  })
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/40 transition-opacity" @click="handleClose"></div>
    
    <!-- Main Modal -->
    <div 
      v-show="!showAgreement"
      class="relative rounded-[24px] w-[480px] p-6 shadow-xl transition-all duration-300 flex flex-col slide-up"
      :class="currentView === 'date' ? 'bg-[#F9F5FF]' : 'bg-white'"
    >
      <!-- Main Form View -->
      <div v-if="currentView === 'form'">
        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-[22px] font-bold text-[#1a1a1a]">设置挂售价格</h2>
          <button @click="handleClose" class="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-1.5 transition-colors">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Original Price -->
        <div class="text-[17px] text-[#4b5563] mb-4 flex items-center">
          门票原价：<span class="text-[#8B2CF5] font-bold ml-1">¥{{ ticket?.price }}</span>
        </div>

        <!-- Resale Price Input -->
        <div class="text-[15px] text-[#4b5563] mb-4">
          请输入您的转售价（最高不可超过原价120%）
        </div>
        <div class="bg-[#f4f5f8] rounded-2xl flex items-center px-4 h-[56px] w-full border border-transparent transition-colors focus-within:border-[#8B2CF5] focus-within:bg-white" :class="{'border-red-500': resalePrice && !isPriceValid}">
          <span class="text-[20px] text-[#1a1a1a] mr-2 flex justify-center w-5">¥</span>
          <input 
            type="number" 
            v-model="resalePrice" 
            class="bg-transparent text-[18px] text-[#1a1a1a] focus:outline-none w-full border-none" 
          />
        </div>
        
        <!-- Calculation -->
        <div class="text-[14px] text-[#8c8c8c] mt-4 mb-4 flex items-center gap-1">
          <span>平台服务费 5%：</span>
          <span class="text-[#f11a8a] font-medium mr-1 border-r border-gray-300 pr-2">¥{{ serviceFee }}</span>
          <span class="ml-1">预计到手价：</span>
          <span class="text-[#f11a8a] font-medium">¥{{ payout }}</span>
        </div>

        <!-- End Time Input -->
        <div class="text-[18px] text-[#1a1a1a] mb-4">设置挂售结束时间</div>
        <div class="mb-4">
          <button 
            @click="currentView = 'date'"
            class="bg-[#f4f5f8] rounded-2xl flex items-center justify-between px-4 h-[56px] w-full text-[16px] outline-none border border-transparent hover:bg-[#eef0f3] transition-colors"
          >
            <span class="text-[#1a1a1a] font-medium">{{ formatDate(endTime) }}</span>
            <svg class="w-5 h-5 text-[#4b5563]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <!-- Agreement Checkbox -->
        <div class="flex items-center gap-3 mb-4 select-none">
          <label class="cursor-pointer group flex items-center justify-center">
            <div 
              class="w-[22px] h-[22px] rounded-full border-[2px] flex items-center justify-center transition-colors"
              :class="agreed ? 'bg-[#8B2CF5] border-[#8B2CF5] border-0' : 'border-[#d1d5db] group-hover:border-[#8B2CF5]'"
            >
              <svg v-if="agreed" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <input type="checkbox" v-model="agreed" class="hidden" />
          </label>
          <span class="text-[14px] text-[#9ca3af]">
            我已阅读并同意 <a href="#" @click.stop.prevent="showAgreement = true" class="text-[#8B2CF5] hover:underline">《POPTIX平台转售履约协议》</a>
          </span>
        </div>

        <!-- Submit Button -->
        <button 
          @click="handleSubmit"
          class="w-full text-white rounded-[16px] h-[56px] text-[16px] font-medium transition-all duration-300"
          :class="agreed ? 'bg-[#8B2CF5] hover:opacity-90 hover:shadow-[0_8px_20px_rgba(139,44,245,0.25)]' : 'bg-[#e5e7eb] cursor-not-allowed text-[#9ca3af]'"
        >
          同意履约协议并上架
        </button>
      </div>

      <!-- Date Selection View -->
      <div v-else-if="currentView === 'date'" class="animate-fade-in relative">
        <!-- Clickable area to return to form -->
        <div class="absolute -inset-6 z-0 pointer-events-auto" @click="currentView = 'form'"></div>
        
        <div class="relative z-10">
          <CustomDatePicker 
            v-model="endTime" 
            standalone 
            @confirm="currentView = 'form'" 
          />
        </div>
      </div>

      <!-- Validation Feedback Toast -->
      <Transition name="fade">
        <div 
          v-if="toastMessage" 
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[#fff5eb] text-[#ff5a00] px-6 py-3 rounded-xl shadow-lg border border-[#ff8c4a]/30 whitespace-nowrap text-[15px] flex items-center gap-2 pointer-events-none"
        >
          <span>{{ toastMessage }}</span>
        </div>
      </Transition>
    </div>

    <!-- Agreement Modal (moved outside the transform container) -->
    <ResaleAgreementModal 
      :isOpen="showAgreement" 
      @close="showAgreement = false" 
      @agree="agreed = true"
    />
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

.animate-fade-in {
  animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateX(10px); }
  100% { opacity: 1; transform: translateX(0); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -40%);
}
</style>
