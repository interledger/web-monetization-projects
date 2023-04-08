import { inspect } from 'util'

import {
  cache,
  CircleCIConfig,
  DockerImage,
  Job,
  jobUnbound,
  parameterizedNodeVersion,
  ParameterType,
  step,
  Step
} from './circleCI'
import { bind } from './bindUtils'

const cacheKey =
  'v6-dependencies-{{ checksum "package.json" }}-{{ checksum "yarn.lock" }}-<< parameters.node-version >>'
const safariCacheKey =
  'safari-build-dependencies-{{ checksum "package.json" }}-{{ checksum "yarn.lock" }}'

const nodeVersions = ['16.19.0', '18.4.0']

function makeNodeVersionMatrix(nodeVersion: string[] = nodeVersions) {
  return {
    matrix: {
      parameters: {
        'node-version': nodeVersion
      }
    }
  }
}

const nodeVersionMatrix = makeNodeVersionMatrix()
const withCommand = (command: string[]) => {
  return {
    matrix: {
      parameters: {
        'node-version': nodeVersions,
        command
      }
    }
  }
}

const firstNodeVersion = nodeVersions.slice(0, 1)
const justOneVersionMatrix = makeNodeVersionMatrix(firstNodeVersion)
const defaultCache = cache(cacheKey)
const safariCache = cache(safariCacheKey)

const yarnInstall: Step = step(
  'Yarn Install',
  `
  export PUPPETEER_CACHE_DIR=$PWD/puppeteer-cache
  yarn --immutable
  export PUPPETEER_PRODUCT='firefox'
  yarn rebuild puppeteer
`
)

const job = bind(jobUnbound, {
  cacheSteps: defaultCache,
  baseJob: parameterizedNodeVersion,
  baseSteps: [yarnInstall]
})

const lintAll = job([step('Lint Project', 'yarn lint:all --quiet')])

const buildSafari: Job = {
  macos: {
    xcode: '13.4.1'
  },
  ...job(
    [
      step(
        'Build Safari',
        `
      cd packages/coil-extension
      yarn build-prod safari
      scripts/build-safari.sh
    `
      )
    ],
    { cacheSteps: safariCache }
  )
}

const coilExtensionPackage: Job = job([
  step(
    'Package for firefox',
    `
      cd packages/coil-extension
      ./package.sh firefox
    `
  ),
  step(
    'Package for chrome',
    `
      cd packages/coil-extension
      ./package.sh chrome
    `
  ),
  step(
    'Lint firefox package',
    `
      cd packages/coil-extension
      yarn addons-linter coilfirefoxextension@coil.com.xpi
    `
  )
])

const buildAllPackageReferencesTypeScript: Job = job([
  step(
    'Build Root TypeScript Project - tsconfig.build.json',
    'yarn build:ts --verbose'
  )
])

const buildRootTsconfig: Job = job([
  step(
    'Build Root TypeScript Project - tsconfig.json',
    `
      yarn tsc -b tsconfig.json \
        --verbose
    `
  )
])

const jestJobBase = {
  parameters: {
    command: {
      type: ParameterType.String,
      default: 'test:coverage'
    },
    'node-version': {
      type: ParameterType.String
    }
  },
  docker: [
    { image: DockerImage.Node + ':<< parameters.node-version >>-browsers' }
  ]
}

const jestAll: Job = {
  ...jestJobBase,
  ...job([
    step(
      'Run jest via dynamic compilation',
      `
      export DEBUG='coil*'
      export TS_JEST_MAP_PATHS_TO_MODULES=true
      xvfb-run -a yarn << parameters.command >>
    `
    ),
    step(
      'Run jest via babel',
      `
      export DEBUG='coil*'
      export TS_JEST_MAP_PATHS_TO_MODULES=true
      cp jest.config.local.example.js jest.config.local.js 
      xvfb-run -a yarn << parameters.command >>
    `
    ),
    step(
      'Run jest from build',
      `
      export DEBUG='coil*'
      yarn clean:build || echo "already clean"
      yarn build:ts:verbose
      export TS_JEST_MAP_PATHS_TO_MODULES=false
      xvfb-run -a yarn << parameters.command >>
    `
    )
  ])
}

const jestWorkspacesForeachAll: Job = {
  ...jestJobBase,
  ...job([
    step(
      'Yarn workspaces foreach run jest via dynamic compilation',
      `
      export TS_JEST_MAP_PATHS_TO_MODULES=true
      export PUPPETEER_CACHE_DIR=$PWD/puppeteer-cache
      xvfb-run -a yarn workspaces foreach -v --exclude=web-monetization run << parameters.command >>
    `
    ),
    step(
      'Yarn workspaces foreach run jest from build',
      `
      yarn clean:build || echo "already clean"
      yarn build:ts:verbose
      export TS_JEST_MAP_PATHS_TO_MODULES=false
      export PUPPETEER_CACHE_DIR=$PWD/puppeteer-cache
      xvfb-run -a yarn workspaces foreach -v --exclude=web-monetization run << parameters.command >>
    `
    )
  ])
}

const packagesBuildScripts: Job = {
  ...job([
    step(
      'Packages Build Scripts',
      `
      yarn workspaces foreach -v --exclude=web-monetization run build
    `
    )
  ])
}

const yarnFormatAndUpkeepDiffCheck: Job = job([
  step(
    'Yarn Dedupe Check',
    `
      yarn dedupe --check
    `
  ),
  step(
    'yarn dlx @yarnpkg/sdks vscode',
    `
      yarn dlx @yarnpkg/sdks vscode
      git diff --exit-code -- . ':!yarn.lock' ':!.pnp.cjs'
    `
  ),
  step(
    'Yarn format git diff --exit-code',
    `
      yarn format
      yarn upkeep
      git diff --exit-code -- . ':!yarn.lock' ':!.pnp.cjs'
    `
  ),
  step(
    'Build generated code git diff --exit-code',
    `
      yarn workspaces foreach -v --exclude=web-monetization run generate-code
      git diff --exit-code -- . ':!yarn.lock' ':!.pnp.cjs'
    `
  )
])

const jobs: Record<string, Job> = {
  'lint-all': lintAll,
  'build-safari': buildSafari,
  'coil-extension-package': coilExtensionPackage,
  'build-all-package-references-typescript':
    buildAllPackageReferencesTypeScript,
  'build-root-tsconfig': buildRootTsconfig,
  'jest-all': jestAll,
  'jest-workspaces-foreach-all': jestWorkspacesForeachAll,
  'packages-build-scripts': packagesBuildScripts,
  'yarn-format-and-upkeep-diff-check': yarnFormatAndUpkeepDiffCheck
}

const config: CircleCIConfig = {
  version: '2.1',
  jobs,
  workflows: {
    version: 2,
    build: {
      jobs: Object.entries(jobs).map(([k, v]) => {
        return {
          [k]: {
            ...(k === 'build-safari'
              ? justOneVersionMatrix
              : k.includes('jest')
              ? { ...nodeVersionMatrix }
              : nodeVersionMatrix)
          }
        }
      })
    }
  }
}
console.log(inspect(config, false, Infinity))
// console.log(JSON.stringify(buildSafari, null, 2))
