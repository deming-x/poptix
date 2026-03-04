<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'

const props = defineProps<{
  modelValue: string, // Expected format YYYY-MM-DD HH:mm:ss, or empty
  standalone?: boolean
}>()

const emit = defineEmits(['update:modelValue', 'confirm'])

const isOpen = ref(props.standalone || false)
const popoverRef = ref<HTMLElement | null>(null)
const viewMode = ref<'date' | 'time'>('date')

// Refs for scroll containers
const hourScroll = ref<HTMLElement | null>(null)
const minuteScroll = ref<HTMLElement | null>(null)
const secondScroll = ref<HTMLElement | null>(null)
const periodScroll = ref<HTMLElement | null>(null)

// Time selection state
const selectedHour = ref(6)
const selectedMinute = ref(28)
const selectedSecond = ref(55)
const selectedPeriod = ref<'AM' | 'PM'>('PM')

// Full lists for wheels
const hours = Array.from({ length: 12 }, (_, i) => i + 1)
const minutes = Array.from({ length: 60 }, (_, i) => i)
const seconds = Array.from({ length: 60 }, (_, i) => i)
const periods = ['AM', 'PM'] as const

const ITEM_HEIGHT = 56 // Matches h-14 (14 * 4px)

// Current view date (month/year being displayed)
const currentDate = ref(new Date())

// Initialize from prop if exists
onMounted(() => {
  if (props.modelValue) {
    const [datePart, timePart] = props.modelValue.split(' ')
    currentDate.value = new Date(datePart)
    
    if (timePart) {
      const [h, m, s] = timePart.split(':').map(Number)
      if (!isNaN(h)) {
        selectedHour.value = h > 12 ? h - 12 : (h === 0 ? 12 : h)
        selectedPeriod.value = h >= 12 ? 'PM' : 'AM'
      }
      if (!isNaN(m)) selectedMinute.value = m
      if (!isNaN(s)) selectedSecond.value = s
    }
  }
})

// Scroll synchronization
const syncScrolls = () => {
  if (viewMode.value !== 'time') return
  
  nextTick(() => {
    if (hourScroll.value) hourScroll.value.scrollTop = (selectedHour.value - 1) * ITEM_HEIGHT
    if (minuteScroll.value) minuteScroll.value.scrollTop = selectedMinute.value * ITEM_HEIGHT
    if (secondScroll.value) secondScroll.value.scrollTop = selectedSecond.value * ITEM_HEIGHT
    if (periodScroll.value) periodScroll.value.scrollTop = (selectedPeriod.value === 'AM' ? 0 : 1) * ITEM_HEIGHT
  })
}

watch(viewMode, (newVal) => {
  if (newVal === 'time') {
    syncScrolls()
  }
})


const handleScroll = (type: 'hour' | 'minute' | 'second' | 'period', event: Event) => {
  const target = event.target as HTMLElement
  const index = Math.round(target.scrollTop / ITEM_HEIGHT)
  
  if (type === 'hour') {
    const val = hours[index]
    if (val !== undefined) selectedHour.value = val
  } else if (type === 'minute') {
    const val = minutes[index]
    if (val !== undefined) selectedMinute.value = val
  } else if (type === 'second') {
    const val = seconds[index]
    if (val !== undefined) selectedSecond.value = val
  } else if (type === 'period') {
    const val = periods[index]
    if (val !== undefined) selectedPeriod.value = val
  }
}

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
  // Handle space-separated date and time
  const [dateStr, timeStr] = props.modelValue.split(' ')
  const date = new Date(dateStr)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  let result = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  if (timeStr) {
    result += ` ${timeStr}`
  }
  return result
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

const isBeforeToday = (dateObj: Date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const d = new Date(dateObj)
  d.setHours(0, 0, 0, 0)
  return d < today
}

const isSelectionFuture = computed(() => {
  if (!props.modelValue) return false
  const selected = new Date(props.modelValue.split(' ')[0])
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  selected.setHours(0, 0, 0, 0)
  return selected > today
})

const isInRange = (dateObj: Date) => {
  if (!isSelectionFuture.value) return false
  const selected = new Date(props.modelValue.split(' ')[0])
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  selected.setHours(0, 0, 0, 0)
  const d = new Date(dateObj)
  d.setHours(0, 0, 0, 0)

  return d > today && d < selected
}

const isPrevMonthDisabled = computed(() => {
  const today = new Date()
  return currentDate.value.getMonth() === today.getMonth() && 
         currentDate.value.getFullYear() === today.getFullYear()
})

const selectDate = (day: any) => {
  if (isBeforeToday(day.date)) return
  
  const d = day.date
  // Format to YYYY-MM-DD
  const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  
  // Keep existing time if any
  const timeStr = props.modelValue.includes(' ') ? props.modelValue.split(' ')[1] : '06:28:55'
  
  emit('update:modelValue', `${dateStr} ${timeStr}`)
  // Ensure the view switches to the selected month if clicking a padded day
  currentDate.value = new Date(d.getFullYear(), d.getMonth(), 1)
}

const confirmDate = () => {
  viewMode.value = 'time'
}

const confirmTime = () => {
  // Convert 12h to 24h
  let h = selectedHour.value
  if (selectedPeriod.value === 'PM' && h < 12) h += 12
  if (selectedPeriod.value === 'AM' && h === 12) h = 0
  
  const timeStr = `${String(h).padStart(2, '0')}:${String(selectedMinute.value).padStart(2, '0')}:${String(selectedSecond.value).padStart(2, '0')}`
  const dateStr = props.modelValue.split(' ')[0]
  
  emit('update:modelValue', `${dateStr} ${timeStr}`)
  emit('confirm')
  isOpen.value = false
  // Reset for next open
  setTimeout(() => {
    viewMode.value = 'date'
  }, 300)
}
</script>

<template>
  <div class="relative w-full" ref="popoverRef">
    <!-- Trigger Button (only if not standalone) -->
    <button 
      v-if="!standalone"
      type="button"
      @click="isOpen = !isOpen"
      class="bg-[#f4f5f8] rounded-2xl flex items-center justify-between px-4 h-[56px] w-full text-[16px] outline-none border transition-colors relative"
      :class="isOpen ? 'border-[#8B2CF5] bg-white' : 'border-transparent text-[#9ca3af] hover:bg-[#eef0f3]'"
    >
      <span v-if="formattedSelection" class="text-[#1a1a1a] font-medium">{{ formattedSelection }}</span>
      <span v-else class="text-[#9ca3af]">Select Date</span>
      
      <svg class="w-5 h-5 text-[#4b5563] absolute right-4 transition-transform duration-200" :class="{ 'rotate-180': isOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Popover / Inline Picker -->
    <div 
      v-if="isOpen || standalone" 
      :class="[
        standalone 
          ? 'w-full bg-[#F9F5FF] rounded-[24px] p-0' 
          : 'absolute bottom-[64px] sm:bottom-auto sm:top-[64px] left-0 md:left-auto md:right-0 bg-[#F9F5FF] rounded-[24px] p-6 shadow-2xl w-full z-50 animate-fade-in custom-dropdown border border-gray-100'
      ]"
    >
      <!-- Date View -->
      <template v-if="viewMode === 'date'">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <button 
            @click="!isPrevMonthDisabled && prevMonth()" 
            class="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-sm transition-all"
            :class="isPrevMonthDisabled ? 'opacity-30 cursor-not-allowed text-gray-400' : 'hover:shadow-md hover:bg-gray-50 text-[#1a1a1a]'"
            :disabled="isPrevMonthDisabled"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div class="flex items-center gap-3">
            <div class="bg-transparent rounded-[14px] px-5 py-2.5 font-black text-[#1a1a1a] flex items-center gap-2 text-[20px] relative">
              {{ currentMonthName }}
              <svg class="w-2.5 h-2.5 text-[#8B2CF5] absolute bottom-1.5 right-1.5" viewBox="0 0 10 10" fill="currentColor">
                <polygon points="0,10 10,10 10,0"/>
              </svg>
            </div>
            <div class="bg-transparent rounded-[14px] px-5 py-2.5 font-black text-[#1a1a1a] flex items-center gap-2 text-[20px] relative">
              {{ currentYear }}
              <svg class="w-2.5 h-2.5 text-[#8B2CF5] absolute bottom-1.5 right-1.5" viewBox="0 0 10 10" fill="currentColor">
                <polygon points="0,10 10,10 10,0"/>
              </svg>
            </div>
          </div>
          
          <button @click="nextMonth" class="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all text-[#1a1a1a]">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Days of Week Header -->
        <div class="grid grid-cols-7 gap-2 mb-3">
          <div v-for="day in ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']" :key="day" class="text-center font-bold text-[#1a1a1a] text-[16px] h-8 flex items-center justify-center">
            {{ day }}
          </div>
        </div>

        <!-- Calendar Grid -->
        <div class="grid grid-cols-7 gap-y-2 gap-x-0 mb-6 relative">
          <div 
            v-for="(day, index) in calendarDays" 
            :key="index"
            class="h-12 relative flex items-center justify-center transition-all duration-200"
            :class="[
              isInRange(day.date) ? 'bg-[#8B2CF5]/10' : '',
              isToday(day.date) && isSelectionFuture ? 'bg-[#8B2CF5]/10 rounded-l-[12px]' : '',
              isSelected(day.date) && isSelectionFuture ? 'bg-[#8B2CF5]/10 rounded-r-[12px]' : '',
              // Handle row boundaries for continuous feeling
              isInRange(day.date) && (index % 7 === 0) ? 'rounded-l-[12px]' : '',
              isInRange(day.date) && (index % 7 === 6) ? 'rounded-r-[12px]' : '',
            ]"
          >
            <!-- Day Cell Background/Button -->
            <div 
              class="h-full w-full flex items-center justify-center text-[16px] transition-all duration-200"
              :class="[
                // Boundary States (Solid Purple)
                (isSelected(day.date) && isSelectionFuture) || (isToday(day.date) && isSelectionFuture)
                  ? 'bg-[#8B2CF5] text-white font-black shadow-lg shadow-[#8B2CF5]/40 rounded-[12px] scale-105 z-10' 
                  : '',
                // Initial State (Outline Purple for Today)
                isToday(day.date) && !isSelectionFuture
                  ? 'border-[2px] border-[#8B2CF5] text-[#8B2CF5] font-black rounded-[12px] z-10 mx-1'
                  : '',
                // Normal States
                !isToday(day.date) && !isSelected(day.date) && !isInRange(day.date)
                  ? (isBeforeToday(day.date)
                    ? 'text-[#d1d5db] cursor-not-allowed opacity-60 bg-transparent'
                    : 'bg-transparent font-bold text-[#1a1a1a] hover:bg-[#8B2CF5]/10 hover:text-[#8B2CF5] cursor-pointer rounded-[12px] mx-1')
                  : '',
                // Range State (Text only)
                isInRange(day.date) ? 'text-[#8B2CF5] font-bold' : '',
                // Padded days styling
                !day.isCurrentMonth && !isSelected(day.date) && !isToday(day.date) && !isInRange(day.date) && !isBeforeToday(day.date) ? '!text-[#9ca3af] !font-medium' : ''
              ]"
              @click="selectDate(day)"
            >
              {{ day.dayNumber }}
            </div>
          </div>
        </div>

        <!-- Next Step Button -->
        <button 
          @click="confirmDate"
          class="w-full h-14 bg-[#8B2CF5] text-white rounded-[20px] font-bold text-[18px] shadow-lg shadow-[#8B2CF5]/30 hover:opacity-90 active:scale-[0.98] transition-all"
        >
          下一步
        </button>
      </template>

      <!-- Time View -->
      <template v-else>
        <div class="flex flex-col items-center w-full pt-2">
          <!-- Back to Date Selection (Top Left) -->
          <div class="w-full flex justify-start mb-5 -ml-1">
            <button 
              @click="viewMode = 'date'"
              class="text-[#8B2CF5] font-bold text-[16px] hover:underline flex items-center gap-1"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
              </svg>
              返回日期选择
            </button>
          </div>

          <!-- Wheel Picker Container -->
          <div class="w-full relative h-[180px] flex items-center justify-center gap-4 mb-8 bg-[#F9F5FF] rounded-2xl px-2">
            <!-- Background highlight lines for center item -->
            <div class="absolute top-[50%] -translate-y-[28px] left-3 right-3 h-[56px] bg-[#8B2CF5]/5 rounded-none -z-0"></div>
            <div class="absolute top-[50%] -translate-y-[28px] left-3 right-3 h-[1px] bg-[#8B2CF5]/10"></div>
            <div class="absolute top-[50%] translate-y-[28px] left-3 right-3 h-[1px] bg-[#8B2CF5]/10"></div>

            <!-- Scrollable Wheels -->
            <div class="flex items-center justify-center w-full h-full relative">
              <!-- Hour Wheel -->
              <div 
                ref="hourScroll"
                @scroll="handleScroll('hour', $event)"
                class="h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide w-16 text-center"
              >
                <div class="h-[62px]"></div> <!-- Top Padding to center the first item -->
                <div 
                  v-for="h in hours" 
                  :key="h" 
                  class="h-[56px] flex items-center justify-center snap-center text-[22px] font-bold transition-all duration-200"
                  :class="selectedHour === h ? 'text-[#8B2CF5] scale-110' : 'text-[#9ca3af] opacity-50'"
                >
                  {{ String(h).padStart(2, '0') }}
                </div>
                <div class="h-[62px]"></div> <!-- Bottom Padding -->
              </div>

              <span class="text-[20px] font-bold text-[#1a1a1a] mb-0.5">:</span>

              <!-- Minute Wheel -->
              <div 
                ref="minuteScroll"
                @scroll="handleScroll('minute', $event)"
                class="h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide w-16 text-center"
              >
                <div class="h-[62px]"></div>
                <div 
                  v-for="m in minutes" 
                  :key="m" 
                  class="h-[56px] flex items-center justify-center snap-center text-[22px] font-bold transition-all duration-200"
                  :class="selectedMinute === m ? 'text-[#8B2CF5] scale-110' : 'text-[#9ca3af] opacity-50'"
                >
                  {{ String(m).padStart(2, '0') }}
                </div>
                <div class="h-[62px]"></div>
              </div>

              <span class="text-[20px] font-bold text-[#1a1a1a] mb-0.5">:</span>

              <!-- Second Wheel -->
              <div 
                ref="secondScroll"
                @scroll="handleScroll('second', $event)"
                class="h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide w-16 text-center"
              >
                <div class="h-[62px]"></div>
                <div 
                  v-for="s in seconds" 
                  :key="s" 
                  class="h-[56px] flex items-center justify-center snap-center text-[22px] font-bold transition-all duration-200"
                  :class="selectedSecond === s ? 'text-[#8B2CF5] scale-110' : 'text-[#9ca3af] opacity-50'"
                >
                  {{ String(s).padStart(2, '0') }}
                </div>
                <div class="h-[62px]"></div>
              </div>

              <!-- Period Wheel -->
              <div 
                ref="periodScroll"
                @scroll="handleScroll('period', $event)"
                class="h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide w-20 text-center ml-2"
              >
                <div class="h-[62px]"></div>
                <div 
                  v-for="p in periods" 
                  :key="p" 
                  class="h-[56px] flex items-center justify-center snap-center text-[22px] font-bold transition-all duration-200"
                  :class="selectedPeriod === p ? 'text-[#8B2CF5] scale-110' : 'text-[#9ca3af] opacity-50'"
                >
                  {{ p }}
                </div>
                <div class="h-[62px]"></div>
              </div>
            </div>
          </div>

          <!-- Confirm Selection Button -->
          <button 
            @click="confirmTime"
            class="w-full h-14 bg-[#8B2CF5] text-white rounded-[20px] font-bold text-[18px] shadow-lg shadow-[#8B2CF5]/30 hover:opacity-90 active:scale-[0.98] transition-all"
          >
            确认选择
          </button>
        </div>
      </template>
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
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
