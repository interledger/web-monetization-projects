import path from 'path'
import fs from 'fs'

export const makeEntry = (rootDir: string) => {
  const entry: Record<string, string> = {
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
    if (!fs.existsSync(entryPath)) {
      delete entry[k]
    }
  })

  return entry
}
