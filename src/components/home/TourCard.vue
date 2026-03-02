<script setup lang="ts">
defineProps<{
  image: string
  title: string
  dateRange: string
  eventCount: string
}>()
</script>

<template>
  <div class="bg-white group cursor-pointer transition-all duration-300">
    <!-- Image Container with generous rounded corners -->
    <div class="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-sm mb-4">
      <img 
        :src="image" 
        :alt="title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
    
    <!-- Content Area -->
    <div class="space-y-1 px-1">
      <h3 class="text-[1.35rem] font-bold text-[#1a1a1a] leading-[1.2] line-clamp-2">
        {{ title }}
      </h3>
      <div class="text-[0.95rem] text-gray-500 font-medium tracking-tight">
        <p>{{ dateRange }}</p>
        <p>{{ eventCount }}</p>
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
</style>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
