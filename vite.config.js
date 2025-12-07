import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
    allowedHosts: ['web.artmosphere.duckdns.org'],
    compression: 'gzip'
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'plasma': ['./src/components/Plasma.jsx'],
          'vendor': ['react', 'react-dom', 'gsap', 'ogl']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', 'ogl']
  }
})
