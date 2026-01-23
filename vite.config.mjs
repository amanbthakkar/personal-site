import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      include: '**/*.{jsx,js}',
    }),
  ],
  base: '/', // GitHub Pages with custom domain uses root path
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'static',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0', // Listen on all interfaces (accessible from Windows)
    port: 5173,
    strictPort: false,
    open: false, // Don't auto-open browser
    hmr: {
      overlay: true, // Show errors in browser overlay
    },
  },
});
