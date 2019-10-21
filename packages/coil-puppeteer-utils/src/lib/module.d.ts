declare module 'puppeteer-firefox' {
  import { Browser } from 'puppeteer'

  const module: {
    executablePath: () => string
    connect: (options: { browserWSEndpoint: string }) => Promise<Browser>
  }
  export = module
}

declare module 'web-ext' {
  export type RunOptions = {
    noInput?: boolean
    sourceDir: string
    firefox: string
    args: string[]
  }
  const module: {
    util: {
      logger: {
        consoleStream: {
          makeVerbose(): void
        }
      }
    }
    cmd: {
      run(
        options: RunOptions,
        nonCliOptions: {
          shouldExitProgram: boolean
        }
      ): // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Promise<any>
    }
  }
  // eslint-disable-next-line import/no-default-export
  export default module
}
