<script setup>
import Menu from '../../menu/index.vue'
import { ref, onBeforeUpdate, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '@/stores/modules/category'
const { categorys } = storeToRefs(useCategoryStore())

// 滑块样式
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '46px'
})

// 当前选中的索引 & 所有item 项
const currentIndex = ref(0)
const itemRefs = ref([])

// 添加所有item Dom 元素
const setItemRef = (el) => {
  if (el) itemRefs.value.push(el)
}

// listRef 元素
const listRef = ref(null)
// 通过 vueuse 获取获取响应式 scroll 距离
const { x } = useScroll(listRef)

// 监听 currentIndex 变化
watch(currentIndex, (val) => {
  // 获取当前 item 项的 left 和 width
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
  const { left, width } = itemRefs.value[val].getBoundingClientRect()

  // 更新滑块样式
  sliderStyle.value = {
    transform: `translateX(${x.value + left - 10}px)`,
    width: `${width}px`
  }
})

// 点击 item 项时触发
const handleClick = (index) => {
  currentIndex.value = index
  isPopup.value = false
}

// 更新前重置 itemRefs 数组
onBeforeUpdate(() => {
  itemRefs.value = []
})

// popup 是否显示
const isPopup = ref(false)
</script>

<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
      ref="listRef"
    >
      <!-- 汉堡按钮 -->
      <li
        class="fixed top-0 right-[-1px] z-20 h-4 px-1 flex items-center shadow-l-white bg-white"
        @click="isPopup = true"
      >
        <m-svg-icon class="w-1.5 h-1.5" iconClass="hamburger"></m-svg-icon>
      </li>

      <!-- 滑块 -->
      <li
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200"
        :style="sliderStyle"
      ></li>

      <!-- itemx 项 -->
      <li
        v-for="(item, index) in categorys"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{ 'text-zinc-100': currentIndex === index }"
        :ref="setItemRef"
        @click="handleClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>

    <!-- popup -->
    <m-popup v-model="isPopup">
      <Menu @onItemClick="handleClick" />
    </m-popup>
  </div>
</template>

<style scoped></style>
