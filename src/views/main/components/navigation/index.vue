<script setup>
import mobile from './mobile/index.vue'
import pc from './pc/index.vue'
import { isMobileTerminal } from '@/utils/flexible'

// 触发分类数据请求
import { useCategoryStore } from '@/stores/modules/category'
const { getCategoryData } = useCategoryStore()
getCategoryData()
</script>

<template>
  <mobile v-if="isMobileTerminal"></mobile>
  <pc v-else></pc>
</template>

<style scoped></style>
