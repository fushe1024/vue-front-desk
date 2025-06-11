<script setup>
import { THEME } from '@/constants'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores//modules/theme'
const { setTheme } = useThemeStore()
const { theme } = storeToRefs(useThemeStore())

// 主题切换项数据
const itemData = [
  {
    type: THEME.LIGHT,
    icon: 'theme-light',
    title: '极简白'
  },
  {
    type: THEME.DARK,
    icon: 'theme-dark',
    title: '极夜黑'
  },
  {
    type: THEME.SYSTEM,
    icon: 'theme-system',
    title: '跟随系统'
  }
]

// 计算当前主题 Icon
const currentThemeIcon = computed(() => {
  return itemData.find((item) => item.type === theme.value).icon
})

// 切换主题 (点击) - 调用 Store 方法
const handleThemeChange = (item) => {
  setTheme(item.type)
}
</script>

<template>
  <m-popover>
    <template #reference>
      <m-svg-icon
        id="guide-theme"
        :icon-class="currentThemeIcon"
        class="w-4 h-4 p-1 cursor-pointer duration-200 outline-none hover:bg-zinc-100/60 rounded-sm dark:hover:bg-zinc-900"
        fill-class="fill-zinc-900 dark:fill-zinc-300"
      ></m-svg-icon>
    </template>
    <!-- 气泡部分 -->
    <div class="w-[140px] overflow-hidden">
      <div
        v-for="item in itemData"
        :key="item.type"
        class="flex items-center rounded cursor-pointer p-1 hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        @click="handleThemeChange(item)"
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
