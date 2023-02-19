import fs from 'fs'

import glob from 'glob'
import YAML from 'yaml'

import { LernaListItem } from '../types'

interface PackageJson {
  name: string
  version: string
  private?: boolean
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>

  workspaces?: string[]
}

interface WorkspaceGlob {
  pattern: string
  exclusions: string[]
}

const compareFn = (a: LernaListItem, b: LernaListItem) =>
  a.name < b.name ? -1 : 1

async function loadWorkspaceFolders(givenFolder: string) {
  // Load package.json from given folder
  const packageJson = await fs.promises.readFile(
    `${givenFolder}/package.json`,
    'utf-8'
  )
  const { workspaces } = JSON.parse(packageJson) as PackageJson

  let workspaceGlobs: WorkspaceGlob[] = []

  if (workspaces) {
    workspaceGlobs = workspaces.map((workspace: string) => {
      if (workspace.startsWith('!')) {
        throw new Error('Workspace globs starting with ! are not supported.')
      }
      return {
        pattern: `${givenFolder}/${workspace}`,
        exclusions: []
      }
    })
  } else {
    // Load pnpm-workspace.yaml from given folder
    const pnpmWorkspaceYaml = await fs.promises.readFile(
      `${givenFolder}/pnpm-workspace.yaml`,
      'utf-8'
    )
    const parsedPnpmWorkspaceYaml = YAML.parse(pnpmWorkspaceYaml)

    if (!parsedPnpmWorkspaceYaml.packages) {
      throw new Error('No packages found in pnpm-workspace.yaml')
    }

    const exclusions = parsedPnpmWorkspaceYaml.packages
      .filter((exclusion: string) => exclusion.startsWith('!'))
      .map((exclusion: string) => `${givenFolder}/${exclusion.substring(1)}`)

    workspaceGlobs = parsedPnpmWorkspaceYaml.packages
      .filter((pattern: string) => !pattern.startsWith('!'))
      .map((pattern: string) => {
        return {
          pattern: `${givenFolder}/${pattern}`,
          exclusions
        }
      })
  }

  // Execute the specified list of globs relative to the initial givenFolder
  const workspaceFolders: string[] = (
    await Promise.all(
      workspaceGlobs.map(async (workspaceGlob: WorkspaceGlob) => {
        return new Promise<string[]>((resolve, reject) => {
          glob(
            workspaceGlob.pattern,
            { ignore: workspaceGlob.exclusions },
            (err, folders) => {
              if (err) {
                reject(err)
              } else {
                resolve(folders)
              }
            }
          )
        })
      })
    )
  ).flat()
  return workspaceFolders
}

export async function loadWorkspacePackages(
  givenFolder: string
): Promise<LernaListItem[]> {
  const workspaceFolders = await loadWorkspaceFolders(givenFolder)

  // Load the package.json file for each workspace folder
  const workspacesWithPackageJsons = await Promise.all(
    workspaceFolders.map(async (folderPath: string) => {
      const packageJson = await fs.promises.readFile(
        `${folderPath}/package.json`,
        'utf-8'
      )
      const parsedPackageJson = JSON.parse(packageJson) as PackageJson
      return { path: folderPath, packageJson: parsedPackageJson }
    })
  )

  // Create LernaListItem objects for each workspace and its dependencies
  const lernaListItems: LernaListItem[] = workspacesWithPackageJsons.map(
    ({ path, packageJson }) => {
      const dependencies: LernaListItem[] = []

      const {
        name: pkgName,
        version: pkgVersion,
        private: isPkgPrivate,
        dependencies: pkgDependencies,
        devDependencies: pkgDevDependencies
      } = packageJson

      for (const depName in {
        ...pkgDependencies,
        ...pkgDevDependencies
      }) {
        const dep = workspacesWithPackageJsons.find(
          workspace => workspace.packageJson.name === depName
        )

        if (dep) {
          dependencies.push({
            name: dep.packageJson.name,
            version: dep.packageJson.version,
            private: dep.packageJson.private ?? false,
            location: dep.path,
            dependencies: []
          })
        }
      }

      // Sort the dependencies by package name
      dependencies.sort(compareFn)

      return {
        name: pkgName,
        version: pkgVersion,
        private: isPkgPrivate ?? false,
        location: path,
        dependencies
      }
    }
  )

  // Sort the list of LernaListItem objects by package name
  lernaListItems.sort(compareFn)
  return lernaListItems
}
