<script setup lang="ts">
interface TicketProps {
  id: number | string
  title: string
  type: string
  time: string
  address: string
  seat: string
  price: number | string
  image: string
  isActive?: boolean
}

defineProps<{
  ticket: TicketProps
}>()
</script>

<template>
  <div 
    class="rounded-[24px] p-6 transition-all duration-300 relative group cursor-pointer border"
    :class="[
      ticket.isActive 
        ? 'border-[#8b3dff] shadow-[0_8px_30px_rgba(139,61,255,0.12)] bg-[#f9f5ff]' 
        : 'border-transparent bg-[#f9f5ff] hover:border-[#8b3dff] hover:shadow-[0_8px_30px_rgba(139,61,255,0.12)]'
    ]"
  >
    <!-- Top Row: Image & Title/Tag -->
    <div class="flex gap-4 mb-6">
      <!-- Image -->
      <div class="w-[72px] h-[90px] shrink-0 rounded-[10px] overflow-hidden bg-gray-100 shadow-sm">
         <img :src="ticket.image" :alt="ticket.title" class="w-full h-full object-cover">
      </div>
      
      <!-- Title & Tag -->
      <div class="flex flex-col flex-1 min-w-0">
         <h3 class="text-[#2a2a2a] font-normal leading-[1.3] mb-2 text-[18px] line-clamp-2">
           {{ ticket.title }}
         </h3>
         <div class="inline-flex self-start px-3 py-0.5 border border-[#8b3dff] rounded-full">
           <span class="text-[13px] text-[#8b3dff] leading-none">{{ ticket.type }}</span>
         </div>
      </div>
    </div>

    <!-- Details Grid -->
    <div class="space-y-3.5 mb-6">
      <div class="flex items-start text-[15px] leading-tight">
        <span class="text-[#666666] shrink-0 w-[50px]">场次</span>
        <span class="flex-1 text-[#2a2a2a] text-right font-medium break-words">{{ ticket.time }}</span>
      </div>
      <div class="flex items-start text-[15px] leading-tight">
        <span class="text-[#666666] shrink-0 w-[50px]">地址</span>
        <span class="flex-1 text-[#2a2a2a] text-right font-medium break-words line-clamp-1">{{ ticket.address }}</span>
      </div>
      <div class="flex items-start text-[15px] leading-tight">
        <span class="text-[#666666] shrink-0 w-[50px]">座位</span>
        <span class="flex-1 text-[#2a2a2a] text-right font-medium break-words">{{ ticket.seat }}</span>
      </div>
    </div>

    <!-- Dashed Divider -->
    <div class="h-px w-full mb-6" style="background-image: linear-gradient(to right, #e8e8e8 50%, transparent 50%); background-size: 14px 1px; background-repeat: repeat-x;"></div>

    <!-- Bottom Row: Price & Action -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-1.5">
        <span class="text-[15px] text-[#2a2a2a] relative top-[2px]">票面价格</span>
        <span class="text-[26px] font-bold text-[#f11a8a] leading-none tracking-tight flex items-baseline">
          <span class="text-[22px] font-bold">$&nbsp;</span>{{ ticket.price }}
        </span>
      </div>
      
      <!-- Action Button -->
      <button class="px-7 py-2.5 rounded-full bg-[#8b3dff] hover:bg-[#7a2ce0] text-white flex items-center justify-center transition-colors shadow-sm">
        <span class="text-[16px] font-medium leading-none">去挂售</span>
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
