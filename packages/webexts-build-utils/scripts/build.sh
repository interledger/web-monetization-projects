#!/bin/bash -u
# We use set -e and bash with -u to bail on first non zero exit code of any
# processes launched or upon any unbound variable.
# We use set -x to print commands before running them to help with
# debugging.
set -ex

WEXT_SKIP_PNPM=${WEXT_SKIP_PNPM:-false}
if [[ ${WEXT_SKIP_PNPM} = 'true' ]]
then
  echo 'skipping pnpm install'
else
  pnpm install
fi

BUILD_TS=${BUILD_TS:-true}
TS_LOADER_TRANSPILE_ONLY=${TS_LOADER_TRANSPILE_ONLY:-false}

if [[ ${BUILD_TS} = 'false' ]] || [[ ${TS_LOADER_TRANSPILE_ONLY} = 'true' ]]
then
  echo 'skipping build typescript step'
else
  time pnpm build:ts:verbose
fi

BROWSER_NAME=${2:-chrome}
BUILD_ENV=${1:-prod}
EXTRA_ARGS=${@:3}

if [[ ${BROWSER_NAME} = "firefox" ]]
then
  BROWSER_API=chrome
elif [[ ${BROWSER_NAME} = "chrome" ]]
then
  BROWSER_API=chrome
elif [[ ${BROWSER_NAME} = "edge" ]]
then
  BROWSER_API=chrome
else
  BROWSER_API=chrome
fi

if [[ ${BUILD_ENV} = "dev" ]]
then
  WEBPACK=cjsconf/webpack.dev.ts
elif [[ ${BUILD_ENV} = "staging" ]]
then
  WEBPACK=cjsconf/webpack.staging.ts
elif [[ ${BUILD_ENV} = "prod" ]]
then
  WEBPACK=cjsconf/webpack.prod.ts
else
  WEBPACK=cjsconf/webpack.prod.ts
fi

echo Running ${BUILD_ENV} build for ${BROWSER_NAME}...
# See pnpm plugin for TSCONFIG_PATHS_REGISTER
NODE_OPTIONS="${NODE_OPTIONS:-} --require tsconfig-paths/register" TS_NODE_PROJECT="../../tsconfig.cjs.json" TS_NODE_TRANSPILE_ONLY=${TS_NODE_TRANSPILE_ONLY:-true} BROWSER=${BROWSER_NAME} API=${BROWSER_API} pnpm webpack-cli --config ${WEBPACK} ${EXTRA_ARGS}
