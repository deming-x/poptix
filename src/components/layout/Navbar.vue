<script setup lang="ts">
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <div class="bg-gray-50 border-b border-gray-100 py-2 px-4 shadow-sm relative z-[60]">
    <div class="max-w-7xl mx-auto text-center">
      <p class="text-[11px] sm:text-xs text-gray-400 tracking-wide font-medium">
        We're a marketplace for concert tickets. Prices are set by sellers and may be below or above face value.
      </p>
    </div>
  </div>
  <nav class="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 h-[72px] flex items-center">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="flex justify-between items-center h-full">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-gradient-to-br from-[#d946ef] to-[#7c3aed] rounded-xl flex items-center justify-center shadow-sm">
              <span class="text-white text-2xl font-black italic">P</span>
            </div>
            <span class="text-2xl font-black tracking-tight text-[#c026d3]">
              POPTIX
            </span>
          </router-link>
        </div>

        <!-- Right Side Actions (Includes Search Bar) -->
        <div class="flex items-center space-x-6 flex-1 justify-end">
          <!-- Search Bar (Desktop) -->
          <div class="hidden md:flex w-[480px]">
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                class="block w-full bg-[#f3f4f6] border-transparent rounded-full py-2.5 pl-11 pr-4 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8b3dff] focus:bg-white transition-all duration-200"
                placeholder="搜索更多活动/演出/音乐会"
              />
            </div>
          </div>

          <!-- Language/Currency Selector -->
          <div class="hidden lg:flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-gray-900 font-medium whitespace-nowrap">
            <svg class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18" />
            </svg>
            <span class="text-sm">EN</span>
            <span class="text-gray-300">|</span>
            <span class="text-sm">HKD</span>
            <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <!-- Sign In Button -->
          <div class="hidden sm:block">
            <button class="bg-[#8b3dff] hover:bg-[#7c3aed] text-white px-8 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-purple-200 transition-all duration-200 active:scale-95 whitespace-nowrap">
              Sign In
            </button>
          </div>

          <!-- Mobile menu button -->
          <div class="flex items-center md:hidden">
            <button
              @click="toggleMobileMenu"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#8b3dff]"
            >
              <span class="sr-only">Open main menu</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden absolute top-[72px] inset-x-0 bg-white border-b border-gray-100 shadow-xl z-50">
      <div class="px-4 py-4 space-y-4">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            class="block w-full bg-gray-100 border-transparent rounded-full py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8b3dff]"
            placeholder="搜索更多活动/演出/音乐会"
          />
        </div>
        <div class="space-y-1">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            @click="isMobileMenuOpen = false"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#8b3dff]"
          >
            {{ link.name }}
          </router-link>
        </div>
        <div class="pt-4 border-t border-gray-100">
          <button class="w-full bg-[#8b3dff] text-white px-4 py-3 rounded-full text-base font-semibold shadow-lg">
            Sign In
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
