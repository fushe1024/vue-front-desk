<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  },
  width: {
    type: Number
  }
})
</script>

<template>
  <!-- item 项 -->
  <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
    <!-- content 部分 -->
    <div class="relative w-full rounded cursor-zoom-in group">
      <!-- 图片 -->
      <img
        :src="data.photo"
        class="w-full rounded bg-transparent"
        :style="{
          height: (width / data.photoWidth) * data.photoHeight + 'px'
        }"
      />
      <!-- 遮罩层 -->
      <div
        class="opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100 xl:block"
      >
        <!-- 分享 -->
        <m-button class="absolute top-1.5 left-1.5">分享</m-button>
        <!-- 收藏 -->
        <m-button
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="heart"
          icon-class="fill-zinc-900 dark:fill-zinc-200"
        />
        <!-- 下载 -->
        <m-button
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="download"
          icon-class="fill-zinc-900 dark:fill-zinc-200"
        />
        <!-- 全屏 -->
        <m-button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="full"
          icon-class="fill-zinc-900 dark:fill-zinc-200"
        />
      </div>
    </div>
    <!-- 标题 -->
    <h2
      class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 line-clamp-1 px-1"
    >
      {{ data.title }}
    </h2>
    <!-- 作者 -->
    <div class="flex items-center mt-1 px-1">
      <img :src="data.avatar" alt="" class="rounded-full h-2 w-2" />
      <span class="text-sm text-zinc-500 ml-1">{{ data.author }}</span>
    </div>
  </div>
</template>

<style scoped></style>
