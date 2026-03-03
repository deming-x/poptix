<script setup lang="ts">
import EventCard from './EventCard.vue'

defineProps<{
  title: string
  events: Array<{
    id: number
    image: string
    location: string
    title: string
    date: string
    price: string
    discount?: string
  }>
}>()
</script>

<template>
  <section class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Section Header -->
    <div class="flex justify-between items-end mb-6">
      <div class="relative">
        <h2 class="text-2xl font-extrabold text-[#1a1a1a] pb-2">{{ title }}</h2>
        <!-- Purple Underline -->
        <div class="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-[#8b3dff] to-[#ff3b6a] rounded-full"></div>
      </div>
      <button class="flex items-center text-[0.85rem] font-bold text-gray-500 hover:text-gray-900 transition-colors group">
        View All
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Grid Layout -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <EventCard
        v-for="event in events"
        :key="event.id"
        v-bind="event"
      />
    </div>
  </section>
</template>
