<script setup>
const props = defineProps({
  // 左侧按钮回调
  onLeftClick: {
    type: Function
  },
  // 右侧按钮回调
  onRightClick: {
    type: Function
  },
  // 是否吸顶
  isSticky: {
    type: Boolean,
    default: true
  }
})

/**
 * 左侧按钮点击事件
 */
const leftClick = () => {
  if (props.onLeftClick) {
    props.onLeftClick()
  }
}

/**
 * 右侧按钮点击事件
 */
const rightClick = () => {
  if (props.onRightClick) {
    props.onRightClick()
  }
}
</script>

<template>
  <div
    class="w-full h-5 border-b flex items-center z-10 bg-white dark:bg-zinc-800 border-b-zinc-200 dark:border-b-zinc-700"
    :class="[isSticky ? 'sticky top-0 left-0' : 'relative']"
  >
    <!-- 左 -->
    <div
      class="h-full w-5 absolute left-0 flex items-center justify-center"
      @click="leftClick"
    >
      <slot name="left">
        <m-svg-icon
          icon-class="back"
          class="w-2 h-2"
          fill-class="fill-zinc-900 dark:fill-zinc-200"
        />
      </slot>
    </div>
    <!-- 中 -->
    <div
      class="h-full flex items-center justify-center m-auto font-bold text-base text-zinc-900 dark:text-zinc-200"
    >
      <slot></slot>
    </div>
    <!-- 右 -->
    <div
      class="h-full w-5 absolute right-0 flex items-center justify-center"
      @click="rightClick"
    >
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped></style>
