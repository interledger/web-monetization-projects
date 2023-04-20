/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  name: 'tsconfig-paths-plugin',
  factory: require => {
    return {
      hooks: {
        setupScriptEnvironment(project, scriptEnv) {
          if (!(scriptEnv.TSCONFIG_PATHS_REGISTER === 'false')) {
            scriptEnv.TS_NODE_PROJECT = `${__dirname}/../../tsconfig.cjs.json`
            scriptEnv.NODE_OPTIONS += ' --require tsconfig-paths/register '
          }
        }
      }
    }
  }
}
