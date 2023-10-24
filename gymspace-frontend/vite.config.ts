import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    vuetify({ autoImport: true })

  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/logic/API/apiCaller.ts', import.meta.url))
    }
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
