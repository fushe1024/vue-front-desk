<script setup>
import { ref } from 'vue'

const props = defineProps({
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

const isDisCount = ref(true) // 是否显示限时特惠
const coupon = ref(5) // 优惠券金额
const isPopup = ref(false)

// 选择优惠券
const handlePay = () => {
  isPopup.value = true
}

// 去支付
const goPay = () => {
  isPopup.value = false
  console.log('currentPayData', props.currentPayData)
}
</script>

<template>
  <div
    class="fixed left-0 bottom-0 w-screen text-center bg-white dark:bg-zinc-800 flex flex-col"
  >
    <!-- 限时特惠 -->
    <div
      v-show="isDisCount"
      class="flex justify-center items-center py-0.5 bg-orange-100 border-orange-300 border-t lg:border lg:rounded-sm text-sm text-red-600 font-bold"
    >
      <m-svg-icon
        icon-class="countdown"
        class="w-1.5 h-1.5 mr-1"
        fill-class="fill-red-600"
      ></m-svg-icon>

      <div class="mr-1">限时特惠 {{ disCount * 10 }}折 | 距离优惠结束仅剩</div>
      <m-count-down
        :time="1000 * 10"
        class="text-sm"
        @finish="isDisCount = false"
      ></m-count-down>
    </div>

    <!-- 支付金额 -->
    <div
      class="flex justify-between text-xs px-1 py-0.5 bg-white dark:bg-zinc-800"
    >
      <div class="flex flex-col items-start dark:text-zinc-200">
        <div class="text-xs">
          折扣合计：
          <span class="text-red-600 text-sm">
            ¥
            <span class="text-base">
              {{ isDisCount ? disCountPrice : currentPayData.price }}
            </span>
          </span>
        </div>
        <div class="text-xs text-red-600">优惠券：立减 ¥ {{ coupon }}</div>
      </div>
      <div>
        <m-button class="w-[130px]" :is-animate="false" @click="handlePay">
          立即开通
        </m-button>
      </div>
    </div>
    <m-popup v-model="isPopup" class="rounded-t-sm">
      <div class="px-1 py-2">
        <h2
          class="text-xl text-zinc-900 dark:text-zinc-200 font-bold mb-2 px-1"
        >
          选择以下支付方式
        </h2>
        <div
          @click="goPay"
          class="mt-3 rounded-sm h-[60px] px-2 flex items-center cursor-pointer duration-200"
        >
          <img class="w-[40px]" src="../../../assets/images/alipay.png" />
          <p class="text-xl ml-1 text-zinc-800 dark:text-zinc-200">支付宝</p>
        </div>
      </div>
    </m-popup>
  </div>
</template>

<style scoped></style>
