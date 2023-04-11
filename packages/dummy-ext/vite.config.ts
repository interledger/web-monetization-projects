import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { crx } from '@crxjs/vite-plugin'
import tsconfigPaths from 'vite-tsconfig-paths'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'

import manifest from './manifest.json'

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  resolve: {
    alias: {
      events: 'rollup-plugin-node-polyfills/polyfills/events'
    }
  },
  plugins: [
    tsconfigPaths({ projects: [__dirname + '/../..'] }),
    react(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    crx({ manifest: manifest as any })
  ],
  build: {
    rollupOptions: {
      plugins: [
        // TODO: maybe mismatch of rollup versions ?
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rollupNodePolyFill() as any
      ]
    }
  }
})
