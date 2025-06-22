<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import payMenuItem from './components/pay-menu-item.vue'
import pcPayment from './components/pc-payment.vue'
import mobilePayment from './components/mobile-payment.vue'
import { useRouter } from 'vue-router'
import { ref, watch, computed } from 'vue'
import { getVipPayList } from '@/api/pay'
import { useAppStore } from '@/stores/modules/app'
import { usePayStore } from '@/stores/modules/pay'

/**
 * 列表数据
 */
const vipPayListData = ref([])
const getVipPayListData = async () => {
  const res = await getVipPayList()
  vipPayListData.value = res
  currentPayData.value = vipPayListData.value[0] // 选中第一项
}
getVipPayListData()

// navbar
const appStore = useAppStore()
const router = useRouter()
const onNavbarLeftClick = () => {
  // 配置跳转方式
  appStore.setRouterType('back')
  router.back()
}

/**
 * 选中支付项
 */
const currentPayData = ref({})
const onChangeCurrentPay = (item) => {
  currentPayData.value = item
}

// 优惠金额
const disCount = ref(0.9)
// 优惠金额
const disCountPrice = computed(() => {
  if (!currentPayData.value.price) return
  return (currentPayData.value.price * disCount.value).toFixed(2)
})

// 保存支付数据
const payStore = usePayStore()
watch(currentPayData, () => {
  payStore.setPayData(currentPayData.value)
})
</script>

<template>
  <!-- 背景盒子 -->
  <div class="h-screen bg-zinc-200 dark:bg-zinc-800 overflow-auto lg:pt-10">
    <!-- 中心盒子 -->
    <div
      class="relative lg:w-[50%] mx-auto bg-white dark:bg-zinc-900 duration-400 lg:rounded-sm lg:border-zinc-200 lg:dark:border-[1px] lg:dark:border-zinc-600 lg:px-4 lg:py-2"
    >
      <!-- 移动端 navbar -->
      <m-navbar
        :is-sticky="true"
        v-if="isMobileTerminal"
        :onLeftClick="onNavbarLeftClick"
      >
        <template #left>
          <m-svg-icon
            icon-class="back"
            class="w-2 h-2"
            fill-class="fill-zinc-900 dark:fill-zinc-200"
          />
        </template>
        精选会员
      </m-navbar>

      <div class="py-2 px-1">
        <h2
          class="text-center text-[34px] font-bold tracking-widest text-yellow-600"
        >
          精选VIP
        </h2>
        <p class="text-center text-lg text-yellow-500">
          升级精选VIP，畅想所有内容
        </p>
        <div
          class="flex justify-between mt-5 overflow-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
        >
          <pay-menu-item
            v-for="item in vipPayListData"
            :key="item.id"
            :hot="item.isHot"
            :select="item.id === currentPayData.id"
            :data="item"
            @click="onChangeCurrentPay"
          ></pay-menu-item>
        </div>
        <p class="mt-1 text-sm text-zinc-500">{{ currentPayData.desc }}</p>

        <!-- PC端样式 -->
        <pc-payment
          v-if="!isMobileTerminal"
          :dis-count="disCount"
          :dis-count-price="disCountPrice"
          :current-pay-data="currentPayData"
        ></pc-payment>
        <!-- 移动端样式 -->
        <mobile-payment
          v-else
          :dis-count="disCount"
          :dis-count-price="disCountPrice"
          :current-pay-data="currentPayData"
        ></mobile-payment>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
