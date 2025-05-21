<script setup>
import navigation from './components/navigation/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { getCategoryAPI } from '@/api/category'

const getData = async () => {
  const res = await getCategoryAPI()
  console.log(res)
}
getData()
</script>

<template>
  <h2>{{ isMobileTerminal }}</h2>
  <navigation />
</template>

<style scoped></style>
