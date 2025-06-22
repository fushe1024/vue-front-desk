<script>
const EMITS_CLOSE = 'close'
const EMITS_SUCCESS = 'success'
</script>

<script setup>
import '@/vendor/slider-captcha/slidercaptcha.min.css'
import '@/vendor/slider-captcha/longbow.slidercaptcha.min.js'
import { getCaptcha } from '@/api/sys'
import { onMounted } from 'vue'

const emits = defineEmits([EMITS_CLOSE, EMITS_SUCCESS])

let captcha = null
onMounted(() => {
  // eslint-disable-next-line no-undef
  captcha = sliderCaptcha({
    // 渲染位置
    id: 'captcha',
    // 用户拼图成功之后的回调
    async onSuccess(arr) {
      const res = await getCaptcha({
        behavior: arr
      })
      if (res) {
        emits(EMITS_SUCCESS)
      }
    },
    // 用户拼图失败之后的回调
    onFail() {
      throw new Error('验证失败')
    },
    // 默认的验证方法，咱们不在此处进行验证，而是选择在用户拼图成功之后进行验证，所以此处永远返回为 true
    verify() {
      return true
    }
  })
})

/**
 * 重置
 */
const onReset = () => {
  captcha.reset()
}

/**
 * 关闭
 */
const onClose = () => {
  emits(EMITS_CLOSE)
}
</script>

<template>
  <!-- 遮罩层 -->
  <div
    class="absolute top-0 left-0 w-full h-full bg-zinc-900/50 flex justify-center items-center lg:rounded-sm"
  >
    <div
      class="w-[340px] h-[270px] text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-900"
    >
      <div
        class="flex items-center h-5 text-left px-1 mb-1 border-b-1 border-b-zinc-300"
      >
        <span class="flex-grow text-base dark:text-zinc-200">
          请完成安全验证
        </span>
        <m-svg-icon
          icon-class="refresh"
          fill-class="fill-zinc-900 dark:fill-zinc-200"
          class="w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
          @click="onReset"
        ></m-svg-icon>
        <m-svg-icon
          icon-class="close"
          fill-class="fill-zinc-900 dark:fill-zinc-200"
          class="ml-0.5 w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
          @click="onClose"
        ></m-svg-icon>
      </div>
      <div id="captcha"></div>
    </div>
  </div>
</template>
