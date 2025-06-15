<script setup>
import { ref } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
const router = useRouter()
const userStore = useUserStore()

const loading = ref(false) // 是否加载
const inputFileTarget = ref(null) // 上传头像的 input 元素
const inputVal = ref('admin')

/**
 * 点击更换头像
 */
const onChangeAvatar = () => {
  inputFileTarget.value.click() // 点击触发 input 元素的点击事件
}

/**
 * 头像选择完成
 */
const onSelectImgHandler = (e) => {
  console.log(e)
}

/**
 * 保存修改
 */
const onSave = async () => {
  console.log('保存修改')
}

/**
 * 移动端后退处理
 */
const onNavbarLeftClick = () => {
  router.back()
}

/**
 * 退出登录
 */
const onLogout = () => {
  userStore.logout()
}
</script>

<template>
  <!-- 背景盒子 -->
  <div class="h-screen bg-zinc-200 dark:bg-zinc-800 overflow-auto lg:pt-10">
    <!-- 中心盒子 -->
    <div
      class="relative lg:w-[75%] mx-auto bg-white dark:bg-zinc-900 duration-400 lg:rounded-sm lg:border-zinc-200 lg:dark:border-zinc-600 lg:border-[1px] lg:px-4 lg:py-2"
    >
      <!-- 移动端 navbar -->
      <m-navbar
        :is-sticky="true"
        v-if="isMobileTerminal"
        :onLeftClick="onNavbarLeftClick"
      >
        <template #left>
          <m-svg-icon
            icon-class="back"
            class="w-2 h-2"
            fill-class="fill-zinc-900 dark:fill-zinc-200"
          />
        </template>
        个人资料
      </m-navbar>

      <!-- pc 端 -->
      <div v-else class="text-lg font-bold text-center mb-4 dark:text-zinc-300">
        个人资料
      </div>

      <!-- 公共表单部分 -->
      <div class="h-full w-full px-1 pb-4 text-sm mt-2 lg:w-2/3 lg:pb-0">
        <!-- 头像 -->
        <div
          class="py-1 lg:absolute lg:right-[16%] lg:text-center"
          @click="onChangeAvatar"
        >
          <span
            class="w-8 inline-block mb-2 font-bold text-sm dark:text-zinc-300 lg:block lg:mx-auto"
          >
            我的头像
          </span>

          <div
            class="relative w-[80px] h-[80px] group lg:cursor-pointer lg:left-[50%] lg:translate-x-[-50%]"
          >
            <img
              v-lazy
              :src="userStore.userInfo.avatar"
              alt=""
              class="rounded-[50%] w-full h-full lg:inline-block"
            />

            <!-- 更换头像 -->
            <div
              class="absolute top-0 rounded-[50%] w-full h-full bg-[rgba(0,0,0,.4)] hidden lg:group-hover:block"
            >
              <m-svg-icon
                icon-class="change-header-image"
                class="w-2 h-2 m-auto mt-2"
              />
              <div
                class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5"
              >
                点击更换头像
              </div>
            </div>
          </div>

          <!-- 隐藏域 -->
          <input
            v-show="false"
            ref="inputFileTarget"
            type="file"
            accept=".png, .jpeg, .jpg, .gif"
            @change="onSelectImgHandler"
          />

          <!-- 提示文字 -->
          <p class="mt-1 text-zinc-500 dark:text-zinc-400 text-xs lg:w-10">
            支持 jpg、png、jpeg 格式大小 5M 以内的图片
          </p>
        </div>

        <!-- 用户名 -->
        <div class="py-1 lg:flex lg:items-center lg:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 lg:mb-0">
            用户名
          </span>
          <m-input v-model="inputVal" class="w-full" type="text"></m-input>
        </div>

        <!-- 职位 -->
        <div class="py-1 lg:flex lg:items-center lg:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 lg:mb-0">
            职位
          </span>
          <m-input v-model="inputVal" class="w-full" type="text"></m-input>
        </div>

        <!-- 公司 -->
        <div class="py-1 lg:flex lg:items-center lg:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 lg:mb-0">
            公司
          </span>
          <m-input v-model="inputVal" class="w-full" type="text"></m-input>
        </div>

        <!-- 个人主页 -->
        <div class="py-1 lg:flex lg:items-center lg:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 lg:mb-0">
            个人主页
          </span>
          <m-input v-model="inputVal" class="w-full" type="text"></m-input>
        </div>

        <!-- 个人介绍 -->
        <div class="py-1 lg:flex lg:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 lg:mb-0">
            个人介绍
          </span>
          <m-input
            v-model="inputVal"
            class="w-full"
            type="textarea"
            max="50"
          ></m-input>
        </div>

        <!-- 保存修改 -->
        <m-button
          class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 lg:w-[160px] lg:ml-[50%] lg:translate-x-[-50%]"
          :loading="loading"
          @click="onSave"
        >
          保存修改
        </m-button>

        <!-- 移动端退出登录 -->
        <m-button
          v-if="isMobileTerminal"
          class="w-full dark:text-zinc-300 dark:bg-zinc-800 lg:w-[160px] lg:ml-[50%] lg:translate-x-[-50%]"
          @click="onLogout"
        >
          退出登录
        </m-button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
