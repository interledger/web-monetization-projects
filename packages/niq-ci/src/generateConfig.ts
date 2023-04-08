import { readFile, writeFile } from 'fs/promises'
import { resolve } from 'path'

import * as yaml from 'js-yaml'
import * as nunjucks from 'nunjucks'

const pretty = (val: unknown) => JSON.stringify(val, null, 2)
// eslint-disable-next-line no-console
const dbg = console.log

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

interface GithubActionsJob {
  'runs-on': string
  strategy?: {
    matrix: Record<string, string[]>
    fail_fast?: boolean
  }
  steps: {
    name: string
    run: string
  }[]
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
    command: `export PUPPETEER_CACHE_DIR=$PWD/puppeteer-cache
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

async function generateConfig() {
  const jobsFile = resolve(__dirname, '../../../.ci/jobs.yml')
  const file = await readFile(jobsFile, 'utf-8')
  const parsed = yaml.load(file) as Configuration
  const base = { ...actionsBase }
  Object.entries(parsed.jobs).forEach(([k, v]) => {
    const matrix = parsed.matrices
    const jobEnvName = v.environments[0]
    const env = parsed.environments[jobEnvName]
    if (jobEnvName.includes('macos')) {
      return
    }

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

    const extra = Object.keys(matrixCombined).length
      ? {
          strategy: {
            matrix: matrixCombined
          }
        }
      : undefined

    const innerSteps = v['inner-steps'].map(step => {
      const command = step.run.command
      const rendered = nunjucksEnv.renderString(command, {})
      return { name: step.run.name, run: rendered }
    })
    base.jobs[k] = {
      ...extra,
      'runs-on': jobEnvName.includes('macos') ? '' : 'ubuntu-latest',
      steps: [...firstSteps, ...innerSteps, ...lastSteps] as any // TODO
    }
  })
  dbg(pretty(base))
  const yml = yaml.dump(base, {
    indent: 2,
    noRefs: true,
    lineWidth: Infinity
  })
  dbg(yml)
  await writeFile(
    resolve(__dirname, '../../../.github/workflows/generated-jobs.yml'),
    yml
  )
}

if (require.main === module) {
  // eslint-disable-next-line no-console
  generateConfig().catch(console.error)
}
