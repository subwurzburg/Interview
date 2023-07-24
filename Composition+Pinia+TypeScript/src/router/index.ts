import { createRouter, createWebHistory } from 'vue-router'
import RandomUser from '@/views/RandomUser.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RandomUser
    }
  ]
})

export default router
