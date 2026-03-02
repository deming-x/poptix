<script setup lang="ts">
import HomeBanner from '../components/home/HomeBanner.vue'
import EventSection from '../components/home/EventSection.vue'

const recentlyViewedEvents = [
  {
    id: 1,
    image: '/src/assets/event-1.png',
    location: 'Hongkong',
    title: 'The Fact Music Awards 2025 Adcc',
    date: '2026/02/28 Sat 16:00',
    price: '$257+',
    discount: '7%OFF'
  },
  {
    id: 2,
    image: '/src/assets/event-2.png',
    location: 'Hongkong',
    title: 'The Fact Music Awards 2025 Adcc',
    date: '2026/02/28 Sat 16:00',
    price: '$257+',
    discount: '7%OFF'
  },
  {
    id: 3,
    image: '/src/assets/event-3.png',
    location: 'Hongkong',
    title: 'The Fact Music Awards 2025 Adcc',
    date: '2026/02/28 Sat 16:00',
    price: '$257+',
    discount: '7%OFF'
  },
  {
    id: 4,
    image: '/src/assets/event-4.png',
    location: 'Hongkong',
    title: 'The Fact Music Awards 2025 Adcc',
    date: '2026/02/28 Sat 16:00',
    price: '$257+',
    discount: '7%OFF'
  }
]
</script>

<template>
  <main class="min-h-screen bg-white">
    <!-- Hero Banner -->
    <HomeBanner />
    
    <!-- Recently Viewed Section -->
    <EventSection 
      title="Recently Viewed" 
      :events="recentlyViewedEvents" 
    />
    
    <!-- Other sections can be added here -->
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <!-- Section Content -->
    </div>
  </main>
</template>
