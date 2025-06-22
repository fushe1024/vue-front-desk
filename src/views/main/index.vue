<script setup>
import navigation from './components/navigation/index.vue'
import list from './components/list/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/modules/user'
import { useAppStore } from '@/stores/modules/app'
import { useRouter } from 'vue-router'
import { useScroll } from '@vueuse/core'
import { ref, onActivated } from 'vue'
const appStore = useAppStore()
const { token } = storeToRefs(useUserStore())
const router = useRouter()

// 跳转会员中心
const onVipClick = () => {
  appStore.setRouterType('push')
  router.push('/member')
}

// 跳转个人中心 或 登录
const onUserClick = () => {
  appStore.setRouterType('push')
  if (!token.value) {
    router.push('/login')
  } else {
    router.push('/profile')
  }
}

// 记录当前页面滚动位置
const containerRef = ref(null)
const { y: scrollTopY } = useScroll(containerRef)

// 被缓存的组件再次可见，会调用 onActivated 方法
onActivated(() => {
  if (!containerRef.value) return
  // 页面滚动到之前的位置
  containerRef.value.scrollTop = scrollTopY.value
})
</script>

<template>
  <div
    ref="containerRef"
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
  >
    <!-- 导航栏 -->
    <navigation></navigation>

    <!-- 列表 -->
    <div class="max-w-lg mx-auto relative m-1 lg:mt-4">
      <list></list>
    </div>

    <!-- 移动端触发菜单 -->
    <m-trigger-menu
      v-if="isMobileTerminal"
      class="fixed bottom-3 left-[50%] translate-x-[-50%]"
    >
      <m-trigger-menu-item
        icon="home"
        icon-class="fill-zinc-400 dark:fill-zinc-500"
        text-class="text-zinc-400 dark:text-zinc-500"
        path="/"
      >
        首页
      </m-trigger-menu-item>
      <m-trigger-menu-item
        v-if="token"
        icon="vip"
        icon-class="fill-zinc-400 dark:fill-zinc-500"
        text-class="text-zinc-400 dark:text-zinc-500"
        @click="onVipClick"
      >
        VIP
      </m-trigger-menu-item>
      <m-trigger-menu-item
        icon="profile"
        icon-class="fill-zinc-400 dark:fill-zinc-500"
        text-class="text-zinc-400 dark:text-zinc-500"
        @click="onUserClick"
      >
        {{ token ? '我的' : '去登录' }}
      </m-trigger-menu-item>
    </m-trigger-menu>
  </div>
</template>

<style scoped></style>
