<script setup lang="ts">
defineProps<{
  image: string
  title: string
  dateRange: string
  eventCount: string
}>()
</script>

<template>
  <div class="group cursor-pointer transition-all duration-300 p-2 rounded-[24px] border border-transparent hover:border-white hover:bg-gradient-to-b hover:from-[#f1e8ff] hover:to-white hover:shadow-purple">
    <div class="rounded-[20px] overflow-hidden transition-colors duration-300 group-hover:bg-transparent bg-white">
      <!-- Image Container with 16px rounded corners -->
      <div class="relative aspect-[3/4] overflow-hidden rounded-[16px] mb-4">
        <img 
          :src="image" 
          :alt="title"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <!-- Content Area -->
      <div class="space-y-1 px-1 pb-2">
        <h3 class="text-[1.2rem] font-bold text-[#1a1a1a] leading-[1.2] line-clamp-2 transition-colors duration-300 group-hover:text-[#a855f7]">
          {{ title }}
        </h3>
        <div class="text-[0.9rem] text-gray-500 font-medium tracking-tight transition-colors duration-300 group-hover:text-[#c084fc]">
          <p>{{ dateRange }}</p>
          <p>{{ eventCount }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hover\:shadow-purple:hover {
  box-shadow: 0 8px 24px -8px rgba(139, 44, 245, 0.3);
}
</style>
