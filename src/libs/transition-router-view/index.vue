<script setup>
// 导入路由类型常量
import { NONE, PUSH, BACK, ROUTER_TYPR_ENUM } from './config'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 组件属性定义
const props = defineProps({
  // 路由类型：NONE(无动画) | PUSH(前进) | BACK(后退)
  routerType: {
    type: String,
    default: NONE,
    // 验证器确保传入的路由类型有效
    validator(value) {
      const res = ROUTER_TYPR_ENUM.includes(value)
      if (!res) {
        throw new Error(
          `routerType 的值只能是 ${ROUTER_TYPR_ENUM.join(' | ')} 中的一个`
        )
      }
      return res
    }
  },
  // 主组件名称（通常是首页组件名）
  mainComponentName: {
    type: String,
    required: true
  }
})

// 任务栈：存储访问过的组件名，用于keep-alive缓存管理
const taskStack = ref([props.mainComponentName])

// 清空任务栈（重置到初始状态）
const clearTaskStack = () => {
  taskStack.value = [props.mainComponentName]
}

// 路由切换动画名称
const transitionName = ref('')
const router = useRouter()

// 全局路由守卫：在路由切换前处理
router.beforeEach((to) => {
  // 设置当前路由切换的动画类型
  transitionName.value = props.routerType

  // 处理任务栈：
  // 前进时 - 将新路由添加到栈顶
  if (props.routerType === PUSH) {
    taskStack.value.push(to.name)
  }
  // 后退时 - 移除栈顶路由
  else if (props.routerType === BACK) {
    taskStack.value.pop()
  }

  // 当回到主组件时，清空任务栈（避免栈无限增长）
  if (to.name === props.mainComponentName) {
    clearTaskStack()
  }
})

// 控制动画状态：避免多个动画同时干扰布局
const isAnimation = ref(false)
// 动画开始前设置状态
const beforeEnter = () => {
  isAnimation.value = true
}
// 动画结束后重置状态
const afterLeave = () => {
  isAnimation.value = false
}
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition
      :name="transitionName"
      @before-enter="beforeEnter"
      @after-leave="afterLeave"
    >
      <keep-alive>
        <component
          :is="Component"
          :key="$route.fullPath"
          :class="{ 'fixed top-0 left-0 w-screen z-50': isAnimation }"
        />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style scoped lang="scss">
/* 路由切换动画实现 */

/* PUSH动画（新页面进入） */
.push-enter-active {
  animation-name: push-in; // 使用push-in关键帧
  animation-duration: 0.4s; // 动画时长400ms
}
/* PUSH动画（旧页面退出） */
.push-leave-active {
  animation-name: push-out; // 使用push-out关键帧
  animation-duration: 0.4s;
}

/* PUSH进入关键帧：从右侧滑入 */
@keyframes push-in {
  0% {
    transform: translate(100%, 0); // 起始位置：屏幕右侧外
  }
  100% {
    transform: translate(0, 0); // 结束位置：屏幕内
  }
}
/* PUSH退出关键帧：向左滑动 */
@keyframes push-out {
  0% {
    transform: translate(0, 0); // 起始位置：屏幕内
  }
  100% {
    transform: translate(-50%, 0); // 结束位置：向左移动50%
  }
}

/* BACK动画（旧页面重新进入） */
.back-enter-active {
  animation-name: back-in; // 使用back-in关键帧
  animation-duration: 0.4s;
}
/* BACK动画（当前页面退出） */
.back-leave-active {
  animation-name: back-out; // 使用back-out关键帧
  animation-duration: 0.4s;
}

/* BACK进入关键帧：从左侧滑入 */
@keyframes back-in {
  0% {
    width: 100%; // 保持全宽
    transform: translate(-100%, 0); // 起始位置：屏幕左侧外
  }
  100% {
    width: 100%;
    transform: translate(0, 0); // 结束位置：屏幕内
  }
}
/* BACK退出关键帧：向右滑动 */
@keyframes back-out {
  0% {
    width: 100%; // 保持全宽
    transform: translate(0, 0); // 起始位置：屏幕内
  }
  100% {
    width: 100%;
    transform: translate(50%, 0); // 结束位置：向右移动50%
  }
}
</style>
