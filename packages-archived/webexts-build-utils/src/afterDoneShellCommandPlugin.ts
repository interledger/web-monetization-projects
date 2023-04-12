import cp from 'child_process'

import * as webpack from 'webpack'

import { AFTER_DONE_SHELL_CMD } from './env'

type Func = { (...args: unknown[]): void }

const IGNORE_INVOCATIONS = 0

function ignoreInvocations(name: string, ignore: number, func: Func) {
  let n = 0
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    if (n++ < ignore) {
      // eslint-disable-next-line no-console
      console.warn(`IGNORING ${name} FUNCTION INVOCATION ${n}`)
      return
    } else {
      func(...args)
    }
  }
}

export class AfterDoneShellCommandPlugin {
  apply(compiler: webpack.Compiler) {
    const name = 'AFTER_DONE_SHELL_CMD'
    compiler.hooks.done.tap(
      name,
      ignoreInvocations(name, IGNORE_INVOCATIONS, () => {
        const cmd = AFTER_DONE_SHELL_CMD
        if (cmd) {
          cp.spawn(cmd, { shell: true, stdio: 'inherit' })
        }
      })
    )
  }
}
