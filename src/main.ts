import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App.vue'
import router from '@/router'
// Import fetch wrapper to filter API-related console logs
import '@/utils/fetchWrapper'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(MotionPlugin)

app.mount('#app')
