import cp from 'child_process'

import * as webpack from 'webpack'

import { AFTER_DONE_SHELL_CMD } from './env'

export class AfterDoneShellCommandPlugin {
  apply(compiler: webpack.Compiler) {
    const name = 'AFTER_DONE_SHELL_CMD'
    compiler.hooks.done.tap(name, () => {
      const cmd = AFTER_DONE_SHELL_CMD
      if (cmd) {
        cp.spawn(cmd, { shell: true, stdio: 'inherit' })
      }
    })
  }
}
