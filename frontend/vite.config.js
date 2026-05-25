import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'force-close-build',
      apply: 'build',
      closeBundle() {
        console.log('Build finished, forcing exit...');
        setTimeout(() => process.exit(0), 0);
      },
    },
  ],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
