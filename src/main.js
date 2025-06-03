import './styles/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import { useREM } from './utils/flexible'
import { initTheme } from './utils/theme'
import libs from '@/libs'
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(pinia).use(router).use(libs)

useREM() // 动态指定rem基准值
initTheme() // 初始化主题

app.mount('#app')
