<script setup>
import { typeEnum, typeStyles } from './config'
import mSvgIcon from '../svg-icon/index.vue'
import { ref, onMounted } from 'vue'

const props = defineProps({
  // 消息提示类型
  type: {
    type: String,
    required: true,
    validator: (val) => {
      const result = typeEnum.includes(val)

      if (!result) {
        throw new Error(`type 必须是 ${typeEnum.join('、')} 中的一个`)
      }

      return result
    }
  },
  // 描述文本
  content: {
    type: String,
    required: true
  },
  // 展示时间
  duration: {
    type: Number,
    default: 3000
  },
  // 关闭回调
  onClose: {
    type: Function
  }
})

// 展示状态
const isVisable = ref(false)

// 挂载时展示
onMounted(() => {
  isVisable.value = true
  // 展示时间后关闭
  setTimeout(() => {
    isVisable.value = false
  }, props.duration)
})
</script>

<template>
  <transition name="down" @after-leave="onClose">
    <!-- message box -->
    <div
      v-show="isVisable"
      class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
      :class="typeStyles[type].containerClass"
    >
      <!-- message icon -->
      <m-svg-icon
        :icon-class="typeStyles[type].icon"
        :fill-class="typeStyles[type].fillClass"
        class="w-1.5 h-1.5 mr-1.5"
      ></m-svg-icon>
      <!-- message text -->
      <span class="text-sm" :class="typeStyles[type].textClass">
        {{ content }}
      </span>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.down-enter-active,
.down-leave-active {
  transition: all 0.3s;
}

.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
</style>
