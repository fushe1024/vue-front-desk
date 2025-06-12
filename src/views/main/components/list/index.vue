<script setup>
import item from './item.vue'
import pinsVue from '@/views/pins/components/pins.vue'
import { getPexelsList } from '@/api/pexels'
import { isMobileTerminal } from '@/utils/flexible'
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/modules/app'
const { categoryId, searchText } = storeToRefs(useAppStore())
import { gsap } from 'gsap'
import { useEventListener } from '@vueuse/core'

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

// 重置数据
const listRef = ref(null)
const resetData = (newQuery) => {
  // 合并新的请求参数
  reqData.value = {
    ...reqData.value,
    ...newQuery
  }
  // 重置状态
  pexelsList.value = []
  isFinished.value = false
  isLoading.value = false
  listRef.value.emitLoad()
}

// 监听 categoryId 的变化
watch(categoryId, (newCategoryId) => {
  // 重置请求参数数据
  resetData({
    categoryId: newCategoryId,
    page: 1
  })
})

// 监听 searchText 的变化
watch(searchText, (newSearchText) => {
  // 重置请求参数数据
  resetData({
    searchText: newSearchText,
    page: 1
  })
})

// 控制 pins 展示
const isVisable = ref(false)
// 当前选中的 pins 属性
const currentPins = ref(null)

/**
 * 进入 pins 详情
 * @param {*} item 图片数据
 */
const onToPin = (item) => {
  history.pushState(null, '', `/pins/${item.id}`)
  currentPins.value = item
  isVisable.value = true
}

/**
 * 监听路由变化
 */
useEventListener(window, 'popstate', () => {
  isVisable.value = false
})

/**
 * 进入动画开始前
 */
const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.center?.x,
    translateY: currentPins.value.center?.y,
    opacity: 0
  })
}
/**
 * 进入动画执行中
 */
const enter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    translateX: 0,
    translateY: 0,
    onComplete: done
  })
}
/**
 * 离开动画执行中
 */
const leave = (el) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    x: currentPins.value.center?.x,
    y: currentPins.value.center?.y,
    opacity: 0
  })
}
</script>

<template>
  <div>
    <!-- 长列表组件 -->
    <m-infinite-list
      ref="listRef"
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
          <item
            :key="item.id"
            :data="item"
            :width="width"
            @click="onToPin"
          ></item>
        </template>
      </m-waterfall>
    </m-infinite-list>

    <!-- 大图详情处理 -->
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <pins-vue v-if="isVisable" :id="currentPins.id"></pins-vue>
    </transition>
  </div>
</template>

<style scoped></style>
