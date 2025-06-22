<script setup>
import { ref } from 'vue'

defineProps({
  disCount: {
    type: Number,
    default: 0.9
  },
  disCountPrice: {
    type: String,
    default: ''
  },
  currentPayData: {
    type: Object,
    default: () => {}
  }
})

const isDisCount = ref(true)
</script>

<template>
  <!-- 限时特惠 -->
  <div
    v-show="isDisCount"
    class="mt-4 flex justify-center items-center py-0.5 bg-orange-100 border-orange-300 border-t lg:border lg:rounded-sm text-sm text-red-600 font-bold"
  >
    <m-svg-icon
      icon-class="countdown"
      class="w-1.5 h-1.5 mr-1"
      fill-class="fill-red-600"
    ></m-svg-icon>

    <div class="mr-1">限时特惠 {{ disCount * 10 }}折 | 距离优惠结束仅剩</div>
    <m-count-down
      :time="1000 * 10"
      class="text-lg"
      @finish="isDisCount = false"
    ></m-count-down>
  </div>
  <div
    class="flex flex-col items-center justify-evenly border-zinc-200 dark:border-zinc-600 border-[1px] py-3 rounded-md mt-1"
  >
    <div class="text-lg dark:text-zinc-200">
      支付金额：
      <span class="text-orange-500">
        ¥
        <b class="text-[32px] font-medium">
          {{ isDisCount ? disCountPrice : currentPayData.price }}
        </b>
      </span>
    </div>
    <div
      @click="goPay"
      class="mt-3 border border-zinc-200 dark:border-zinc-600 rounded-sm h-[60px] px-2 flex items-center cursor-pointer duration-200 hover:bg-zinc-50 hover:dark:bg-zinc-800"
    >
      <img class="w-[40px]" src="../../../assets/images/alipay.png" />
      <p class="text-xl ml-1 text-zinc-800 dark:text-zinc-200">支付宝</p>
    </div>
  </div>
</template>

<style scoped></style>
