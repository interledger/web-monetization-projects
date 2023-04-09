export interface Environment {
  os: string
  tools: string[]
  matrices?: Array<string | { [key: string]: string[] }>
}

export interface Matrix {
  [key: string]: string[]
}

export type Job = {
  environments: string[]
  'inner-steps': Array<{
    run: {
      name: string
      command: string
    }
  }>
}

export interface Configuration {
  matrices: Matrix
  environments: Record<string, Environment>
  jobs: Record<string, Job>
}
