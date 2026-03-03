<script setup lang="ts">
import { ref } from 'vue'
import UserTicketCard from '../../components/user/UserTicketCard.vue'
import SellingTicketCard from '../../components/user/SellingTicketCard.vue'
import ResaleModal from '../../components/user/ResaleModal.vue'

const activeTab = ref('inventory')
const currentPage = ref(1)

const tabs = [
  { id: 'inventory', label: '票夹仓库(2)' },
  { id: 'selling', label: '正在挂售' },
  { id: 'history', label: '历史记录' },
]

// Mock data for tickets based on the design
const mockTickets = [
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
]

const sellingTickets = [
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
    expiryTime: '6天 01:28:24',
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
    expiryTime: '6天 01:28:24',
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
    expiryTime: '6天 01:28:24',
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
    expiryTime: '6天 01:28:24',
    status: '挂售中'
  }
]

// Modal State
const isResaleModalOpen = ref(false)
const selectedTicket = ref<any>(null)

const openResaleModal = (ticket: any) => {
  selectedTicket.value = ticket
  isResaleModalOpen.value = true
}

const closeResaleModal = () => {
  isResaleModalOpen.value = false
  selectedTicket.value = null
}

const handleResaleConfirm = (data: { price: number; endTime: string }) => {
  console.log('Resale confirmed with:', data, 'for ticket:', selectedTicket.value)
  // Logic to handle actual listing goes here
  closeResaleModal()
}
</script>

<template>
  <div class="p-6 h-full flex flex-col">
    <!-- Header -->
    <h1 class="text-[28px] font-bold text-[#1a1a1a] mb-4">我的票夹</h1>

    <!-- Tabs Container -->
    <div class="flex items-center bg-[#f4f5f8] p-1.5 rounded-full mb-4 w-full">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="flex-1 py-2 text-[15px] rounded-full transition-all duration-300 relative overflow-hidden"
        :class="[
          activeTab === tab.id 
            ? 'text-white font-bold bg-gradient-to-r from-[#a855f7] to-[#8b5cf6] shadow-sm' 
            : 'text-gray-500 font-medium hover:text-gray-900 bg-transparent'
        ]"
      >
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <!-- Content Area (Grid) -->
    <div class="flex-1">
      <div v-if="activeTab === 'inventory'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
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
      <div v-else-if="activeTab === 'selling'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SellingTicketCard 
          v-for="ticket in sellingTickets" 
          :key="ticket.id"
          :ticket="ticket"
        />
      </div>
      <div v-else class="flex flex-col items-center justify-center h-64 text-gray-400">
         <svg class="w-16 h-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
         </svg>
         <p>暂无历史记录</p>
      </div>

    </div>

    <!-- Pagination Section -->
    <div v-if="activeTab === 'inventory' || activeTab === 'selling'" class="mt-4 mb-4 flex justify-end">
      <nav class="flex items-center space-x-2">
        <!-- Prev Button -->
        <button 
          @click="currentPage > 1 && (currentPage--)"
          class="w-8 h-8 flex items-center justify-center transition-colors rounded-full"
          :class="[
            currentPage === 1 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-[#1a1a1a] hover:text-[#a855f7] hover:bg-purple-50'
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
              ? 'bg-[#a855f7] text-white font-bold shadow-[0_8px_30px_rgba(168,85,247,0.3)] hover:scale-105'
              : 'bg-[#f4f5f8] text-[#4b5563] hover:bg-white hover:border hover:border-[#a855f7] hover:text-[#a855f7]'
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
              : 'text-[#1a1a1a] hover:text-[#a855f7] hover:bg-purple-50'
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
  </div>
</template>
