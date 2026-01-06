import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // 👇 THIS IS CRITICAL FOR GITHUB PAGES
      base: "/", 
      
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              'vendor': ['react', 'react-dom'],
              'motion': ['framer-motion'],
              'icons': ['lucide-react']
            }
          }
        },
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: false
          }
        },
        // Optimize chunk size warnings
        chunkSizeWarningLimit: 1000
      },
      // Optimize asset handling
      assetsInclude: ['**/*.mp4', '**/*.webm', '**/*.png', '**/*.jpg', '**/*.avif']
    };
});