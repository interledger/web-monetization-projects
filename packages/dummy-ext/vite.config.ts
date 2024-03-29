import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { crx } from '@crxjs/vite-plugin'
import tsconfigPaths from 'vite-tsconfig-paths'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'

import { manifest, applyBuildConfig } from './src/manifest/manifest'

const configured = applyBuildConfig(process.env, manifest)

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  resolve: {
    alias: {
      // For some reason you need the damn node_modules with pnpm, as opposed
      // to yarn 2 with nodeLinker: node-modules
      events: 'node_modules/rollup-plugin-node-polyfills/polyfills/events.js'
    }
  },
  plugins: [
    tsconfigPaths({ projects: [__dirname + '/../..'] }),
    react(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    crx({ manifest: configured })
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
