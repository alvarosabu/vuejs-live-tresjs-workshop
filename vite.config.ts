import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import glsl from 'vite-plugin-glsl'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'pathe'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => (tag.startsWith('Tres') && tag !== 'TresCanvas') || tag === 'primitive',
        },
      },
    }),
    AutoImport({
      dts: true,
      eslintrc: {
        enabled: true, // <-- this
      },
      imports: ['vue'],
    }),
    Components({
      /* options */
    }),
    glsl(),
  ],
  resolve: {
    alias: {
      '/@': resolve(__dirname, '../src'),
    },
    dedupe: ['@tresjs/core', 'three'],
  },
})
