import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tailwindcss from '@tailwindcss/vite'

function setAlias(alias: Record<string, string>) {
  const result: Record<string, string> = {}
  for (const key in alias) {
    result[key] = fileURLToPath(new URL(alias[key], import.meta.url))
  }
  return result
}

export default defineConfig({
  plugins: [vue(), vueJsx({ optimize: true }), tailwindcss()],

  resolve: {
    alias: setAlias({
      '@/basic': './src/basic/index.ts',
      '@/components': './src/components/index.ts',
      '@/composable': './src/composable/index.ts',
      '@/ts': './src/ts/index.ts',
      '@/utils': './src/utils/index.ts'
    })
  },

  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'VerusUI',
      fileName: 'verus-ui',
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue'],
      output: { globals: { vue: 'Vue' } }
    }
  }
})
