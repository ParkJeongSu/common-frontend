import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 1. Vuetify와 관련된 모든 것을 최상단으로 옮깁니다.
import vuetify from './plugins/vuetify' // Vuetify 설정
import i18n from './plugins/i18n' // i18n 설정

// 3. 우리만의 커스텀 CSS는 가장 마지막에 import 합니다.
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify) // Vuetify 플러그인을 Vue 앱에 등록합니다.
app.use(i18n) // Vuetify 플러그인을 Vue 앱에 등록합니다.

app.mount('#app')
