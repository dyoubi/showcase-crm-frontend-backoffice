import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@honkhonk/vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';
import importMetaEnv from '@import-meta-env/unplugin';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'build',
    target: 'esnext',
    sourcemap: true,
  },
  plugins: [
    svgr({ svgrOptions: { include: '**/*.svg' } }),
    react(),
    importMetaEnv.vite({ example: '.env.example' }),
    eslint({
      exclude: ['/virtual:/**', 'node_modules/**'],
      failOnError: false,
    }),
  ],
});
