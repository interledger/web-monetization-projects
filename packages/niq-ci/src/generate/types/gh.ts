export interface GithubActionsStep {
  name: string
  run: string
}

export interface GithubActionsJob {
  'runs-on': string
  strategy?: {
    matrix: Record<string, string[]>
    fail_fast?: boolean
  }
  steps: GithubActionsStep[]
}
