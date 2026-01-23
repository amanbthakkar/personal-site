const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const path = require('path');

// https://vitejs.dev/config/
module.exports = defineConfig({
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
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: false, // Don't auto-open browser
  },
});
