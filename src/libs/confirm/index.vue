<script setup>
import mButtom from '../button/index.vue'
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '提示'
  },
  content: {
    type: String,
    required: true
  },
  confirmButtonText: {
    type: String,
    default: '确定'
  },
  cancelButtonText: {
    type: String,
    default: '取消'
  },
  onConfirm: {
    type: Function
  },
  onCancel: {
    type: Function
  },
  close: {
    type: Function
  }
})

// 控制显示处理
const isVisable = ref(false)

/**
 * 显示 confirm
 */
const show = () => {
  isVisable.value = true
}

/**
 * 页面构建完成之后，执行。保留动画
 */
onMounted(() => {
  show()
})

// 全局关闭动画时间
const duration = '0.5s'
// 计算 setTimeout 执行时间
const time = computed(() => {
  return parseInt(duration.replace('0.', '').replace('s', '')) * 100
})

/**
 * 关闭 confirm，保留动画执行时长
 */
const close = () => {
  isVisable.value = false
  setTimeout(() => {
    if (props.close) {
      props.close()
    }
  }, time.value)
}

/**
 * 取消按钮点击事件
 */
const onCancelClick = () => {
  if (props.onCancel) {
    props.onCancel()
  }
  close()
}

/**
 * 确定按钮点击事件
 */
const onConfirmClick = () => {
  if (props.onConfirm) {
    props.onConfirm()
  }
  close()
}
</script>

<template>
  <div>
    <!-- 蒙版区域 -->
    <transition name="fade">
      <div
        v-if="isVisable"
        @click="close"
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
      ></div>
    </transition>
    <!-- 内容 -->
    <transition name="up">
      <div
        v-if="isVisable"
        class="w-[80%] fixed top-1/3 left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 lg:w-[35%]"
      >
        <!-- 标题 -->
        <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
          {{ title }}
        </div>
        <!-- 内容 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          {{ content }}
        </div>
        <!-- 按钮 -->
        <div class="flex justify-end">
          <m-buttom type="info" class="mr-2" @click="onCancelClick">
            {{ cancelButtonText }}
          </m-buttom>
          <m-buttom type="primary" @click="onConfirmClick">
            {{ confirmButtonText }}
          </m-buttom>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all v-bind(duration);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all v-bind(duration);
}

.up-enter-from,
.up-leave-to {
  transform: translateY(100px);
}
</style>
