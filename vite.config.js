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
        about: resolve(__dirname, 'about/index.html'),
        experience: resolve(__dirname, 'experience/index.html'),
        projects: resolve(__dirname, 'projects/index.html'),
        writing: resolve(__dirname, 'writing/index.html'),
      },
    },
  },
})
