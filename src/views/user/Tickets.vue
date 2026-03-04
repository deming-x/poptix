<script setup lang="ts">
import { ref } from 'vue'
import UserTicketCard from '../../components/user/UserTicketCard.vue'
import SellingTicketCard from '../../components/user/SellingTicketCard.vue'
import ResaleModal from '../../components/user/ResaleModal.vue'
import UnlistConfirmModal from '../../components/user/UnlistConfirmModal.vue'
import HistoryTicketCard from '../../components/user/HistoryTicketCard.vue'

const activeTab = ref('inventory')
const currentPage = ref(1)

const tabs = [
  { id: 'inventory', label: '票夹仓库(2)' },
  { id: 'selling', label: '正在挂售' },
  { id: 'history', label: '历史记录' },
]

// Mock data for tickets based on the design
const mockTickets = ref([
  {
    id: 1,
    title: '2025-26 Aespa LIVE TOUR – SYNK',
    type: '实体票',
    time: '周一 2026/01/26 19:00',
    address: '香港九龙启德乘启道38号',
    seat: '107A 14排 12号',
    price: 1080,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop' // Placeholder portrait
  },
  {
    id: 2,
    title: '2025-26 Aespa LIVE TOUR – SYNK',
    type: '实体票',
    time: '周一 2026/01/26 19:00',
    address: '香港九龙启德乘启道38号',
    seat: '107A 14排 12号',
    price: 1080,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 3,
    title: '2025-26 Aespa LIVE TOUR – SYNK',
    type: '实体票',
    time: '周一 2026/01/26 19:00',
    address: '香港九龙启德乘启道38号',
    seat: '107A 14排 12号',
    price: 1080,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
  },
    {
    id: 4,
    title: '2025-26 Aespa LIVE TOUR – SYNK',
    type: '实体票',
    time: '周一 2026/01/26 19:00',
    address: '香港九龙启德乘启道38号',
    seat: '107A 14排 12号',
    price: 1080,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
  }
])

const sellingTickets = ref([
  {
    id: 1,
    title: '2025-26 Aespa LIVE TOUR – SYNK: AeXIS LINE –香港站',
    type: '实体票',
    time: '周一 2026/01/26 19:00',
    address: '香港九龙启德乘启道38号',
    seat: '107A 14排 12号',
    price: 1280,
    payout: 1180,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    expiryTime: '2026-03-10 18:28:55',
    status: '挂售中'
  },
  {
    id: 2,
    title: '2025-26 Aespa LIVE TOUR – SYNK: AeXIS LINE –香港站',
    type: '实体票',
    time: '周一 2026/01/26 19:00',
    address: '香港九龙启德乘启道38号',
    seat: '107A 14排 12号',
    price: 1280,
    payout: 1180,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    expiryTime: '2026-03-10 18:28:55',
    status: '挂售中'
  },
  {
    id: 3,
    title: '2025-26 Aespa LIVE TOUR – SYNK: AeXIS LINE –香港站',
    type: '实体票',
    time: '周一 2026/01/26 19:00',
    address: '香港九龙启德乘启道38号',
    seat: '107A 14排 12号',
    price: 1280,
    payout: 1180,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    expiryTime: '2026-03-10 18:28:55',
    status: '挂售中'
  },
  {
    id: 4,
    title: '2025-26 Aespa LIVE TOUR – SYNK: AeXIS LINE –香港站',
    type: '实体票',
    time: '周一 2026/01/26 19:00',
    address: '香港九龙启德乘启道38号',
    seat: '107A 14排 12号',
    price: 1280,
    payout: 1180,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    expiryTime: '2026-03-10 18:28:55',
    status: '挂售中'
  }
])

const historyTickets = ref([
  {
    id: 1,
    title: '2025-26 Aespa LIVE TOUR – SYNK: AeXIS LINE –香港站',
    type: '实体票',
    time: '周一 2026/01/26 19:00',
    address: '香港九龙启德乘启道38号',
    seat: '107A 14排 12号',
    price: 1280,
    payout: 1180,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    transactionTime: '2026/02/28 01:28:24',
    status: '已结算'
  },
  {
    id: 2,
    title: '2025-26 Aespa LIVE TOUR – SYNK: AeXIS LINE –香港站',
    type: '实体票',
    time: '周一 2026/01/26 19:00',
    address: '香港九龙启德乘启道38号',
    seat: '107A 14排 12号',
    price: 1280,
    payout: 1180,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    transactionTime: '2026/02/28 01:28:24',
    status: '已结算'
  },
  {
    id: 3,
    title: '2025-26 Aespa LIVE TOUR – SYNK: AeXIS LINE –香港站',
    type: '实体票',
    time: '周一 2026/01/26 19:00',
    address: '香港九龙启德乘启道38号',
    seat: '107A 14排 12号',
    price: 1280,
    payout: 1180,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    transactionTime: '2026/02/28 01:28:24',
    status: '已结算'
  },
  {
    id: 4,
    title: '2025-26 Aespa LIVE TOUR – SYNK: AeXIS LINE –香港站',
    type: '实体票',
    time: '周一 2026/01/26 19:00',
    address: '香港九龙启德乘启道38号',
    seat: '107A 14排 12号',
    price: 1280,
    payout: 1180,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    transactionTime: '2026/02/28 01:28:24',
    status: '已结算'
  }
])

// Modal State
const isResaleModalOpen = ref(false)
const isUnlistModalOpen = ref(false)
const selectedTicket = ref<any>(null)
const ticketToUnlist = ref<any>(null)

const openResaleModal = (ticket: any) => {
  selectedTicket.value = ticket
  isResaleModalOpen.value = true
}

const closeResaleModal = () => {
  isResaleModalOpen.value = false
  selectedTicket.value = null
}

const handleResaleConfirm = (data: { price: number; endTime: string }) => {
  if (selectedTicket.value) {
    const idx = mockTickets.value.findIndex((t) => t.id === selectedTicket.value.id)
    if (idx !== -1) {
      const ticketToMove = mockTickets.value.splice(idx, 1)[0]
      sellingTickets.value.unshift({
        ...ticketToMove,
        price: data.price,
        payout: Number((data.price * 0.95).toFixed(2)),
        expiryTime: data.endTime,
        status: '挂售中'
      })
    }
  }
  closeResaleModal()
}

const handleDelist = (ticket: any) => {
  ticketToUnlist.value = ticket
  isUnlistModalOpen.value = true
}

const confirmDelist = () => {
  if (!ticketToUnlist.value) return
  
  const ticket = ticketToUnlist.value
  const idx = sellingTickets.value.findIndex(t => t.id === ticket.id)
  if (idx !== -1) {
    const delistedTicket = sellingTickets.value.splice(idx, 1)[0]
    
    // Clean up selling specific properties before adding back
    const { payout, expiryTime, status, ...inventoryTicket } = delistedTicket
    mockTickets.value.unshift(inventoryTicket as any)
  }
  isUnlistModalOpen.value = false
  ticketToUnlist.value = null
}
</script>

<template>
  <div class="px-4 py-4 md:p-6 h-full flex flex-col bg-[#f4f5f8] md:bg-white min-h-screen md:min-h-0">
    <!-- Desktop Header -->
    <h1 class="hidden md:block text-[28px] font-bold text-[#1a1a1a] mb-4">我的票夹</h1>

    <!-- Mobile Header -->
    <div class="flex md:hidden items-center justify-center relative mb-4 h-11">
      <button class="absolute left-0 w-8 h-8 flex items-center justify-center">
        <svg class="w-6 h-6 text-[#1a1a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="text-[17px] font-semibold text-[#1a1a1a]">我的票夹</h1>
    </div>

    <!-- Tabs Container -->
    <div class="relative flex items-center bg-[#ecedf1] md:bg-[#f4f5f8] p-[3px] md:p-1.5 rounded-full mb-4 w-full md:w-auto">
      <!-- Sliding Active Indicator -->
      <div 
        class="absolute left-[3px] md:left-[6px] top-[3px] md:top-[6px] bottom-[3px] md:bottom-[6px] w-[calc((100%-6px)/3)] md:w-[calc((100%-12px)/3)] bg-white md:bg-gradient-to-r md:from-[#8B2CF5] md:to-[#8B2CF5] rounded-full shadow-sm transition-transform duration-300 ease-in-out z-0"
        :style="{
          transform: `translateX(${tabs.findIndex(t => t.id === activeTab) * 100}%)`
        }"
      ></div>

      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="flex-1 py-1.5 md:py-2 text-[14px] md:text-[15px] rounded-full transition-colors duration-300 relative z-10 flex items-center justify-center"
        :class="[
          activeTab === tab.id 
            ? 'text-[#1a1a1a] md:text-white font-bold' 
            : 'text-[#9ca3af] md:text-gray-500 font-medium md:hover:text-gray-900'
        ]"
      >
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <!-- Content Area (Grid) -->
    <div class="flex-1 relative">
      <Transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        mode="out-in"
      >
        <div v-if="activeTab === 'inventory'" class="grid grid-cols-1 md:grid-cols-2 gap-4" key="inventory">
          
          <!-- Ticket Card Component -->
          <UserTicketCard 
            v-for="(ticket, index) in mockTickets" 
            :key="ticket.id"
            :ticket="ticket"
            :isActive="index === 0"
            @resale="openResaleModal(ticket)"
          />

        </div>

        <!-- Empty States (Optional for completeness) -->
        <div v-else-if="activeTab === 'selling'" class="grid grid-cols-1 md:grid-cols-2 gap-4" key="selling">
          <SellingTicketCard 
            v-for="ticket in sellingTickets" 
            :key="ticket.id"
            :ticket="ticket"
            @delist="handleDelist(ticket)"
          />
        </div>
        <div v-else-if="activeTab === 'history'" class="grid grid-cols-1 md:grid-cols-2 gap-4" key="history">
          <HistoryTicketCard 
            v-for="ticket in historyTickets" 
            :key="ticket.id"
            :ticket="ticket"
          />
        </div>
      </Transition>
    </div>

    <!-- Pagination Section -->
    <div v-if="['inventory', 'selling', 'history'].includes(activeTab)" class="mt-4 mb-4 hidden md:flex justify-end">
      <nav class="flex items-center space-x-2">
        <!-- Prev Button -->
        <button 
          @click="currentPage > 1 && (currentPage--)"
          class="w-8 h-8 flex items-center justify-center transition-colors rounded-full"
          :class="[
            currentPage === 1 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-[#1a1a1a] hover:text-[#8B2CF5] hover:bg-[#8B2CF5]/10'
          ]"
          :disabled="currentPage === 1"
        >
           <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
           </svg>
        </button>

        <!-- Dynamic Pages -->
        <button
          v-for="page in 6"
          :key="page"
          @click="currentPage = page"
          class="w-10 h-10 flex items-center justify-center rounded-[16px] font-medium transition-all duration-300"
          :class="[
            currentPage === page
              ? 'bg-[#8B2CF5] text-white font-bold shadow-[0_8px_30px_rgba(139,44,245,0.3)] hover:scale-105'
              : 'bg-[#f4f5f8] text-[#4b5563] hover:bg-white hover:border hover:border-[#8B2CF5] hover:text-[#8B2CF5]'
          ]"
        >
          {{ page }}
        </button>

        <!-- Next Button -->
        <button 
          @click="currentPage < 6 && (currentPage++)"
          class="w-8 h-8 flex items-center justify-center transition-colors rounded-full"
          :class="[
            currentPage === 6 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-[#1a1a1a] hover:text-[#8B2CF5] hover:bg-[#8B2CF5]/10'
          ]"
          :disabled="currentPage === 6"
        >
           <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
           </svg>
        </button>
      </nav>
    </div>

    <!-- Modals -->
    <ResaleModal 
      :isOpen="isResaleModalOpen" 
      :ticket="selectedTicket"
      @close="closeResaleModal"
      @confirm="handleResaleConfirm"
    />

    <UnlistConfirmModal 
      :isOpen="isUnlistModalOpen"
      @close="isUnlistModalOpen = false"
      @confirm="confirmDelist"
    />
  </div>
</template>
