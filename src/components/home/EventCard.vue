<script setup lang="ts">
defineProps<{
  image: string
  location: string
  title: string
  date: string
  price: string
  discount?: string
}>()
</script>

<template>
  <div class="group cursor-pointer transition-all duration-300 p-2 rounded-[24px] border border-transparent hover:border-white hover:bg-gradient-to-b hover:from-[#f1e8ff] hover:to-white hover:shadow-purple">
    <div class="rounded-[20px] overflow-hidden transition-colors duration-300 group-hover:bg-transparent bg-white h-full flex flex-col">
      <!-- Image Container -->
      <div class="relative aspect-[3/4] overflow-hidden rounded-[16px]">
        <img 
          :src="image" 
          :alt="title"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <!-- Content Area -->
      <div class="p-3 space-y-1.5 flex-grow">
        <p class="text-[0.7rem] text-gray-500 font-medium tracking-wide uppercase transition-colors duration-300 group-hover:text-[#c084fc]">{{ location }}</p>
        <h3 class="text-[0.95rem] font-bold text-gray-900 leading-tight line-clamp-2 min-h-[2.4rem] transition-colors duration-300 group-hover:text-[#a855f7]">
          {{ title }}
        </h3>
        <p class="text-[0.85rem] text-gray-600 font-medium transition-colors duration-300 group-hover:text-[#c084fc]">{{ date }}</p>
        
        <div class="flex items-center space-x-2 pt-1">
          <span class="text-[1.1rem] font-extrabold text-[#1a1a1a] transition-colors duration-300 group-hover:text-[#a855f7]">{{ price }}</span>
          <span v-if="discount" class="bg-[#fff0f3] text-[#ff3b6a] text-[0.7rem] font-bold px-1.5 py-0.5 rounded-md transition-opacity duration-300">
            {{ discount }}
          </span>
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
