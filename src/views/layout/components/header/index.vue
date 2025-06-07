<script setup>
import logoVue from './components/h-logo.vue'
import searchVue from './components/h-search.vue'
import themeVue from './components/h-theme.vue'
import userVue from './components/h-user.vue'
</script>

<template>
  <div
    class="h-header fiexd top-0 left-0 z-50 w-full bg-white duration-500 dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-700 px-2 py-1"
  >
    <div class="flex items-center h-[100%]">
      <!-- logo -->
      <logo-vue class="mr-2"></logo-vue>
      <!-- 搜索区域 -->
      <search-vue class="flex-1 mr-1"></search-vue>
      <!-- 主题切换 -->
      <theme-vue class="mr-1"></theme-vue>
      <!-- 用户信息 -->
      <user-vue></user-vue>
    </div>
  </div>
</template>

<style scoped></style>
