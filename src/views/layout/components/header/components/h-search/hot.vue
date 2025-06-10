<script setup>
import { getHotSelection } from '@/api/pexels'
import { ref } from 'vue'
import { randomRGB } from '@/utils/color'

/**
 * 热门精选
 */
const hotData = ref({
  'bg-img': {},
  list: []
})
const getHotData = async () => {
  const { themes } = await getHotSelection()
  hotData.value = {
    'bg-img': themes[0],
    list: themes.slice(1, themes.length)
  }
}
getHotData()
</script>

<template>
  <div>
    <div class="text-xs mb-1 text-zinc-400">热门精选</div>
    <div class="flex h-[150px]" v-if="hotData.list.length">
      <!-- 左侧大图 -->
      <div
        class="relative rounded w-[260px] cursor-pointer"
        :style="{ backgroundColor: randomRGB() }"
      >
        <img
          class="h-full w-full object-cover rounded"
          v-lazy
          :src="hotData['bg-img'].photo"
        />
        <p
          class="absolute bottom-0 left-0 w-full h-[100%] flex items-center backdrop-blur rounded px-1 text-white text-xs duration-300 hover:backdrop-blur-none"
        >
          # {{ hotData['bg-img'].title }}
        </p>
      </div>

      <!-- 右侧小图 -->
      <div class="flex flex-wrap flex-1 max-w-[860px]">
        <div
          v-for="item in hotData.list"
          :key="item.id"
          class="h-[45%] w-[260px] text-white text-xs relative ml-1.5 mb-1.5 rounded"
          :style="{ backgroundColor: randomRGB() }"
        >
          <img
            class="w-full h-full object-cover rounded"
            v-lazy
            :src="item.photo"
          />
          <p
            class="backdrop-blur absolute top-0 left-0 w-full h-full flex items-center px-1 rounded cursor-pointer duration-300 hover:backdrop-blur-none"
          >
            # {{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
