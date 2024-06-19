import path from 'node:path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/qick-serve/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@components': `${path.resolve(__dirname, './src/components')}`,
      '@assets': `${path.resolve(__dirname, './src/assets')}`,
      '@contexts': `${path.resolve(__dirname, './src/contexts')}`,
    },
  },
})
