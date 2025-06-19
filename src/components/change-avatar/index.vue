<script setup>
import { EMITS_CLOSE, pcOptions, mobileOptions } from './config'
import { isMobileTerminal } from '@/utils/flexible'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { ref, onMounted } from 'vue'
import { getOSSClient } from '@/utils/sts'
import { useUserStore } from '@/stores/modules/user'
import { message } from '@/libs'
import { updateUserInfo } from '@/api/sys'

defineProps({
  blob: {
    type: String,
    required: true
  }
})

const emit = defineEmits([EMITS_CLOSE])

const image = ref(null)
let cropper = null

// 加载完成后初始化 Cropper
onMounted(() => {
  cropper = new Cropper(
    image.value,
    isMobileTerminal.value ? mobileOptions : pcOptions
  )
})

/**
 * 关闭事件
 */
const close = () => {
  emit(EMITS_CLOSE)
}

/**
 * 确定按钮点击事件
 */
const loading = ref(false)
const onConfirmClick = () => {
  loading.value = true
  cropper.getCroppedCanvas().toBlob(async (blob) => {
    uploadOSS(blob)
  })
}

/**
 * oss 上传到阿里云
 */
let client = null
const userStore = useUserStore()
const uploadOSS = async (file) => {
  // 如果没有oss client，先获取
  if (!client) {
    client = await getOSSClient()
  }
  try {
    const fileTypeArr = file.type.split('/')
    const fileName = `${userStore.userInfo.username}/${new Date().getTime()}.${fileTypeArr[fileTypeArr.length - 1]}`

    // images/fushe1024/21642736472.png
    const res = await client.put(`images/${fileName}`, file)

    // 上传完成更新服务器数据
    updateAvatar(res.url)
  } catch (error) {
    message({ type: 'error', content: error })
  }
}

/**
 * 更新头像
 */
const updateAvatar = async (avatar) => {
  userStore.setUserInfo({
    ...userStore.userInfo,
    avatar
  })
  await updateUserInfo(userStore.userInfo)
  message({ type: 'success', content: '头像更新成功' })
  loading.value = false
  close()
}
</script>

<template>
  <div class="overflow-auto relative flex flex-col items-center">
    <m-svg-icon
      v-if="isMobileTerminal"
      icon-class="close"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      fill-class="fill-zinc-900 dark:fill-zinc-200 "
      @click="close"
    ></m-svg-icon>

    <img ref="image" :src="blob" alt="Picture" />

    <m-button
      class="mt-4 w-[80%] lg:w-1/2"
      :loading="loading"
      @click="onConfirmClick"
    >
      确定
    </m-button>
  </div>
</template>

<style scoped></style>
