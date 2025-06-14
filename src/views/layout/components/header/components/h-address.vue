<script setup>
const goGithub = () => {
  window.open('https://github.com/fushe1024/vue-front-desk', '_blank')
}
</script>

<template>
  <m-popover>
    <template #reference>
      <m-svg-icon
        id="guide-github"
        icon-class="github"
        class="w-4 h-4 p-1 cursor-pointer duration-200 outline-none hover:bg-zinc-100/60 rounded-sm dark:hover:bg-zinc-900"
        fill-class="fill-zinc-900 dark:fill-zinc-300"
        @click="goGithub"
      ></m-svg-icon>
    </template>
  </m-popover>
</template>

<style scoped></style>
