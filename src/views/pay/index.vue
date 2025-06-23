<script setup>
import { getPayResult } from '@/api/pay'
import { ref } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { isMobileTerminal } from '@/utils/flexible'
const router = useRouter()
const route = useRoute()

// 支付结果
const isSuccess = ref(null)
// 获取支付结果
const getResult = async () => {
  isSuccess.value = await getPayResult(route.query.out_trade_no)
}
getResult()

const userStore = useUserStore()

// 返回主页
const backHome = () => {
  userStore.getUserData()
  router.replace('/')
}
</script>

<template>
  <!-- 背景盒子 -->
  <div class="h-screen bg-zinc-200 dark:bg-zinc-800 overflow-auto lg:pt-10">
    <!-- 中心盒子 -->
    <div
      class="relative lg:w-[50%] mx-auto bg-white dark:bg-zinc-900 duration-400 lg:rounded-sm lg:border-zinc-200 lg:dark:border-[1px] lg:dark:border-zinc-600 py-10"
      :class="{ 'h-full': isMobileTerminal }"
    >
      <div
        v-if="JSON.stringify(isSuccess) !== 'null'"
        class="flex justify-center items-center"
      >
        <m-svg-icon
          v-if="isSuccess"
          icon-class="pay-success"
          class="w-8 h-8 mr-4"
        ></m-svg-icon>
        <m-svg-icon
          v-if="!isSuccess"
          icon-class="pay-fail"
          class="w-8 h-8 mr-4"
        ></m-svg-icon>
        <p class="text-ml text-zinc-900 dark:text-zinc-200">
          {{ isSuccess ? '支付成功' : '支付失败' }}
        </p>
      </div>

      <m-button @click="backHome" class="mx-auto mt-5">返回主页</m-button>
    </div>
  </div>
</template>

<style scoped></style>
