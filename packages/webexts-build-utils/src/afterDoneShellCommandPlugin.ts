import process from 'process'
import cp from 'child_process'

import * as webpack from 'webpack'

export const afterDoneShellCommandPlugin = {
  apply: (compiler: webpack.Compiler) => {
    const name = 'AFTER_DONE_SHELL_CMD'
    compiler.hooks.done.tap(name, () => {
      const cmd = process.env.AFTER_DONE_SHELL_CMD
      if (cmd) {
        cp.spawn(cmd, { shell: true, stdio: 'inherit' })
      }
    })
  }
}
