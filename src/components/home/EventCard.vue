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
  <div class="bg-white rounded-[1.5rem] overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <!-- Image Container -->
    <div class="relative aspect-square overflow-hidden rounded-[1.5rem]">
      <img 
        :src="image" 
        :alt="title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
    
    <!-- Content Area -->
    <div class="p-4 space-y-1.5">
      <p class="text-[0.75rem] text-gray-500 font-medium tracking-wide uppercase">{{ location }}</p>
      <h3 class="text-[0.95rem] font-bold text-gray-900 leading-tight line-clamp-2 min-h-[2.4rem]">
        {{ title }}
      </h3>
      <p class="text-[0.85rem] text-gray-600 font-medium">{{ date }}</p>
      
      <div class="flex items-center space-x-2 pt-1">
        <span class="text-[1.1rem] font-extrabold text-[#1a1a1a]">{{ price }}</span>
        <span v-if="discount" class="bg-[#fff0f3] text-[#ff3b6a] text-[0.7rem] font-bold px-1.5 py-0.5 rounded-md">
          {{ discount }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom clamping for title if needed beyond Tailwind */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
