import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
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