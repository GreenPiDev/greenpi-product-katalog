import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/product-catalog/',
  plugins: [react()],
  server: {
    host: true, // aynı Wi-Fi'daki cihazlardan erişim için (0.0.0.0)
  },
})
