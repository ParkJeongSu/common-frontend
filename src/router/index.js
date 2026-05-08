import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'main',
      component: MainLayout,
      // 메인 레이아웃 아래에 기본적으로 표시될 '가짜' 페이지를 연결할 수도 있지만,
      // 우리는 TabView 방식을 쓸 것이므로 일단 레이아웃만 띄워봅니다.
    }
  ],
})

export default router
