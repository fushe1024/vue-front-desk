<script setup>
import mobile from './mobile/index.vue'
import pc from './pc/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useCategoryStore } from '@/stores/modules/category'

// 获取分类数据
const { getCategoryData } = useCategoryStore()
getCategoryData()
</script>

<template>
  <mobile v-if="isMobileTerminal"></mobile>
  <pc v-else></pc>
</template>

<style scoped></style>
