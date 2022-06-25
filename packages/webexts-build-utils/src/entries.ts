import path from 'path'
import fs from 'fs'

export const makeEntry = (rootDir: string) => {
  const entry: Record<string, string> = {
    content: './src/content/content.ts',
    popup: './src/popup/popup.tsx',
    options: './src/options/options.tsx',
    background: './src/background/background.ts',
    backgroundMV3: './src/background/backgroundMV3.ts'
  }

  Object.keys(entry).forEach(k => {
    const entryPath = path.join(rootDir, entry[k])
    if (!fs.existsSync(entryPath)) {
      console.log('entry does not exist', entryPath)
      delete entry[k]
    }
  })

  return entry
}
