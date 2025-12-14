import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        v2: resolve(__dirname, 'v2/index.html'),
        v2About: resolve(__dirname, 'v2/about/index.html'),
        v2Experience: resolve(__dirname, 'v2/experience/index.html'),
        v2Projects: resolve(__dirname, 'v2/projects/index.html'),
        v2Writing: resolve(__dirname, 'v2/writing/index.html'),
      },
    },
  },
})
