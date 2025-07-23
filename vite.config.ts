import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: './dist/skill-tree'
  },
  plugins: [react()],
  server: {
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
      '@styles': resolve(__dirname, './src/styles')
    }
  }
})
