<script setup>
import { watch } from 'vue'
import { useScrollLock } from '@vueuse/core'

// 是否显示 popup 组件
const isPopup = defineModel('modelValue') // 3.4.0 新增

// 是否锁定滚动
// https://vueuse.org/core/useScrollLock
const isLocked = useScrollLock(document.body)

// 监听 isPopup 变化
watch(isPopup, (val) => {
  isLocked.value = val
})
</script>

<template>
  <div class="popup-box">
    <Teleport to="body">
      <!-- 遮罩层 -->
      <Transition name="fade">
        <div
          v-if="isPopup"
          class="w-screen h-screen fixed top-0 le bg-zinc-900/65 t-0 z-40"
          @click="isPopup = false"
        ></div>
      </Transition>

      <!-- 内容区域 -->
      <Transition name="popup-down-up">
        <div
          v-if="isPopup"
          class="w-screen bg-white z-50 fixed left-0 bottom-0 dark:bg-zinc-800"
          v-bind="$attrs"
        >
          <!-- 插槽 -->
          <slot></slot>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
// 遮罩层动画
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// 内容区域动画
.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}

.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
