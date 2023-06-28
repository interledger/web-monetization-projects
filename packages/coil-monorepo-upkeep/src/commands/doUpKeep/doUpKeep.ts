import * as pathModule from 'path'
import { existsSync, writeFileSync } from 'fs'

import { log } from '../../utils/log'
import {
  fromRoot,
  readFileJSON,
  readPackageJSON,
  relativeTo,
  relativeToRoot,
  writeFileJSON,
  writePackageJSON
} from '../../utils'
import { LernaListItem, PackageJSON, TSConfig } from '../../types'
import { flatMapSlow } from '../../utils/flatMapSlow'
import { cmd } from '../../utils/cmd'
import { loadWorkspacePackages } from '../../utils/loadWorkspaces'

const OVER_RIDE_UP_KEEP = '$overRideUpKeep'

// TODO: may need to make it abs path
const PACKAGE_LOCATION =
  process.env.UPKEEP_PACKAGE_LOCATION ??
  pathModule.resolve(__dirname, '../../..')

const STATIC_SHARED_DUPLICATED_PATH = 'templates/static-shared-duplicated'
const CREATE_IF_DONT_EXIST_PATH = 'templates/create-if-dont-exist'

const IDE_TSCONFIG = 'tsconfig.json'
const BUILD_TSCONFIG = 'tsconfig.build.json'
const REFERENCES_TSCONFIG = 'tsconfig.references.json'

const UPKEEP_JSON_OPTS = { prefix: '// GENERATED BY UPKEEP\n' }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const copydir: any = require('copy-dir')
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deepMerge: any = require('deepmerge')

function checkDependencies(
  subPackage: LernaListItem,
  rootPackageJSON: PackageJSON,
  depsTypes = ['devDependencies']
) {
  const packageJSONPath = `${subPackage.location}/package.json`
  const subPackageJSON = readPackageJSON(packageJSONPath)
  let changed = false

  for (const depsType of depsTypes) {
    if (!subPackageJSON[depsType]) {
      subPackageJSON[depsType] = {}
      changed = true
    }

    const subPackageDeps = subPackageJSON[depsType]
    // if (!subPackageDeps) {
    //   continue
    // }
    // const rootPackageDepsForType = rootPackageJSON[depsType] ?? {}
    // Object.keys(rootPackageDepsForType).forEach(depKey => {
    //   const rootVer = rootPackageDepsForType[depKey]
    //   const subPackageVer = subPackageDeps[depKey]
    //   if (!subPackageVer) {
    //     changed = true
    //     log(subPackage.name, 'adding root version', depKey, rootVer)
    //     subPackageDeps[depKey] = rootVer
    //   } else if (subPackageVer !== rootVer) {
    //     changed = true
    //     log(subPackage.name, 'list', depKey, 'in root package.json')
    //     log(subPackage.name, 'removing', depKey, subPackageVer)
    //     log(subPackage.name, 'using root version', depKey, rootVer)
    //     subPackageDeps[depKey] = rootVer
    //   }
    // })

    Object.keys(subPackageDeps).forEach(depKey => {
      const rootPackageDepsForType = rootPackageJSON[depsType]
      if (rootPackageDepsForType && rootPackageDepsForType[depKey]) {
        log(
          'subpackage',
          subPackageJSON.name,
          `has redundant ${depsType} from root`,
          depKey
        )
        log('root version', rootPackageDepsForType[depKey])
        log('subpackage version', subPackageDeps[depKey])
        log('removing')
        delete subPackageDeps[depKey]
        changed = true
      }
    })
  }
  if (changed) {
    writePackageJSON(packageJSONPath, subPackageJSON)
  }
}

function setCommonScriptsAndMergeOverrides(
  rootPackageJSON: PackageJSON,
  subPackage: LernaListItem,
  subPackageJSON: PackageJSON
) {
  const pathFromRoot = relativeToRoot(subPackage.location)
  if (
    !rootPackageJSON.repository ||
    !rootPackageJSON.repository.url ||
    rootPackageJSON.repository.type !== 'git'
  ) {
    throw new Error('expecting git url for repository in root package.json')
  }

  const githubPath = rootPackageJSON.repository.url.split(':')[1].slice(0, -4)

  let updated: PackageJSON = {
    ...subPackageJSON,
    // TODO: use workspace
    version: '0.0.0',
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    homepage: `https://github.com/${githubPath}/tree/main/${pathFromRoot}`,
    keywords: rootPackageJSON.keywords,
    repository: rootPackageJSON.repository,
    main: './build',
    types: './build',
    private: rootPackageJSON.upkeep?.privatePackages ?? undefined,
    author: rootPackageJSON.author,
    license: rootPackageJSON.license,
    $schema: `${relativeTo(
      subPackage.location,
      PACKAGE_LOCATION
    )}/resources/package-json-schema-nested-overrides.json`,
    scripts: {
      ...(subPackageJSON.scripts || {}),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      postinstall: undefined!,
      precommit: 'echo lint-staged runs from root',
      prettier:
        "prettier --write '*.{mts,ts,tsx,js,html,jsx,md}' '{src,test}/**/*.{mts,ts,tsx,js,html,jsx,md}'",
      format: 'pnpm prettier && LINT_FIX=1 pnpm lint:all --fix --quiet',
      'build:ts': 'tsc --build tsconfig.build.json',
      'build:ts:watch': 'pnpm build:ts --watch',
      'build:ts:verbose': 'pnpm build:ts --verbose',
      'clean:build': 'rimraf build',
      // example of deleting an old script
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      root: undefined!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setenv: undefined!,
      tsnodeenv:
        'NODE_OPTIONS="${NODE_OPTIONS:-} --require tsconfig-paths/register" TS_NODE_PROJECT="../../tsconfig.cjs.json"',
      upkeep: 'cd ../.. && pnpm upkeep',
      'lint:all': "pnpm lint 'src/**/*.{mts,ts,tsx}' 'test/**/*.{mts,ts,tsx}'",
      lint: 'eslint --cache --cache-location ../../node_modules/.cache/eslint',
      'test:e2e': 'JEST_E2E=1 pnpm run test',
      'test:e2e:coverage': 'JEST_E2E=1 pnpm run test:coverage',
      test: 'NODE_OPTIONS=--experimental-vm-modules  PROJECT_JEST=1 jest --passWithNoTests',
      'test:coverage': 'pnpm run test --verbose --coverage'
    }
  }

  // We don't want this
  delete updated['lint-staged']

  if (updated[OVER_RIDE_UP_KEEP]) {
    const overrides = updated[OVER_RIDE_UP_KEEP]
    updated = deepMerge(updated, overrides, {
      // Overwrite existing values completely
      arrayMerge: (_: any, src: any) => src
    })
  }
  writePackageJSON(`${subPackage.location}/package.json`, updated)
  return updated
}

function upKeepTypeScriptBuildConfig(
  subPackageJSON: PackageJSON,
  subPackage: LernaListItem
) {
  const tsconfigPatch = subPackageJSON.upkeep?.tsconfigPatch
  const rootDir = tsconfigPatch?.compilerOptions?.rootDir ?? 'src'
  const tsconfig: TSConfig = {
    extends: '../../tsconfig.build.settings.json',
    compilerOptions: {
      composite: true,
      outDir: './build',
      tsBuildInfoFile: './build/tsconfig.build.tsbuildinfo',
      rootDir,
      ...tsconfigPatch?.compilerOptions
    },
    // Unfortunately, resolveJsonModule: true and simply `src` does
    // not seem to work
    include: [
      `${rootDir}/**/*.tsx`,
      `${rootDir}/**/*.ts`,
      `${rootDir}/**/*.json`,
      ...(tsconfigPatch?.include ?? [])
    ],
    exclude: [`${rootDir}/**/*.test.ts`, `${rootDir}/**/*.test.tsx`]
  }

  if (subPackage.dependencies.length) {
    tsconfig.references = subPackage.dependencies.map(li => {
      return {
        path: `${relativeTo(
          subPackage.location,
          li.location
        )}/tsconfig.build.json`
      }
    })
  }
  writeFileJSON(
    `${subPackage.location}/tsconfig.build.json`,
    tsconfig,
    UPKEEP_JSON_OPTS
  )
}

interface UpkeepStaticSharedDuplicatedParameters {
  subPackage: LernaListItem
  path: string
  cover: boolean
}

function copyTemplatesDir({
  subPackage,
  path,
  cover
}: UpkeepStaticSharedDuplicatedParameters) {
  copydir.sync(`${PACKAGE_LOCATION}/${path}`, subPackage.location, {
    // TODO: elegant convention
    utimes: true,
    mode: true,
    cover
  })
}

function upKeepIDETsConfigPaths(
  subPackages: LernaListItem[],
  rootPackageJSON: PackageJSON
) {
  const path = fromRoot(IDE_TSCONFIG)
  const tsconfig = readFileJSON<TSConfig>(path)
  tsconfig.compilerOptions = tsconfig.compilerOptions || {}
  const paths: Record<string, string[]> =
    rootPackageJSON.upkeep?.tsconfigPatch?.compilerOptions?.paths ?? {}
  subPackages.forEach(li => {
    const packagePath = relativeToRoot(li.location)

    const path = `./${packagePath}/src`
    paths[li.name] = [path]
    const subPackageJSON = readPackageJSON(`${li.location}/package.json`)
    // Handle any @ns/package/derp redirects
    if (subPackageJSON.subpackages) {
      subPackageJSON.subpackages.forEach(name => {
        const folderPath = pathModule.join(fromRoot(path), name)
        const tsPath = pathModule.join(fromRoot(path), `${name}.ts`)
        let isFolder = true
        if (existsSync(folderPath)) {
          // folder
          paths[`${li.name}/${name}`] = [`${path}/${name}`]
        } else if (existsSync(tsPath)) {
          isFolder = false
          paths[`${li.name}/${name}`] = [`${path}/${name}.ts`]
        } else {
          throw new Error()
        }
        cmd(`rm -rf ${packagePath}/${name}`, { cwd: fromRoot('.') })
        cmd(`mkdir ${packagePath}/${name}`, { cwd: fromRoot('.') })

        writeFileJSON(fromRoot(`${packagePath}/${name}/package.json`), {
          name: `${li.name}/${name}`,
          private: true,
          version: '0.0.0',
          main: `../build/${isFolder ? name : `${name}.js`}`,
          types: `../build/${isFolder ? name : `${name}.d.ts`}`
        })
      })
    }
  })
  tsconfig.compilerOptions.paths = paths
  writeFileJSON(path, tsconfig, UPKEEP_JSON_OPTS)
}

function upKeepStaticSharedTemplates(subPackage: LernaListItem) {
  copyTemplatesDir({
    subPackage,
    path: STATIC_SHARED_DUPLICATED_PATH,
    cover: true
  })
}

function copyInDefaultFiles(subPackage: LernaListItem) {
  copyTemplatesDir({
    subPackage,
    path: CREATE_IF_DONT_EXIST_PATH,
    cover: false
  })
}

function upKeepReferencesTsConfig(subPackages: LernaListItem[]) {
  const tsconfig: TSConfig = {
    files: [],
    references: subPackages.map(li => ({
      path: pathModule.join(relativeToRoot(li.location), BUILD_TSCONFIG)
    }))
  }
  writeFileJSON(fromRoot(REFERENCES_TSCONFIG), tsconfig, UPKEEP_JSON_OPTS)
}

function createDefaultReadmeFile(subPackage: LernaListItem) {
  const path = pathModule.join(subPackage.location, 'README.md')
  const words = subPackage.name.slice(1).split(/[/-]/)
  const toTitle = (w: string) => w.charAt(0).toUpperCase() + w.slice(1)
  const titleCase = words.map(toTitle).join(' ')
  const README = `# ${titleCase}

A work in progress. You probably don't want this.

`
  if (!existsSync(path)) {
    writeFileSync(path, README)
  }
}

function upKeepIntelliJExcludes(subPackages: LernaListItem[]) {
  const exclude = '<excludeFolder url="file://$MODULE_DIR$/%PATH%"/>'
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<module type="JAVA_MODULE" version="4">
  <component name="NewModuleRootManager" inherit-compiler-output="true">
    <exclude-output/>
    <content url="file://$MODULE_DIR$">
      %EXCLUDES%
    </content>
    <orderEntry type="inheritedJdk"/>
    <orderEntry type="sourceFolder" forTests="false"/>
  </component>
</module>
    `
  const root = fromRoot('.')
  const moduleName = pathModule.basename(root)
  const path = fromRoot(`./.idea/${moduleName}.iml`)
  const locations = subPackages.map(li => li.location).concat(root)
  if (existsSync(path)) {
    const excludes = flatMapSlow(locations, li => {
      return ['dist', 'build', 'results', 'safari'].map(folder => {
        const from = pathModule.join(li, folder)
        const replacement = pathModule.relative(root, from)
        return exclude.replace(/%PATH%/, replacement)
      })
    }).join('\n')
    writeFileSync(path, xml.replace(/%EXCLUDES%/, excludes))
  } else if (existsSync(fromRoot('./.idea'))) {
    console.warn('warning: IDEA user expecting to exist', path)
  }
}

export async function doUpKeep() {
  log({ upKeeping: true })

  const subPackages = await loadWorkspacePackages(fromRoot('.'))
  const rootPackageJSON = readPackageJSON(fromRoot('package.json'))

  for (const subPackage of subPackages) {
    // Do last, TODO: nothing should mutate package.json
    checkDependencies(subPackage, rootPackageJSON)
    const subPackageJSON = readPackageJSON(
      `${subPackage.location}/package.json`
    )
    setCommonScriptsAndMergeOverrides(
      rootPackageJSON,
      subPackage,
      subPackageJSON
    )
    upKeepTypeScriptBuildConfig(subPackageJSON, subPackage)
    upKeepStaticSharedTemplates(subPackage)
    copyInDefaultFiles(subPackage)
    createDefaultReadmeFile(subPackage)
  }

  upKeepIDETsConfigPaths(subPackages, rootPackageJSON)
  upKeepReferencesTsConfig(subPackages)
  upKeepIntelliJExcludes(subPackages)
  // Not using "manual" dependabot configuration currently.
  // The .dependabot/config.yml removed from repo.
  // upKeepDependabotConfiguration(subPackages)

  log({ upKeepingDone: true })
}
