import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})  

//  ViteSSG({
//      entry: 'src/main.ts',
//      outDir: 'dist',
//      includedRoutes: [
//        '/',
//        '/news',
//        '/consoles',
//        '/contact',
//        '/nintendo'
//      ],
//      script: 'async'
//    })
//  ],
//  resolve: {
//    alias: {
//      '@': resolve(__dirname, 'src')
//    }
//  }
//})