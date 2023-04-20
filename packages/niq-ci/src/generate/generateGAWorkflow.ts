import { readFile, writeFile } from 'fs/promises'

import * as yaml from 'js-yaml'

import { dbg, fromRoot, pretty } from '../utils'
import { nunjucksEnv } from '../utils/nunjucks'

import { Configuration, Job } from './types/generic'
import { GithubActionsJob, GithubActionsStep } from './types/gh'

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
    name: 'Setup PNPM',
    uses: 'pnpm/action-setup@v2',
    with: {
      version: 7
    }
  },
  {
    name: 'Restore Cache',
    uses: 'actions/cache@v3',
    with: {
      path: '${{ github.workspace }}/node_modules',
      key: cacheKey
    }
  },
  {
    name: 'PNPM Install',
    run: `export PUPPETEER_CACHE_DIR=$PWD/puppeteer-cache
pnpm install
export PUPPETEER_PRODUCT='firefox'
pnpm install`
  }
  // Inner steps go here
  // {
  //   name: 'Save Cache',
  //   uses: 'actions/cache@v3',
  //   with: {
  //     path: '${{ github.workspace }}/.yarn',
  //     key: cacheKey
  //   }
  // }
]

const firstSteps = steps
const lastSteps: Array<(typeof steps)[0]> = []

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
    const environmentName = job.environments[0]
    const extra = makeJobStrategy(job, parsed)
    const innerSteps = parseInnerSteps(job)
    const runsOn = environmentName.includes('macos')
      ? 'macos-latest'
      : 'ubuntu-latest'

    base.jobs[jobName] = {
      'runs-on': runsOn,
      ...extra,
      steps: [
        ...firstSteps,
        ...innerSteps,
        ...lastSteps
      ] as Array<GithubActionsStep>
    }
  })
  return base
}

async function generateGAWorkflow() {
  const jobsFile = fromRoot('.ci/jobs.yml')
  const file = await readFile(jobsFile, 'utf-8')
  const parsed = yaml.load(file) as Configuration

  const base = convertConfigToGithubActions(parsed)
  dbg(pretty(base))

  const comment =
    '# This has been auto generated from .ci/jobs.yml. ' +
    'Do not edit this file!\n'
  const yml =
    comment +
    yaml.dump(base, {
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
  generateGAWorkflow().catch(console.error)
}
