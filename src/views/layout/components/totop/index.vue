<script setup>
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import steps from './steps'
import { onMounted } from 'vue'
import { FEEDBACK_URL } from '@/constants'

/**
 * 立即吐槽
 */
const onToFeedback = () => {
  window.open(FEEDBACK_URL, '_blank')
}

// driver 实例
let driverTarget = null

/**
 * 初始化引导
 */
onMounted(() => {
  driverTarget = driver({
    showButtons: ['next', 'previous', 'close'],
    nextBtnText: '下一步',
    prevBtnText: '上一步',
    doneBtnText: '完成',
    steps
  })
})

// 点击引导按钮
const onGuideBtn = () => {
  driverTarget.drive()
}
</script>

<template>
  <div class="fixed bottom-10 right-2">
    <!-- 引导按钮 -->
    <div
      id="guide-start"
      class="w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex items-center justify-center cursor-pointer duration-200 hover:shadow-lg group"
      @click="onGuideBtn"
    >
      <m-svg-icon
        class="w-2 h-2"
        icon-class="guide"
        fill-class="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
      />
    </div>

    <!-- 反馈 -->
    <m-popover
      id="guide-feedback"
      class="flex items-center guide-feedback"
      placement="top-left"
    >
      <!-- 气泡触发部分 -->
      <template #reference>
        <div
          class="w-4 h-4 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg"
        >
          <m-svg-icon
            icon-class="feedback"
            class="w-2 h-2"
            fill-class="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main "
          />
        </div>
      </template>

      <!-- 气泡内容部分 -->
      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
          @click="onToFeedback"
        >
          <m-svg-icon
            icon-class="feedback"
            class="w-1.5 h-1.5 mr-1"
            fill-class="fill-zinc-900 dark:fill-zinc-300"
          />
          <span class="text-zinc-800 dark:text-zinc-300 text-sm">
            立即吐槽
          </span>
        </div>
      </div>
    </m-popover>
  </div>
</template>

<style scoped></style>
