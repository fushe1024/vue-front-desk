// Pc Routes
export default [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/main/index.vue')
      }
    ]
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
