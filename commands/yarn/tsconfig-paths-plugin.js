/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  name: 'tsconfig-paths-plugin',
  factory: (require) => {
    const { Command } = require(`clipanion`)

    class HelloWorldCommand extends Command {
      async execute() {
        this.context.stdout.write(`This is my very own plugin 😎\n`)
      }
    }

    HelloWorldCommand.addPath(`hello`)

    return {
      commands: [
        HelloWorldCommand
      ],
      hooks: {
        setupScriptEnvironment(project, scriptEnv) {
          if (scriptEnv.TSCONFIG_PATHS_REGISTER) {
            scriptEnv.NODE_OPTIONS += ' --require tsconfig-paths/register'
          }
        },
      }
    }
  }
}
