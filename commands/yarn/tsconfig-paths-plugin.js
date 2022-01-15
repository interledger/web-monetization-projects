/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  name: 'tsconfig-paths-plugin',
  factory: require => {
    return {
      hooks: {
        setupScriptEnvironment(project, scriptEnv) {
          if (!(scriptEnv.TSCONFIG_PATHS_REGISTER === 'false')) {
            scriptEnv.NODE_OPTIONS += ' --require tsconfig-paths/register'
          }
          scriptEnv.NODE_OPTIONS += ' --experimental-modules'
        }
      }
    }
  }
}
