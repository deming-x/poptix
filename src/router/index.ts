import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
        path: '/user',
        component: () => import('../layouts/UserLayout.vue'),
        children: [
            {
                path: 'tickets',
                name: 'UserTickets',
                component: () => import('../views/user/Tickets.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
