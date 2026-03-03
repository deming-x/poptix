<script setup lang="ts">
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isUserRoute = computed(() => route.path.startsWith('/user'))
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col">
    <div :class="{ 'hidden md:block': isUserRoute }">
      <Navbar />
    </div>
    
    <main class="flex-grow w-full">
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-1"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <div :class="{ 'hidden md:block': isUserRoute }">
      <Footer />
    </div>
  </div>
</template>

<style>
/* Custom transitions can be added here if needed */
</style>
