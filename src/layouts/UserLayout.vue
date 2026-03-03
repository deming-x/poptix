<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navGroups = [
  {
    items: [
      { name: '我的订单', path: '/user/orders' },
      { name: '我的钱包', path: '/user/wallet' },
      { name: '我的票夹', path: '/user/tickets' },
      { name: '我的优惠券', path: '/user/coupons' },
    ]
  },
  {
    title: '个人中心',
    items: [
      { name: '我的个人资料', path: '/user/profile' },
      { name: '寄送地址', path: '/user/address' },
      { name: '修改密码', path: '/user/password' },
    ]
  }
]
</script>

<template>
  <div class="min-h-screen bg-[#f4f4f7] pt-[32px] pb-12">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row gap-8">
        
        <!-- Sidebar -->
        <aside class="w-full lg:w-[280px] shrink-0">
          <div class="bg-white rounded-[24px] shadow-sm p-6 sticky top-[104px]">
            <!-- User Info -->
            <div class="flex items-center space-x-3 mb-8">
              <div class="w-12 h-12 rounded-full overflow-hidden border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" 
                  alt="Maria Joyyce"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="overflow-hidden">
                <h3 class="text-[16px] font-bold text-[#1a1a1a] truncate">Maria Joyyce</h3>
                <p class="text-[12px] text-gray-500 truncate">Maria.Jiayce@Gmail.Com</p>
              </div>
            </div>

            <!-- Navigation Links -->
            <nav class="space-y-6">
              <template v-for="(group, groupIndex) in navGroups" :key="groupIndex">
                <div>
                  <div 
                    v-if="group.title" 
                    class="flex items-center justify-between text-[#1a1a1a] font-medium px-4 py-2 cursor-pointer mb-1 hover:text-gray-600 transition-colors"
                  >
                    <span class="text-[15px]">{{ group.title }}</span>
                    <svg class="h-5 w-5 rotate-180" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  
                  <ul class="space-y-1">
                    <li v-for="item in group.items" :key="item.path">
                      <router-link 
                        :to="item.path"
                        class="block px-4 py-3 rounded-xl text-[15px] font-medium transition-colors"
                        :class="[
                          route.path.startsWith(item.path)
                            ? 'bg-[#f3e8ff] text-[#8b3dff]'
                            : 'text-gray-600 hover:bg-gray-50'
                        ]"
                      >
                        {{ item.name }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </template>
            </nav>
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="flex-1 bg-white rounded-[32px] shadow-sm min-h-[600px] overflow-hidden">
          <router-view />
        </main>
        
      </div>
    </div>
  </div>
</template>
