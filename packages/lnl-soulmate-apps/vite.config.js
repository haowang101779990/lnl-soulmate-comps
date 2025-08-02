import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { viteStaticCopy } from 'vite-plugin-static-copy'; // 👈 Import the new plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),viteStaticCopy({
      targets: [
        {
          src: './node_modules/@lnl-soulmate/lnl-soulmate-comps/asset/*',
          dest: 'asset'
        }
      ]
    })],
  resolve:{
    alias:{
      '@lnl-soulmate/lnl-soulmate-comps':path.resolve(__dirname,'../lnl-soulmate-comps/'),
      '/asset':path.resolve(__dirname,'./node_modules/@lnl-soulmate/lnl-soulmate-comps/asset/')
    }
  },
  build:{
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  }
})
