<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import { useRouter } from 'vue-router'

const router = useRouter()

const backHome = () => {
  router.replace('/')
}
</script>

<template>
  <div class="h-screen w-screen flex justify-center items-center">
    <div
      class="flex items-center justify-center"
      :class="{ 'flex-col': isMobileTerminal }"
    >
      <div
        class="text-2xl m-4"
        :class="isMobileTerminal ? 'w-[200px]' : 'w-[400px]'"
      >
        <img
          src="https://zos.alipayobjects.com/rmsportal/UXamdIxYSkXfoVo.jpg"
          alt=""
        />
      </div>
      <div class="text-xl">
        <h2>"抱歉，您访问的页面不存在!"</h2>
        <m-button @click="backHome" class="mx-auto mt-5" :is-animate="false"
          >返回主页</m-button
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
