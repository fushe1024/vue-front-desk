// Mobile routes
export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/main/index.vue')
  },
  {
    path: '/pins/:id',
    name: 'pins',
    component: () => import('@/views/pins/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile/index.vue')
  },
  {
    path: '/member',
    name: 'member',
    component: () => import('@/views/member/index.vue')
  }
]
