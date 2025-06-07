<script setup>
import { ref, onMounted, watch, nextTick, onUnmounted } from 'vue'
import {
  getImgElements,
  getImgSrcs,
  waitImgsLoaded,
  getMinColumn,
  getMinHeight,
  getMaxHeight
} from './utils'

const props = defineProps({
  // 列表数据
  data: {
    type: Array,
    required: true
  },
  // 节点key
  nodeKey: {
    type: String
  },
  // 列数
  column: {
    type: Number,
    default: 2
  },
  // 列间距
  columnGap: {
    type: Number,
    default: 20
  },
  // 行间距
  rowGap: {
    type: Number,
    default: 20
  },
  // 是否懒加载
  isLazy: {
    type: Boolean,
    default: false
  }
})

// 容器高度 - 最高列的高度
const containerHeight = ref(0)
const columnHeightObj = ref({}) // 记录每一列的高度对象
/**
 * 构建记录每一列的高度对象 - { key: 所在列, value: 列高度}
 * 例如：{ 0: 520, 1: 521}
 */
const buildColumnHeight = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}

// 容器ref实列
const containerRef = ref(null)
const containerWidth = ref(0) // 容器总宽度（不包含 padding、margin、border）
const containerLeft = ref(0) // 容器左边距 - item 的
/**
 * 计算容器总宽度
 */
const calcContainerWidth = () => {
  if (!containerRef.value) return 0

  // 获取容器的样式
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerRef.value,
    null
  )
  // 容器左边距
  containerLeft.value = parseFloat(paddingLeft)

  // 容器的总宽度 = 容器的宽度 - 容器的左右 padding
  containerWidth.value =
    containerRef.value.offsetWidth -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight)
}

// 列宽
const columnWidth = ref(0)
/**
 * 计算列宽
 */
const calcColumnWidth = () => {
  if (!containerRef.value) return 0
  // 计算容器宽度
  calcContainerWidth()

  // 所有列宽的和
  const columnWidthSum = (props.column - 1) * props.columnGap

  // 计算列宽 - (容器总宽度 - 所有列宽的和) / 列数
  columnWidth.value = (containerWidth.value - columnWidthSum) / props.column
}

// 挂载完成后，计算列宽
onMounted(() => {
  calcColumnWidth()
})

// item 的高度集合
let itemHeights = []

/**
 * 瀑布流布局计算高度函数
 * @param {boolean} [needPreload=false] 是否需要图片预加载
 */
const calculateLayout = (needPreload = false) => {
  itemHeights = []

  const itemElements = [...document.querySelectorAll('.m-waterfall-item')]

  if (needPreload) {
    // 需要预加载的情况
    const imgElements = getImgElements(itemElements)
    const imgSrcs = getImgSrcs(imgElements)

    waitImgsLoaded(imgSrcs).then(() => {
      // 图片加载完成后计算高度
      itemElements.forEach((el) => itemHeights.push(el.offsetHeight))
    })
  } else {
    // 不需要预加载，直接计算高度
    itemElements.forEach((el) => itemHeights.push(el.offsetHeight))
  }

  // 计算 item 位置，并使用
  useItemLocation()
}

/**
 * 返回下一个 item 的 left 值
 */
const getItemLeft = () => {
  // 找到最小的列
  const minColumn = getMinColumn(columnHeightObj.value)
  // 计算left值
  return minColumn * (columnWidth.value + props.columnGap) + containerLeft.value
}

/**
 * 返回下一个 item 的 top 值
 */
const getItemTop = () => getMinHeight(columnHeightObj.value)

/**
 * 指定列高度自增
 * @param {*} index
 */
const increaseColumnHeight = (index) => {
  // 找到最小的列
  const minColumn = getMinColumn(columnHeightObj.value)
  // 指定列高度自增
  columnHeightObj.value[minColumn] += itemHeights[index] + props.rowGap
}

/**
 * 为每个item 生成位置属性
 */
const useItemLocation = () => {
  // 遍历数据源
  props.data.forEach((item, index) => {
    // 避免重新计算
    if (item._style) return

    // 生成 _style 样式对象
    item._style = { left: getItemLeft(), top: getItemTop() }

    // 指定列高度自增
    increaseColumnHeight(index)
  })

  // 指定容器的高度
  containerHeight.value = getMaxHeight(columnHeightObj.value)
}

/**
 * 数据改变触发计算
 */
watch(
  () => props.data,
  (newVal) => {
    nextTick(() => {
      // 是否重置数据源
      const resetColumnHeight = newVal.every((item) => !item._style)
      if (resetColumnHeight) buildColumnHeight()

      // 计算布局计算高度函数
      calculateLayout(props.isLazy)
    })
  },
  {
    immediate: true,
    deep: true
  }
)

/**
 * 重新构建瀑布流
 */
const onReBuild = () => {
  // 延迟 100 毫秒，等待列宽计算完成
  setTimeout(() => {
    // 重新计算列宽
    calcColumnWidth()

    // 重置所有定位数据，因为 data 中进行了深度监听， 所以会重新触发 watch 监听
    props.data.forEach((item) => (item._style = null))
  }, 10)
}

/**
 * 监听列数变化
 */
watch(
  () => props.column,
  () => {
    // 在 isLazy 为 true 的前提下，需要先将列宽滞空，滞空后，会取消瀑布流的渲染
    if (props.isLazy) {
      columnWidth.value = 0
    }
    // 重新构建瀑布流
    onReBuild()
  }
)

// 卸载时删除 _style 属性
onUnmounted(() => {
  props.data.forEach((item) => delete item._style)
})
</script>

<template>
  <div
    class="relative"
    ref="containerRef"
    :style="{ height: `${containerHeight}px` }"
  >
    <!-- 数据渲染 -->
    <template v-if="columnWidth && data.length">
      <div
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        class="m-waterfall-item absolute duration-300"
        :style="{
          left: item._style?.left + 'px',
          top: item._style?.top + 'px',
          width: `${columnWidth}px`
        }"
      >
        <slot :item="item" :width="columnWidth" :index="index"></slot>
      </div>
    </template>
    <!-- 加载中 -->
    <div v-else>加载中...</div>
  </div>
</template>

<style scoped></style>
