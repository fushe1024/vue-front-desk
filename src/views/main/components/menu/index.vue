<script setup>
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '@/stores/modules/category'
const { categorys } = storeToRefs(useCategoryStore())

defineEmits(['onItemClick'])
</script>

<template>
  <div class="menu">
    <div class="py-2 h-[80vh] flex flex-col">
      <h2 class="text-xl text-zinc-900 font-bold mb-2 px-1 dark:text-zinc-200">
        所有分类
      </h2>
      <ul class="overflow-y-auto">
        <!-- itemx 项 -->
        <li
          v-for="(item, index) in categorys"
          :key="item.id"
          class="text-lg text-zinc-900 px-1 py-1.5 duration-100 dark:hover:text-zinc-300 active:dark:bg-zinc-900"
          @click="$emit('onItemClick', item, index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
