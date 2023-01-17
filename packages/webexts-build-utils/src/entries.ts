import path from 'path'
import fs from 'fs'

import { BROWSER, MV3 } from './env'

export type WebpackEntry = Record<string, string>
export const makeEntry = (rootDir: string) => {
  const entry: WebpackEntry = {
    content: './src/content/content.ts',
    popup: './src/popup/popup.tsx',
    options: './src/options/options.tsx',
    background: './src/background/background.ts',

    backgroundMV3: './src/background/backgroundMV3.ts',
    contentMV3: './src/content/contentMV3.ts',
    popupMV3: './src/popup/popupMV3.tsx'
  }

  Object.keys(entry).forEach(k => {
    const entryPath = path.join(rootDir, entry[k])
    const isMV3 = k.endsWith('MV3')
    const notMVSpecific = (isMV3 && !MV3) || (!isMV3 && MV3)
    // TODO: The safari project resources assume all entries are available
    // the build will fail if the files are missing.
    if (!fs.existsSync(entryPath) || (notMVSpecific && BROWSER !== 'safari')) {
      delete entry[k]
    }
  })

  return entry
}
