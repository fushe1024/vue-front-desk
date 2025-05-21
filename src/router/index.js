import { createRouter, createWebHistory } from 'vue-router'
import { isMobileTerminal } from '@/utils/flexible'
import pc from './modules/pc-routes'
import mobile from './modules/mobile-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: isMobileTerminal.value ? mobile : pc
})

export default router
