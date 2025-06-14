<script setup>
import { useRouter } from 'vue-router'
import { confirm } from '@/libs'
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()

// menu 数据
const menuData = [
  {
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    title: '升级 VIP',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]

/**
 * 登录
 */
const router = useRouter()
const login = () => {
  router.push('/login')
}

/**
 * 菜单点击 跳转对应页面
 */
const onMenuClick = (path) => {
  if (path) {
    router.push(path)
    return
  }
  confirm({
    content: '您确定要退出登录吗？'
  }).then(() => {
    userStore.logout()
  })
}
</script>

<template>
  <!-- 未登录 -->
  <m-button
    id="guide-my"
    v-if="!userStore.token"
    icon="profile"
    class="rounded"
    @click="login"
  ></m-button>

  <!-- 登陆后显示 -->
  <m-popover v-else>
    <template #reference>
      <div
        id="guide-my"
        class="flex items-center p-1 cursor-pointer duration-200 outline-none hover:bg-zinc-100 rounded-sm dark:hover:bg-zinc-900"
      >
        <!-- 头像 -->
        <img
          v-lazy
          class="w-3 h-3 rounded-sm mr-0.5"
          :src="userStore.userInfo.avatar"
          alt=""
        />
        <!-- 箭头 -->
        <m-svg-icon
          class="w-1 h-1"
          icon-class="down-arrow"
          fill-class="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <!-- vip 标记 -->
        <m-svg-icon
          v-if="userStore.userInfo.vipLevel"
          class="w-1.5 h-1.5 absolute right-[20px] bottom-[5px]"
          icon-class="vip"
        ></m-svg-icon>
      </div>
    </template>

    <!-- 气泡部分 -->
    <div class="w-[140px] overflow-hidden">
      <!--  -->
      <div
        v-for="item in menuData"
        :key="item.icon"
        class="flex items-center rounded cursor-pointer p-1 hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        @click="onMenuClick(item.path)"
      >
        <m-svg-icon
          :icon-class="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fill-class="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-sm text-zinc-800 dark:text-zinc-300">
          {{ item.title }}
        </span>
      </div>
    </div>
  </m-popover>
</template>

<style scoped></style>
