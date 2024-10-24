import { defineConfig } from 'vite';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use 'sass:math';`
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'src/manifest.json',  // Path to manifest.json in src
          dest: '.'                   // Copy to the root of dist/
        },
        {
          src: 'src/background.js',  
          dest: '.'                   
        },
        {
          src: 'src/languages.js',  
          dest: './src/'                   
        },
        {
          src: 'src/icon.png',        // Path to icon.png in src
          dest: '.'                   // Copy to the root of dist/
        }
      ]
    })
  ],
  build: {
    outDir: 'dist',                // Ensure output is in dist folder
    rollupOptions: {
      output: {
        entryFileNames: 'app.js',    // Set the main JS file name
        chunkFileNames: '[name].js',  // For chunks
        assetFileNames: (assetInfo) => {
          // Move CSS to root and use a specific name
          if (assetInfo.name.endsWith('.css')) {
            return 'styles.css';       // Set CSS file name
          }
          return assetInfo.name;       // Keep other assets with their names
        },
      },
    },
  },
});
