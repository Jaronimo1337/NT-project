import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.webp'],
  server: {
    host: true,
    port: 5173,
    // File watching inside Docker on macOS/Windows
    watch: {
      usePolling: true,
      interval: 300
    },
    proxy: {
      '/api': {
        target: 'http://server:3000',
        changeOrigin: true
      },
      '/uploads': {
        target: 'http://server:3000',
        changeOrigin: true
      }
    }
  }
})
