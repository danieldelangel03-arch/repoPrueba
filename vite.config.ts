import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Evita CORS en desarrollo: el navegador pide a Vite (mismo origen) y Vite reenvía a GamerPower.
    proxy: {
      '/api': {
        target: 'https://www.gamerpower.com',
        changeOrigin: true,
      },
    },
  },
})