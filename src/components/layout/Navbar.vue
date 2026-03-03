<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isMobileMenuOpen = ref(false)
const isLoggedIn = ref(false)
const isProfileOpen = ref(false)
const profileRef = ref<HTMLElement | null>(null)

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const toggleProfile = () => {
  isProfileOpen.value = !isProfileOpen.value
}

const handleLogin = () => {
  isLoggedIn.value = true
}

const handleSignOut = () => {
  isLoggedIn.value = false
  isProfileOpen.value = false
}

// Click outside to close profile dropdown
const handleClickOutside = (event: MouseEvent) => {
  if (profileRef.value && !profileRef.value.contains(event.target as Node)) {
    isProfileOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

const menuItems = [
  { name: 'Wallet', path: '/user/wallet', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  { name: 'Tickets', path: '/user/tickets', icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z' },
  { name: 'Coupons', path: '/user/coupons', icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z' }, // Simplified for now
  { name: 'Orders', path: '/user/orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
]
</script>

<template>
  <div class="bg-gray-50 border-b border-gray-100 py-2 px-4 shadow-sm relative z-[60]">
    <div class="max-w-7xl mx-auto text-center">
      <p class="text-[11px] sm:text-xs text-gray-400 tracking-wide font-medium">
        We're a marketplace for concert tickets. Prices are set by sellers and may be below or above face value.
      </p>
    </div>
  </div>
  <nav class="bg-white shadow-sm border-b border-gray-100 h-[72px] flex items-center">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
        <div class="flex items-center space-x-8 flex-1 justify-end">
          <!-- Search Bar (Desktop) -->
          <div class="hidden md:flex w-[400px]">
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                class="block w-full bg-[#f6f7f9] border-transparent rounded-full py-2.5 pl-11 pr-4 text-sm placeholder-gray-400/60 focus:outline-none focus:ring-2 focus:ring-[#8b3dff]/20 focus:bg-white transition-all duration-200"
                placeholder="| 搜索更多活动/演出/音乐会"
              />
            </div>
          </div>

          <!-- Language/Currency Selector -->
          <div class="hidden lg:flex items-center space-x-2.5 text-gray-700 cursor-pointer hover:text-gray-900 font-medium whitespace-nowrap px-2">
            <svg class="h-5 w-5 text-[#1a1a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18" />
            </svg>
            <span class="text-[14px] font-bold">EN</span>
            <span class="text-gray-200 text-[14px]">|</span>
            <span class="text-[14px] font-bold">HKD</span>
            <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <!-- Auth Actions -->
          <div class="hidden sm:block">
            <!-- Logged In State -->
            <div v-if="isLoggedIn" class="relative" ref="profileRef">
              <div @click="toggleProfile" class="flex items-center space-x-3 cursor-pointer group px-1">
                <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#8b3dff]/20 transition-all duration-200">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop" 
                    alt="Jay Chou"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="flex items-center space-x-1">
                  <span class="text-[15px] font-bold text-[#1a1a1a]">Jay Chou</span>
                  <svg class="h-3.5 w-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" :class="{'rotate-180': isProfileOpen}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <!-- Profile Dropdown -->
              <div v-if="isProfileOpen" class="absolute right-0 mt-4 w-[320px] bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 py-8 px-6 z-50 transform origin-top-right transition-all duration-200">
                <!-- Header -->
                <div class="flex flex-col items-center text-center space-y-2 mb-8">
                  <div class="w-20 h-20 rounded-full overflow-hidden mb-2 ring-4 ring-gray-50">
                    <img 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" 
                      alt="Maria Joyyce"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <h2 class="text-[22px] font-bold text-[#1a1a1a]">Maria Joyyce</h2>
                  <p class="text-[14px] text-gray-500 font-medium">Maria.Jiayce@Gmail.Com</p>
                </div>

                <!-- Menu Items -->
                <div class="space-y-2 mb-8">
                  <!-- Profile Button (Gradient) -->
                  <button class="w-full flex items-center justify-between bg-gradient-to-r from-[#b34af1] to-[#f11a8a] text-white p-4 rounded-[20px] shadow-lg shadow-purple-100 hover:scale-[1.02] transition-all duration-200 group/btn">
                    <div class="flex items-center space-x-3">
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span class="text-[18px] font-semibold">Profile</span>
                    </div>
                    <svg class="h-6 w-6 text-white/80 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7-7" />
                    </svg>
                  </button>

                  <!-- Regular Items -->
                  <router-link :to="item.path" v-for="item in menuItems" :key="item.name" class="w-full flex items-center justify-between p-4 rounded-[20px] hover:bg-gray-50 transition-colors group/item" @click="isProfileOpen = false">
                    <div class="flex items-center space-x-3 text-[#1a1a1a]">
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
                      </svg>
                      <span class="text-[18px] font-semibold">{{ item.name }}</span>
                    </div>
                    <svg class="h-6 w-6 text-gray-300 group-hover/item:text-gray-900 group-hover/item:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7-7" />
                    </svg>
                  </router-link>
                </div>

                <!-- Sign Out -->
                <button @click="handleSignOut" class="w-full flex items-center justify-center space-x-3 border border-gray-200 p-4 rounded-full text-[#1a1a1a] hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-bold text-[18px]">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            <!-- Logged Out State -->
            <button 
              v-else
              @click="handleLogin"
              class="bg-[#8b3dff] hover:bg-[#7c3aed] text-white px-8 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-purple-200 transition-all duration-200 active:scale-95 whitespace-nowrap"
            >
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
          <div v-if="isLoggedIn" class="flex items-center space-x-3 px-3">
             <div class="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop" 
                  alt="Jay Chou"
                  class="w-full h-full object-cover"
                />
              </div>
              <span class="text-[15px] font-bold text-[#1a1a1a]">Jay Chou</span>
          </div>
          <button v-else @click="handleLogin" class="w-full bg-[#8b3dff] text-white px-4 py-3 rounded-full text-base font-semibold shadow-lg">
            Sign In
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
