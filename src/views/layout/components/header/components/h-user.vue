<script setup>
import { useRouter } from 'vue-router'
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
 * 菜单点击
 */
const onMenuClick = (path) => {
  router.push(path)
}
</script>

<template>
  <!-- 登陆后显示 -->
  <m-popover v-if="true">
    <template #reference>
      <div
        class="flex items-center p-1 cursor-pointer duration-200 outline-none hover:bg-zinc-100 rounded-sm dark:hover:bg-zinc-900"
      >
        <!-- 头像 -->
        <img
          class="w-3 h-3 rounded-sm mr-0.5"
          src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
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
          v-if="true"
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
  <!-- 未登录 -->
  <m-button v-else icon="profile" class="rounded" @click="login"></m-button>
</template>

<style scoped></style>
