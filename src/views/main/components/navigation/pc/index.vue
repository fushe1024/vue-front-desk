<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '@/stores/modules/category'
const { categorys } = storeToRefs(useCategoryStore())

// 菜单状态切换
const isOpenCategory = ref(false)
const triggerState = () => {
  isOpenCategory.value = !isOpenCategory.value
}

// 点击 item 项时触发
const currentIndex = ref(0)
const handleClick = (index) => {
  currentIndex.value = index
  console.log(index)
}
</script>

<template>
  <div class="sticky top-0 left-0 w-full z-10 bg-white">
    <ul
      class="w-[800px] relative flex justify-center flex-wrap overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto"
      :class="[isOpenCategory ? 'h-[205px]' : 'h-[50px]']"
    >
      <!-- 展示箭头 -->
      <div
        class="absolute bottom-1 right-1 z-20 rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="triggerState"
      >
        <m-svg-icon
          :icon-class="isOpenCategory ? 'fold' : 'unfold'"
          class="w-1.5 h-1.5"
          fill-class="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
      </div>

      <!-- item -->
      <li
        v-for="(item, index) in categorys"
        :key="item.id"
        class="shrink-0 px-1.5 py-0 z-10 duration-200 last:mr-4 text-zinc-900 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 rounded mr-1 mb-1 dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-zinc-900"
        :class="{
          'bg-zinc-200 dark:text-zinc-300 data:bg-zinc-900':
            currentIndex === index
        }"
        @click="handleClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
