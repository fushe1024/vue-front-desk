<script setup>
import { getPexelsList } from '@/api/pexels'
import { isMobileTerminal } from '@/utils/flexible'
import { ref } from 'vue'
import item from './item.vue'

// 列表请求参数
const reqData = ref({
  page: 1,
  size: 20
})

// 获取列表
const pexelsList = ref([])
const getPexelsData = async () => {
  const res = await getPexelsList(reqData.value)
  pexelsList.value = res.list
}
getPexelsData()
</script>

<template>
  <div class="">
    <!-- 瀑布流组件 -->
    <m-waterfall
      class="w-full px-1"
      :data="pexelsList"
      node-key="id"
      :column="isMobileTerminal ? 2 : 5"
      :is-lazy="false"
    >
      <template #default="{ item, width }">
        <item :key="item.id" :data="item" :width="width"></item>
      </template>
    </m-waterfall>
  </div>
</template>

<style scoped></style>
