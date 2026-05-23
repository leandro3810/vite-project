import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  base: '/vite-project/',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: isSsrBuild ? 'dist/server' : 'dist/client',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
}))
