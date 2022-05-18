/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path')

function sort(getter) {
  return function (a, b) {
    // eslint-disable-next-line no-nested-ternary
    return getter(a) < getter(b) ? -1 : getter(a) > getter(b) ? 1 : 0
  }
}

module.exports = {
  // Formats the workspaces in the same format as (abandon-ware) lerna --list did
  name: 'workspaces-list-with-dependencies',
  factory: require => {
    const cli = require('@yarnpkg/cli')
    const {
      Project,
      Manifest,
      structUtils,
      Configuration
    } = require('@yarnpkg/core')

    function fromRoot(...paths) {
      return resolve(__dirname, '..', '..', ...paths)
    }

    function getRecordFromWorkspace(workspace) {
      const { manifest } = workspace
      return {
        name: manifest.name ? structUtils.stringifyIdent(manifest.name) : null,
        version: manifest.version,
        private: manifest.private || false,
        location: fromRoot(workspace.relativeCwd)
      }
    }

    function formatWorkspaceDependencies(workspaceDependencies) {
      return {
        dependencies: Array.from(workspaceDependencies)
          .map(workspace => {
            return getRecordFromWorkspace(workspace)
          })
          .sort(sort(w => w.name))
      }
    }

    class List extends cli.BaseCommand {
      static paths = [['workspaces', 'list-with-dependencies']]

      async execute() {
        const configuration = await Configuration.find(
          this.context.cwd,
          this.context.plugins
        )
        const { project } = await Project.find(configuration, this.context.cwd)
        const workspaces = project.workspaces

        workspaces.sort(sort(w => w.manifest.name))
        for (const workspace of workspaces) {
          this.getDependencies(workspace, project)
        }
      }

      getDependencies(workspace, project) {
        const { manifest } = workspace
        const workspaceDependencies = new Set()

        for (const dependencyType of Manifest.hardDependencies) {
          for (const [identHash, descriptor] of manifest.getForScope(
            dependencyType
          )) {
            const matchingWorkspace =
              project.tryWorkspaceByDescriptor(descriptor)

            if (matchingWorkspace !== null) {
              workspaceDependencies.add(matchingWorkspace)
            }
          }
        }
        this.printWorkspaceRecord(workspace, workspaceDependencies)
      }

      printWorkspaceRecord(workspace, workspaceDependencies) {
        const log = (...args) =>
          this.context.stdout.write(`${args.join(' ') + '\n'}`)

        const record = {
          ...getRecordFromWorkspace(workspace),
          ...formatWorkspaceDependencies(workspaceDependencies)
        }
        if (record.location !== fromRoot('.')) {
          log(JSON.stringify(record))
        }
      }
    }

    return {
      commands: [List]
    }
  }
}
