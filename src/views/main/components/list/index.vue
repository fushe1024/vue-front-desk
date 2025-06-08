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

// 是否处于 loading 状态
const isLoading = ref(false)
// 数据是否加载完成
const isFinished = ref(false)
// 列表数据
const pexelsList = ref([])

// 获取列表数据
const getPexelsData = async () => {
  // 如果数据加载完成，直接返回
  if (isFinished.value) return

  // 第一次请求，后续加载让 page + 1
  if (pexelsList.value.length) {
    reqData.value.page++
  }

  // 触发接口请求
  const res = await getPexelsList(reqData.value)

  // 第一次请求直接赋值，后续请求追加数据源
  if (reqData.value.page === 1) {
    pexelsList.value = res.list
  } else {
    // 后续请求追加数据源
    pexelsList.value = [...pexelsList.value, ...res.list]
    // 或者 pexelsList.value.push(...res.list)
  }

  // 判断数据是否全部加载完成
  if (pexelsList.value.length === res.total) {
    isFinished.value = true
  }

  // 数据加载完成，设置 loading 状态为 false
  isLoading.value = false
}
</script>

<template>
  <div>
    <!-- 长列表组件 -->
    <m-infinite-list
      v-model:loading="isLoading"
      :isFinished="isFinished"
      @onLoad="getPexelsData"
    >
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
    </m-infinite-list>
  </div>
</template>

<style scoped></style>
