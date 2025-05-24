<script setup>
import mobile from './mobile/index.vue'
// import pc from './pc/index.vue'
import { ref } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import { getCategoryAPI } from '@/api/category'
import { ALL_CATEGORY_ITEM } from '@/constants'

// 获取分类数据
const categorys = ref([])
const getData = async () => {
  const res = await getCategoryAPI()
  categorys.value = res.categorys
  categorys.value.unshift(ALL_CATEGORY_ITEM)
  console.log(categorys.value)
}
getData()
</script>

<template>
  <mobile v-if="isMobileTerminal" :data="categorys" />
</template>

<style scoped></style>
