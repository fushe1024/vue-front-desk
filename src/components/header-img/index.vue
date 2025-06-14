<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import { LOGO_URL } from '@/constants'
const loginBg = 'https://res.lgdsunday.club/login-bg.png'
</script>

<template>
  <div v-show="isMobileTerminal" class="relative h-[111px]">
    <img class="dark:hidden" v-lazy :src="loginBg" alt="" />
    <img
      v-lazy
      class="absolute top-[30px] left-[50%] translate-x-[-50%] w-6 h-6 rounded"
      :src="LOGO_URL"
      alt=""
    />
  </div>
</template>

<style scoped></style>
