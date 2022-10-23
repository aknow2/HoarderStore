import { crx, defineManifest } from '@crxjs/vite-plugin'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import solidSvg from 'vite-plugin-solid-svg'
import { defineConfig } from 'vite'
import { resolve } from 'path'
import solidPlugin from 'vite-plugin-solid'

const manifest = defineManifest({
  manifest_version: 3,
  name: 'LocalHoarder',
  version: '0.0.1',
  permissions: ['tabs', 'storage', 'background'],
  devtools_page: 'devtool.html',
  background: {
    service_worker: '/src/background/index.ts',
    type: 'module'
  },
  content_scripts: [{
    matches: [
      '<all_urls>'
    ],
    js: [
      '/src/content_scripts/index.ts'
    ],
    run_at: 'document_start'
  }],
  web_accessible_resources: [],
  icons: {
    16: '16x16.png',
    48: '48x48.png',
    128: '128x128.png'
  }
})

export default defineConfig({
  plugins: [vanillaExtractPlugin(), solidPlugin(), solidSvg(), crx({ manifest })],
  server: {
    port: 7070
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html')
      }
    }
  }
})
