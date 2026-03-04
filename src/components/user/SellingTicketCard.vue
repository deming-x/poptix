<script setup lang="ts">
interface SellingTicketProps {
  id: number | string
  title: string
  type: string
  time: string
  address: string
  seat: string
  price: number | string
  payout: number | string
  image: string
  expiryTime: string
  status: string
}

defineProps<{
  ticket: SellingTicketProps
}>()

const emit = defineEmits(['delist'])
</script>

<template>
  <div class="rounded-[16px] md:rounded-[24px] p-4 md:p-6 bg-white md:bg-[#8B2CF5]/5 transition-all duration-300 relative border border-transparent lg:hover:border-[#8B2CF5] lg:hover:shadow-[0_8px_30px_rgba(139,61,255,0.12)]">
    <!-- Top Row: Expiry Timer and Status Badge -->
    <div class="flex items-center justify-between mb-4">
      <div class="text-[#F0000F] text-[13px] md:text-[15px] font-medium leading-none">
        距离自动下架: {{ ticket.expiryTime }}
      </div>
      <div class="px-[8px] py-[4px] bg-[#fff7e6] rounded-[8px] md:rounded-full flex items-center justify-center h-fit">
        <span class="text-[#fa8c16] text-[12px] md:text-[14px] font-medium leading-none">{{ ticket.status }}</span>
      </div>
    </div>

    <!-- Main Info: Image and Description -->
    <div class="flex gap-3 md:gap-4 mb-4 md:mb-6">
      <!-- Image -->
      <div class="w-[60px] h-[75px] md:w-[64px] md:h-[80px] shrink-0 rounded-[10px] overflow-hidden bg-gray-100 shadow-sm self-start">
         <img :src="ticket.image" :alt="ticket.title" class="w-full h-full object-cover">
      </div>
      
      <!-- Content -->
      <div class="flex flex-col flex-1 min-w-0">
         <h3 class="text-[#2a2a2a] leading-[1.3] text-[15px] md:text-[18px] line-clamp-2 md:font-normal font-medium mb-1 md:mb-2">
           {{ ticket.title }}
         </h3>
         <div class="inline-flex self-start px-[8px] py-[4px] md:px-3 md:py-0.5 border border-[#8B2CF5] rounded-[8px] md:rounded-full">
           <span class="text-[11px] md:text-[13px] text-[#8B2CF5] leading-none">{{ ticket.type }}</span>
         </div>
      </div>
    </div>

    <!-- Details Table-like Layout -->
    <div class="space-y-2 md:space-y-3.5 mb-3 md:mb-6">
      <div class="flex items-start text-[13px] md:text-[15px] leading-tight flex-row justify-between">
        <span class="text-[#999999] shrink-0">场次</span>
        <span class="text-[#2a2a2a] text-right font-medium break-words">{{ ticket.time }}</span>
      </div>
      <div class="flex items-start text-[13px] md:text-[15px] leading-tight flex-row justify-between">
        <span class="text-[#999999] shrink-0">地址</span>
        <span class="text-[#2a2a2a] text-right font-medium break-words line-clamp-1">{{ ticket.address }}</span>
      </div>
      <div class="flex items-start text-[13px] md:text-[15px] leading-tight flex-row justify-between">
        <span class="text-[#999999] shrink-0">座位</span>
        <span class="text-[#2a2a2a] text-right font-medium break-words">{{ ticket.seat }}</span>
      </div>
    </div>

    <!-- Divider -->
    <div class="h-px w-full mb-3 md:mb-6" style="background-image: linear-gradient(to right, #E5E7EB 50%, transparent 50%); background-size: 14px 1px; background-repeat: repeat-x;"></div>

    <!-- Bottom Row: Prices and Action -->
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <div class="flex items-center gap-1.5">
          <span class="text-[13px] md:text-[14px] text-[#666666] relative top-[0.5px]">挂售价格</span>
          <span class="text-[20px] md:text-[24px] font-bold text-[#f11a8a] leading-none tracking-tight flex items-baseline">
            <span class="text-[17px] md:text-[22px] font-bold">$&nbsp;</span>{{ ticket.price }}
          </span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="text-[13px] md:text-[14px] text-[#999999]">预计到手价</span>
          <span class="text-[14px] md:text-[15px] font-bold text-[#8B2CF5] leading-none">
            ${{ ticket.payout }}
          </span>
        </div>
      </div>
      
      <!-- Action Button -->
      <button @click="emit('delist')" class="px-5 py-2 md:px-6 md:py-2.5 rounded-full bg-[#f4f5f8] md:bg-[#8B2CF5] md:hover:bg-[#9333ea] text-[#1a1a1a] md:text-white text-[14px] md:text-[15px] font-bold transition-all shadow-sm">
        下架商品
      </button>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
