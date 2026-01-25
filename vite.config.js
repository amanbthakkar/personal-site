import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // GitHub Pages with custom domain uses root path
  publicDir: 'public',
  build: {
    outDir: 'build',
    assetsDir: 'static',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: false, // Don't auto-open browser
  },
});
