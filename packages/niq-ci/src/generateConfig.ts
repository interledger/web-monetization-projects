import { readFile, writeFile } from 'fs/promises'
import { resolve } from 'path'

import * as yaml from 'js-yaml'
import * as nunjucks from 'nunjucks'

const pretty = (val: unknown) => JSON.stringify(val, null, 2)
// eslint-disable-next-line no-console
const dbg = console.log

const fromRoot = (...segments: string[]) =>
  resolve(__dirname, '../../..', ...segments)

export interface Environment {
  os: string
  tools: string[]
  matrices?: Array<string | { [key: string]: string[] }>
}

export interface Matrix {
  [key: string]: string[]
}

type Job = {
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

const actionsBase = {
  name: 'CI',
  on: {
    push: {
      branches: ['main']
    },
    pull_request: {
      branches: ['main']
    }
  },
  jobs: {} as Record<string, GithubActionsJob>
}

nunjucks.configure({
  tags: {}
})

class MatrixExtension implements nunjucks.Extension {
  tags = ['matrix']

  parse(parser: any, nodes: any) {
    const token = parser.nextToken()
    const args = parser.parseSignature(null, true)
    parser.advanceAfterBlockEnd(token.value)
    return new nodes.CallExtension(this, 'run', args)
  }

  run(context: any, key: string) {
    return `$\{{ matrix.${key} }}`
  }
}

const nunjucksEnv = new nunjucks.Environment()
nunjucksEnv.addExtension('matrix', new MatrixExtension())

const cacheKey =
  "v1-dependencies-${{ runner.os }}-${{ hashFiles('package.json', 'yarn.lock') }}-${{ matrix.node-version }}"
const steps = [
  {
    name: 'Checkout',
    uses: 'actions/checkout@v3'
  },
  {
    name: 'Setup Node.js',
    uses: 'actions/setup-node@v3',
    with: {
      'node-version': '${{ matrix.node-version }}'
    }
  },
  {
    name: 'Restore Cache',
    uses: 'actions/cache@v3',
    with: {
      path: '${{ github.workspace }}/.yarn',
      key: cacheKey
    }
  },
  {
    name: 'Yarn Install',
    run: `export PUPPETEER_CACHE_DIR=$PWD/puppeteer-cache
yarn --immutable
export PUPPETEER_PRODUCT='firefox'
yarn rebuild puppeteer`
  },
  {
    name: 'Save Cache',
    uses: 'actions/cache@v3',
    with: {
      path: '${{ github.workspace }}/.yarn',
      key: cacheKey
    }
  }
]

const firstSteps = steps.slice(0, 4)
const lastSteps = steps.slice(5)

function parseInnerSteps(job: Job) {
  return job['inner-steps'].map(step => {
    if (!step.run) {
      throw new Error('step must be an object with a run field')
    }

    const command = step.run.command
    const rendered = nunjucksEnv.renderString(command, {})
    return { name: step.run.name, run: rendered }
  })
}

function getJobMatrix(job: Job, config: Configuration) {
  const matrix = config.matrices

  const jobEnvName = job.environments[0]
  const env = config.environments[jobEnvName]

  const matrixCombined: Record<string, string[]> = {}
  if (env.matrices) {
    const matrices = env.matrices
    matrices.forEach(val => {
      if (typeof val === 'string') {
        matrixCombined[val] = matrix[val]
      } else {
        Object.assign(matrixCombined, val)
      }
    })
  }
  return matrixCombined
}

function makeJobStrategy(job: Job, config: Configuration) {
  const matrixCombined = getJobMatrix(job, config)
  return Object.keys(matrixCombined).length
    ? {
        strategy: {
          matrix: matrixCombined
        }
      }
    : undefined
}

function convertConfigToGithubActions(parsed: Configuration) {
  const base = { ...actionsBase }

  Object.entries(parsed.jobs).forEach(([jobName, job]) => {
    // Support only one environment now
    if (job.environments.length !== 1) {
      throw new Error('more than one environment currently not supported')
    }
    const extra = makeJobStrategy(job, parsed)
    const innerSteps = parseInnerSteps(job)
    base.jobs[jobName] = {
      ...extra,
      'runs-on': job.environments[0].includes('macos')
        ? 'macos-latest'
        : 'ubuntu-latest',
      steps: [
        ...firstSteps,
        ...innerSteps,
        ...lastSteps
      ] as Array<GithubActionsStep>
    }
  })
  return base
}

async function generateConfig() {
  const jobsFile = fromRoot('.ci/jobs.yml')
  const file = await readFile(jobsFile, 'utf-8')
  const parsed = yaml.load(file) as Configuration

  const base = convertConfigToGithubActions(parsed)
  dbg(pretty(base))
  const yml = yaml.dump(base, {
    indent: 2,
    noRefs: true,
    lineWidth: Infinity
  })
  dbg(yml)
  const fn = fromRoot('.github/workflows/generated-jobs.yml')
  await writeFile(fn, yml)
  dbg('wrote config to', fn)
}

if (require.main === module) {
  // eslint-disable-next-line no-console
  generateConfig().catch(console.error)
}
