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
</script>

<template>
  <div class="rounded-[24px] p-6 bg-[#f9f5ff] transition-all duration-300 relative border border-transparent hover:border-[#8b3dff] hover:shadow-[0_8px_30px_rgba(139,61,255,0.12)]">
    <!-- Top Row: Expiry Timer and Status Badge -->
    <div class="flex items-center justify-between mb-4">
      <div class="text-[#ff4d4f] text-[15px] font-medium leading-none">
        距离自动下架: {{ ticket.expiryTime }}
      </div>
      <div class="px-2 py-1 bg-[#fff7e6] rounded-[6px]">
        <span class="text-[#fa8c16] text-[14px] font-medium leading-none">{{ ticket.status }}</span>
      </div>
    </div>

    <!-- Main Info: Image and Description -->
    <div class="flex gap-4 mb-6">
      <!-- Image -->
      <div class="w-[64px] h-[80px] shrink-0 rounded-[10px] overflow-hidden bg-gray-100 shadow-sm">
         <img :src="ticket.image" :alt="ticket.title" class="w-full h-full object-cover">
      </div>
      
      <!-- Content -->
      <div class="flex flex-col flex-1 min-w-0">
         <h3 class="text-[#2a2a2a] font-normal leading-[1.3] mb-2 text-[18px] line-clamp-2">
           {{ ticket.title }}
         </h3>
         <div class="inline-flex self-start px-3 py-0.5 border border-[#8b3dff] rounded-full">
           <span class="text-[13px] text-[#8b3dff] leading-none">{{ ticket.type }}</span>
         </div>
      </div>
    </div>

    <!-- Details Table-like Layout -->
    <div class="space-y-3.5 mb-6">
      <div class="flex items-start text-[15px] leading-tight">
        <span class="text-[#999999] shrink-0 w-[50px]">场次</span>
        <span class="flex-1 text-[#2a2a2a] text-right font-medium">{{ ticket.time }}</span>
      </div>
      <div class="flex items-start text-[15px] leading-tight">
        <span class="text-[#999999] shrink-0 w-[50px]">地址</span>
        <span class="flex-1 text-[#2a2a2a] text-right font-medium line-clamp-1">{{ ticket.address }}</span>
      </div>
      <div class="flex items-start text-[15px] leading-tight">
        <span class="text-[#999999] shrink-0 w-[50px]">座位</span>
        <span class="flex-1 text-[#2a2a2a] text-right font-medium">{{ ticket.seat }}</span>
      </div>
    </div>

    <!-- Divider -->
    <div class="h-px w-full mb-6" style="background-image: linear-gradient(to right, #e8e8e8 50%, transparent 50%); background-size: 14px 1px; background-repeat: repeat-x;"></div>

    <!-- Bottom Row: Prices and Action -->
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <div class="flex items-center gap-1.5">
          <span class="text-[14px] text-[#2a2a2a] font-medium relative top-[2px]">挂售价格</span>
          <span class="text-[24px] font-bold text-[#f21b8c] leading-none tracking-tight flex items-baseline">
            <span class="text-[22px] font-bold">$&nbsp;</span>{{ ticket.price }}
          </span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="text-[14px] text-[#2a2a2a] font-medium">预计到手价</span>
          <span class="text-[15px] font-bold text-[#8b3dff] leading-none">
            ${{ ticket.payout }}
          </span>
        </div>
      </div>
      
      <!-- Action Button -->
      <button class="px-6 py-2.5 rounded-full bg-[#a855f7] hover:bg-[#9333ea] text-white text-[15px] font-bold transition-all shadow-sm">
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
