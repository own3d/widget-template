import './style.css'
import { createApp } from 'vue'
import { createExtension } from '@own3d/sdk/vue'
import App from './App.vue'
import {createPinia} from 'pinia'

const extension = createExtension()
const pinia = createPinia()
const app = createApp(App)

app.use(extension)
app.use(pinia)
app.mount('#app')