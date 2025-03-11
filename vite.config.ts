import type { Plugin } from 'vite'

import { readFileSync, statSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { minify } from 'terser'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'

function setAlias(alias: Record<string, string>) {
  const result: Record<string, string> = {}
  for (const key in alias) {
    result[key] = fileURLToPath(new URL(alias[key], import.meta.url))
  }
  return result
}

function removeComments(): Plugin {
  return {
    name: 'remove-comments',
    async closeBundle() {
      const jsFilePath = resolve(__dirname, 'dist/verus-ui.js')
      const jsFile = readFileSync(jsFilePath, 'utf-8')
      const result = await minify(jsFile, { format: { comments: false } })
      result.code && writeFileSync(jsFilePath, result.code, 'utf-8')
      console.log(
        'verus-ui.js - after minify:',
        (statSync(jsFilePath).size / 1024).toFixed(2),
        'kB'
      )
    }
  }
}

export default defineConfig({
  plugins: [
    vue(),
    vueJsx({ optimize: true }),
    tailwindcss(),
    dts({
      bundledPackages: ['mm2r'],
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json'
    }),
    removeComments()
  ],

  resolve: {
    alias: setAlias({
      '@/base': './src/base/index.ts',
      '@/components': './src/components/index.ts',
      '@/composable': './src/composable/index.ts',
      '@/directives': './src/directives/index.ts',
      '@/ts': './src/ts/index.ts',
      '@/utils': './src/utils/index.ts'
    })
  },

  build: {
    lib: {
      entry: 'src/mod.ts',
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
