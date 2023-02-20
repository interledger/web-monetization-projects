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

interface Workspace {
  location: string
  packageJson: PackageJson
}

const nameComparator = (a: LernaListItem, b: LernaListItem) =>
  a.name < b.name ? -1 : 1

const borrowedFields = (packageJson: PackageJson) => {
  return {
    name: packageJson.name,
    version: packageJson.version,
    private: packageJson.private ?? false
  }
}

async function executeGlobs(workspaceGlobs: WorkspaceGlob[]) {
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

async function getPNPMWorkspaceGlobs(givenFolder: string) {
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

  const pnpmGlobs = parsedPnpmWorkspaceYaml.packages
    .filter((pattern: string) => !pattern.startsWith('!'))
    .map((pattern: string) => {
      return {
        pattern: `${givenFolder}/${pattern}`,
        exclusions
      }
    })
  return pnpmGlobs
}

async function getWorkspaceFolders(givenFolder: string) {
  // Load package.json from given folder
  const packageJson = await fs.promises.readFile(
    `${givenFolder}/package.json`,
    'utf-8'
  )
  const { workspaces } = JSON.parse(packageJson) as PackageJson
  let workspaceGlobs: WorkspaceGlob[]

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
    // TODO, check if pnpm file exists
    workspaceGlobs = await getPNPMWorkspaceGlobs(givenFolder)
  }

  // Execute the specified list of globs relative to the initial givenFolder
  return await executeGlobs(workspaceGlobs)
}

function formatListItems(
  locationAndPackageJSONs: Awaited<{
    packageJson: PackageJson
    location: string
  }>[]
) {
  return locationAndPackageJSONs.map(({ location, packageJson }) => {
    const dependencies: LernaListItem[] = []
    for (const depName in {
      ...packageJson.dependencies,
      ...packageJson.devDependencies
    }) {
      const dep = locationAndPackageJSONs.find(
        workspace => workspace.packageJson.name === depName
      )

      if (dep) {
        dependencies.push({
          ...borrowedFields(dep.packageJson),
          location: dep.location,
          dependencies: []
        })
      }
    }

    // Sort the dependencies by package name
    dependencies.sort(nameComparator)

    return {
      ...borrowedFields(packageJson),
      location,
      dependencies
    }
  })
}

async function loadWorkspaces(
  workspaceFolders: string[]
): Promise<Workspace[]> {
  return await Promise.all(
    workspaceFolders.map(async (folderPath: string) => {
      const packageJson = await fs.promises.readFile(
        `${folderPath}/package.json`,
        'utf-8'
      )
      const parsedPackageJson = JSON.parse(packageJson) as PackageJson
      return { location: folderPath, packageJson: parsedPackageJson }
    })
  )
}

export async function loadWorkspacePackages(
  givenFolder: string
): Promise<LernaListItem[]> {
  const workspaceFolders = await getWorkspaceFolders(givenFolder)

  // Load the package.json file for each workspace folder
  const locationAndPackageJSONs = await loadWorkspaces(workspaceFolders)

  // Create LernaListItem objects for each workspace and its dependencies
  const lernaListItems: LernaListItem[] = formatListItems(
    locationAndPackageJSONs
  )

  // Sort the list of LernaListItem objects by package name
  lernaListItems.sort(nameComparator)
  return lernaListItems
}
