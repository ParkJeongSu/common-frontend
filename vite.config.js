import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
// 1. vuetify 플러그인을 import 합니다.
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify(),
    vueDevTools(),
    // 컴포넌트를 자동 임포트해주는 플러그인과 결합하면 더 강력합니다.
    Components({
      resolvers: [
        IconsResolver({
          prefix: 'icon', // <icon-mdi-home /> 처럼 쓸 수 있게 해줌
        }),
      ],
    }),
    Icons({
      autoInstall: true, // 없는 아이콘을 쓸 때 자동으로 패키지 설치
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      // '/api' 로 시작하는 요청은 전부 target 으로 프록시해준다.
      '/api': {
        target: 'http://localhost:8081', // Spring 백엔드 서버 주소
        changeOrigin: true, // cross origin 허용
      },
    },
  },
})
