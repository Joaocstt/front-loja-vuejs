import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/axios.js'
import './index.css'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import { createPinia } from 'pinia'

const pinia = createPinia();

const app = createApp(App)

app.use(router)
app.use(ToastPlugin)
app.use(pinia)
app.mount('#app')
