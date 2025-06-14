<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import { ref } from 'vue'
import { getPexelsDetail } from '@/api/pexels'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

// 详情数据
const pexelsData = ref({})
const getPexelsData = async () => {
  const res = await getPexelsDetail(props.id)
  pexelsData.value = res
}
getPexelsData()

/**
 * 处理返回事件
 */
const onClose = () => {
  router.back()
}

/**
 * 分享
 */
const onShare = () => {
  console.log('分享')
}

/**
 * 收藏
 */
const onCollect = (id) => {
  console.log('收藏：', id)
}
</script>

<template>
  <div
    class="fixed left-0 top-0 w-screen h-screen z-20 backdrop-blur-4xl dark:bg-zinc-800 pb-2 overflow-y-auto bg-transparent lg:p-2"
  >
    <!-- 移动端下展示顶部 navbar -->
    <m-navbar
      v-if="isMobileTerminal"
      :is-sticky="true"
      :onLeftClick="onClose"
      :onRightClick="onShare"
    >
      <template #left>
        <m-svg-icon
          icon-class="back"
          class="w-2 h-2"
          fill-class="fill-zinc-900 dark:fill-zinc-200"
        />
      </template>
      {{ pexelsData.title }}
      <template #right>
        <m-svg-icon
          icon-class="share"
          class="w-3 h-3"
          fill-class="fill-zinc-900 dark:fill-zinc-200"
        ></m-svg-icon>
      </template>
    </m-navbar>

    <!-- pc 端下展示关闭图标 -->
    <m-svg-icon
      v-else
      icon-class="close"
      class="w-3 h-3 ml-1 p-0.5 cursor-pointer duration-200 rounded-sm hover:bg-zinc-100 absolute right-2 top-2"
      fill-class="fill-zinc-400"
      @click="onClose"
    ></m-svg-icon>

    <!-- content 区域 -->
    <div class="lg:w-[80%] lg:h-full lg:mx-auto lg:rounded-lg lg:flex">
      <!-- 左侧图片 -->
      <img
        class="w-screen mb-2 lg:w-3/5 lg:h-full lg:rounded-tl-lg lg:rounded-bl-lg"
        :src="pexelsData.photo"
      />

      <!-- 右侧详情 -->
      <div
        class="lg:w-2/5 lg:h-full lg:bg-white lg:dark:bg-zinc-900 lg:rounded-tr-lg lg:rounded-br-lg lg:p-3"
      >
        <!-- PC端才展示 分享和收藏 -->
        <div v-if="!isMobileTerminal" class="flex justify-between mb-2">
          <m-svg-icon
            icon-class="share"
            class="w-4 h-4 p-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-300 rounded"
            fill-class="fill-zinc-900 dark:fill-zinc-200"
            @click="onShare"
          />
          <m-button
            type="info"
            icon="heart"
            icon-class="fill-zinc-900 dark:fill-zinc-200"
            @click="onCollect(pexelsData.id)"
          />
        </div>

        <!-- 标题 -->
        <h2
          class="text-base text-zinc-900 dark:text-zinc-200 ml-1 font-bold lg:text-xl lg:mb-5"
        >
          {{ pexelsData.title }}
        </h2>

        <!-- 作者 -->
        <div class="flex items-center mt-1 px-1">
          <img v-lazy class="h-3 w-3 rounded-full" :src="pexelsData.avatar" />
          <span class="text-base text-zinc-900 dark:text-zinc-200 ml-1">
            {{ pexelsData.author }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
