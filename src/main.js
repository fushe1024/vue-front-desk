import './styles/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import { useREM } from './utils/flexible'
import libs from '@/libs'
import 'virtual:svg-icons-register'

useREM() // 动态指定rem基准值

const app = createApp(App)

app.use(libs)

app.use(router).use(pinia)

app.mount('#app')
