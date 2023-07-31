

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PageLoading from '@/components/PageLoading.vue'

const app = createApp(App)

app.component('PageLoading', PageLoading)

app.config.globalProperties.$filters = {
  currencyBRL(value) {
    value = Number(value)
    if(!isNaN(value)){
      return value.toLocaleString('pt-BR', {
        style: "currency",
        currency: "BRL"
      })
    }else{
      return ''
    }
  }
}

app.use(createPinia())
app.use(router)

app.mount('#app')
