<script setup lang="ts">
const banners = [
  {
    id: 1,
    image: '/src/assets/hero-banner.png',
    title: 'aespa LIVE TOUR SYNK : aexis LINE',
    description: '2025-26 aespa LIVE TOUR SYNK : aexis LINE in MACAU'
  },
  // Add more placeholders if needed for carousel simulation
]
</script>

<template>
  <div class="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <!-- Banner Container -->
    <div class="relative overflow-hidden rounded-[2rem] aspect-[21/9] sm:aspect-[2.8/1] group">
      <img
        :src="banners[0].image"
        class="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
        alt="aespa Tour Banner"
      />
      
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/5"></div>

      <!-- Navigation Arrows (Visible on Hover) -->
      <!-- Left Arrow -->
      <button class="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/40 active:scale-90 z-10">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Right Arrow -->
      <button class="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/40 active:scale-90 z-10">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Pagination Dots -->
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2">
        <div 
          v-for="i in 5" 
          :key="i"
          class="h-1.5 rounded-full transition-all duration-300"
          :class="[i === 2 ? 'w-6 bg-[#8B2CF5]' : 'w-4 bg-white/40 hover:bg-white/60 cursor-pointer']"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom rounded corners and shadows if needed beyond Tailwind */
</style>
