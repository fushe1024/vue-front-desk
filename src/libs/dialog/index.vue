<script setup>
import mButton from '@/libs/button/index.vue'

const isVisable = defineModel('modelValue')

const props = defineProps({
  title: {
    type: String
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

// 全局关闭动画时间
const duration = '0.3s'

/**
 * 关闭 confirm，保留动画执行时长
 */
const close = () => {
  isVisable.value = false
  if (props.close) {
    props.close()
  }
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
        class="max-w-[80%] h-[80%] overflow-auto fixed top-[10%] left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm dark:border-zinc-600 bg-white dark:bg-zinc-800 lg:min-w-[45%]"
      >
        <!-- 标题 -->
        <div
          v-if="title"
          class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2"
        >
          <span>{{ title }}</span>
        </div>

        <!-- 内容 -->
        <div>
          <slot></slot>
        </div>

        <!-- 按钮 -->
        <div class="flex justify-end mt-1" v-if="onCancel || onConfirm">
          <m-button type="primary" @click="onCancelClick">
            {{ cancelButtonText }}
          </m-button>
          <m-button class="ml-2" @click="onConfirmClick">
            {{ confirmButtonText }}
          </m-button>
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
