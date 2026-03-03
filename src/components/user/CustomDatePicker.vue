<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  modelValue: string // Expected format YYYY-MM-DD, or empty
}>()

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const popoverRef = ref<HTMLElement | null>(null)

// Current view date (month/year being displayed)
const currentDate = ref(new Date())

// Initialize from prop if exists
onMounted(() => {
  if (props.modelValue) {
    currentDate.value = new Date(props.modelValue)
  }
})

// Close on outside click
const handleClickOutside = (event: MouseEvent) => {
  if (popoverRef.value && !popoverRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

// Month names
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const currentMonthName = computed(() => monthNames[currentDate.value.getMonth()])
const currentYear = computed(() => currentDate.value.getFullYear())

// Navigation
const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

// Calendar Grid Generation
const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  
  // Adjust to make Monday the first day of the week (0 = Monday, 6 = Sunday)
  let startingDayOfWeek = firstDayOfMonth.getDay() - 1
  if (startingDayOfWeek === -1) startingDayOfWeek = 6 // Sunday becomes 6
  
  const daysInMonth = lastDayOfMonth.getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()
  
  const days = []
  
  // Previous month's padding
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, daysInPrevMonth - i),
      isCurrentMonth: false,
      dayNumber: daysInPrevMonth - i
    })
  }
  
  // Current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
      dayNumber: i
    })
  }
  
  // Next month's padding to fill 6 rows (42 days total)
  const remainingCells = 42 - days.length
  for (let i = 1; i <= remainingCells; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
      dayNumber: i
    })
  }
  
  return days
})

// Formatting for display
const formattedSelection = computed(() => {
  if (!props.modelValue) return ''
  const date = new Date(props.modelValue)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
})

// Check if a generated day object matches the selected date
const isSelected = (dateObj: Date) => {
  if (!props.modelValue) return false
  const selected = new Date(props.modelValue)
  return dateObj.getDate() === selected.getDate() && 
         dateObj.getMonth() === selected.getMonth() && 
         dateObj.getFullYear() === selected.getFullYear()
}

// Check if a generated day object is today
const isToday = (dateObj: Date) => {
  const today = new Date()
  return dateObj.getDate() === today.getDate() && 
         dateObj.getMonth() === today.getMonth() && 
         dateObj.getFullYear() === today.getFullYear()
}

const selectDate = (day: any) => {
  const d = day.date
  // Format to YYYY-MM-DD (local time)
  const formatted = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  
  emit('update:modelValue', formatted)
  // Ensure the view switches to the selected month if clicking a padded day
  currentDate.value = new Date(d.getFullYear(), d.getMonth(), 1)
  isOpen.value = false
}
</script>

<template>
  <div class="relative w-full" ref="popoverRef">
    <!-- Trigger Button -->
    <button 
      type="button"
      @click="isOpen = !isOpen"
      class="bg-[#f4f5f8] rounded-2xl flex items-center justify-between px-4 h-[56px] w-full text-[16px] outline-none border transition-colors relative"
      :class="isOpen ? 'border-[#8b3dff] bg-white' : 'border-transparent text-[#9ca3af] hover:bg-[#eef0f3]'"
    >
      <span v-if="formattedSelection" class="text-[#1a1a1a] font-medium">{{ formattedSelection }}</span>
      <span v-else class="text-[#9ca3af]">Select Date</span>
      
      <svg class="w-5 h-5 text-[#4b5563] absolute right-4 transition-transform duration-200" :class="{ 'rotate-180': isOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Popover Calendar -->
    <div 
      v-if="isOpen" 
      class="absolute bottom-[64px] sm:bottom-auto sm:top-[64px] left-0 md:left-auto md:right-0 bg-white rounded-[24px] p-6 shadow-2xl w-full z-50 animate-fade-in custom-dropdown"
    >
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <button @click="prevMonth" class="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm hover:shadow hover:bg-gray-50 transition-all text-[#1a1a1a]">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div class="flex items-center gap-2">
          <div class="bg-white rounded-[12px] px-3 py-1.5 shadow-sm font-bold text-[#1a1a1a] flex items-center gap-1 text-[17px]">
            {{ currentMonthName }}
            <svg class="w-3 h-3 text-[#8B2CF5]" viewBox="0 0 10 10" fill="currentColor">
               <polygon points="0,10 10,10 10,0"/>
            </svg>
          </div>
          <div class="bg-white rounded-[12px] px-3 py-1.5 shadow-sm font-bold text-[#1a1a1a] flex items-center gap-1 text-[17px]">
            {{ currentYear }}
            <svg class="w-3 h-3 text-[#8B2CF5]" viewBox="0 0 10 10" fill="currentColor">
               <polygon points="0,10 10,10 10,0"/>
            </svg>
          </div>
        </div>
        
        <button @click="nextMonth" class="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm hover:shadow hover:bg-gray-50 transition-all text-[#1a1a1a]">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Days of Week Header (Mo, Tu, We...) -->
      <div class="grid grid-cols-7 gap-1 mb-2">
        <div v-for="day in ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']" :key="day" class="text-center font-bold text-[#1a1a1a] text-[15px] h-8 flex items-center justify-center">
          {{ day }}
        </div>
      </div>

      <!-- Calendar Grid -->
      <div class="grid grid-cols-7 gap-y-2 gap-x-1">
        <div 
          v-for="(day, index) in calendarDays" 
          :key="index"
          class="h-10 w-10 mx-auto flex items-center justify-center text-[15px] cursor-pointer transition-all duration-200"
          :class="[
            isSelected(day.date) 
              ? 'bg-[#8B2CF5] text-white rounded-[10px] font-bold shadow-md shadow-[#8B2CF5]/30' 
              : day.isCurrentMonth
                ? 'text-[#1a1a1a] font-bold hover:bg-gray-200 rounded-[10px]'
                : 'text-[#9ca3af] font-medium hover:bg-gray-100 rounded-[10px]',
            isToday(day.date) && !isSelected(day.date) ? 'border-2 border-[#8B2CF5] text-[#8B2CF5]' : ''
          ]"
          @click="selectDate(day)"
        >
          {{ day.dayNumber }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transform-origin: top center;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-10px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Subtle border for the dropdown to pop from the white modal background */
.custom-dropdown {
    border: 1px solid rgba(0,0,0,0.05);
}
</style>
