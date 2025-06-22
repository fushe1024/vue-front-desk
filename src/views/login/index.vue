<script setup>
import sliderCaptcha from './components/slider-captcha.vue'
import HeaderImg from '@/components/header-img/index.vue'
import qqLogin from './components/qq-login.vue'
import wchatLogin from './components/wchat-login.vue'
import md5 from 'md5'
import { ref, watch } from 'vue'
import { message } from '@/libs'
import { isMobileTerminal } from '@/utils/flexible'
import { useUserStore } from '@/stores/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { USER_AGREEMENT_URL, PRIVACY_POLICY_URL } from '@/constants'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { validate } from './utils/from_validate'
import { userRegister } from '@/api/sys'

const userStore = useUserStore()
const router = useRouter()
const { query } = useRoute()

// 是否注册
const isRegister = ref(true)

// 用户名密码
const userData = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

/**
 * 切换登录注册,重置数据
 */
watch(isRegister, () => {
  userData.value = {
    username: '',
    password: '',
    confirmPassword: ''
  }
})

// 登录loading
const loading = ref(false)

/**
 * 登录
 */
const login = () => {
  loading.value = true

  // 通知仓库登录
  userStore
    .login({
      ...userData.value, // 用户名
      ...query, // 路由参数
      loginType: query.loginType || 'username' // 登录类型
    })
    .then(() => {
      router.push('/') // 登录成功，跳转首页
    })
    .finally(() => {
      loading.value = false
    })
}

// 是否同意协议
const isAgree = ref(false)

/**
 * 注册
 */
const register = () => {
  if (!isAgree.value) {
    message({ type: 'warning', content: '请先同意协议' })
    return
  }

  loading.value = true

  // 合并参数
  const paramsData = {
    ...userData.value, // 用户名密码
    ...query, // 路由参数
    password: md5(userData.value.password),
    loginType: query.loginType || 'username' // 登录类型
  }

  console.log('注册最终参数：', paramsData)

  // 调用接口注册
  userRegister(paramsData)
    .then(() => {
      message({ type: 'success', content: '注册成功，请登录' })
      isRegister.value = false
    })
    .finally(() => {
      loading.value = false
    })
}

// 人类行为验证滑块
const isSliderCaptcha = ref(false)

/**
 * 表单触发
 */
const onFormLogin = () => {
  isSliderCaptcha.value = true
}

/**
 * 滑块成功后的回调
 */
const onCaptchaSuccess = () => {
  isSliderCaptcha.value = false // 关闭滑块
  login()
}
</script>

<template>
  <div class="h-screen dark:bg-zinc-800 bg-white lg:bg-zinc-200 lg:pt-10">
    <!-- header img 组件 -->
    <header-img />

    <!-- 登录表单 -->
    <div
      v-if="!isRegister"
      class="relative p-4 lg:w-[388px] lg:mx-auto bg-white dark:bg-zinc-800 lg:dark:bg-zinc-900 lg:rounded-sm lg:shadow-lg"
    >
      <!-- PC展示 标题 -->
      <h2
        v-if="!isMobileTerminal"
        class="font-semibold text-base text-main dark:text-zinc-300 text-center mb-3"
      >
        账号登录
      </h2>
      <Form @submit="onFormLogin">
        <!-- 用户名 -->
        <Field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 py-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 lg:dark:bg-zinc-900"
          name="username"
          type="text"
          :rules="validate.username"
          placeholder="请输入用户名"
          v-model="userData.username"
        />
        <ErrorMessage class="form-error" name="username" />
        <!-- 密码 -->
        <Field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 py-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 lg:dark:bg-zinc-900"
          name="password"
          type="password"
          :rules="validate.password"
          placeholder="请输入密码"
          v-model="userData.password"
        />
        <ErrorMessage class="form-error" name="password" />
        <!-- 去注册 -->
        <div
          class="mt-3 text-right text-sm text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400"
        >
          <span @click="isRegister = true" class="cursor-pointer">
            没有账号？去注册
          </span>
        </div>
        <!-- 登录按钮 -->
        <div class="mt-3">
          <m-button
            class="w-full dark:bg-zinc-900 lg:dark:bg-zinc-800 cursor-pointer"
            :is-animate="false"
            :loading="loading"
            >登录</m-button
          >
        </div>
      </Form>
      <!-- 其他方式登录 -->
      <div class="flex justify-around">
        <qq-login />
        <wchat-login />
      </div>

      <!-- 人类行为验证 -->
      <slider-captcha
        v-if="isSliderCaptcha"
        @close="isSliderCaptcha = false"
        @success="onCaptchaSuccess"
      ></slider-captcha>
    </div>

    <!-- 注册表单 -->
    <div
      v-else
      class="p-4 lg:w-[388px] lg:mx-auto bg-white dark:bg-zinc-800 lg:dark:bg-zinc-900 lg:rounded-sm lg:shadow-lg"
    >
      <h2
        v-if="!isMobileTerminal"
        class="font-semibold text-base text-main dark:text-zinc-300 text-center mb-3"
      >
        账号注册
      </h2>
      <Form @submit="register">
        <Field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 py-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 lg:dark:bg-zinc-900"
          name="username"
          type="text"
          :rules="validate.username"
          placeholder="请输入用户名"
          v-model="userData.username"
        />
        <ErrorMessage class="form-error" name="username" />
        <!-- 密码 -->
        <Field
          class="mt-3 dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 py-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 lg:dark:bg-zinc-900"
          name="password"
          type="password"
          :rules="validate.password"
          placeholder="请输入密码"
          v-model="userData.password"
        />
        <ErrorMessage class="form-error" name="password" />
        <!-- 确认密码 -->
        <Field
          class="mt-3 dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 py-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 lg:dark:bg-zinc-900"
          name="confirmPassword"
          type="password"
          :rules="validate.confirmPassword"
          placeholder="请再次输入密码"
          v-model="userData.confirmPassword"
        />
        <ErrorMessage class="form-error" name="confirmPassword" />
        <div
          class="mt-3 text-right text-sm text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400"
        >
          <span @click="isRegister = false" class="cursor-pointer">
            已有帐号？去登录
          </span>
        </div>
        <div
          class="mt-3 text-center text-sm text-zinc-500 cursor-pointer flex items-center hover:text-zinc-600 dark:hover:text-zinc-400"
        >
          <input type="checkbox" class="mr-0.5 accent-main" v-model="isAgree" />
          <span>
            我已同意
            <a :href="USER_AGREEMENT_URL" target="_blank" class="text-main">
              《用户协议》
            </a>
            和
            <a :href="PRIVACY_POLICY_URL" target="_blank" class="text-main">
              《隐私政策》
            </a>
          </span>
        </div>
        <!-- 注册按钮 -->
        <div class="mt-1">
          <m-button
            class="w-full dark:bg-zinc-900 lg:dark:bg-zinc-800 cursor-pointer"
            :is-animate="false"
            :loading="loading"
            >立即注册</m-button
          >
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped></style>
