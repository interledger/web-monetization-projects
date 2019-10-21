import { execSync, ExecSyncOptions } from 'child_process'

export const cmd = (command: string, opts?: ExecSyncOptions) =>
  execSync(command, {
    ...opts,
    encoding: 'utf8',
    stdio: 'pipe'
  }).trimRight()
