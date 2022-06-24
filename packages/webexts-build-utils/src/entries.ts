import path from 'path'
import fs from 'fs'

export const makeEntry = (rootDir: string) => {
  const entry: Record<string, string> = {
    content: './src/content/content.ts',
    popup: './src/popup/popup.tsx',
    options: './src/options/options.tsx',
    background: './src/background/background.ts'
  }

  Object.keys(entry).forEach(k => {
    const entryPath = path.join(rootDir, entry[k])
    if (!fs.existsSync(entryPath)) {
      delete entry[k]
    }
  })

  return entry
}
