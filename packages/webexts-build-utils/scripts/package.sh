#!/bin/bash -u
# We use set -e and bash with -u to bail on first non zero exit code of any
# processes launched or upon any unbound variable.
# We use set -x to print commands before running them to help with
# debugging.
set -ex

BROWSER_NAME=${1:-chrome}
FIREFOX_PACKAGE_ZIP=${2}
CHROME_PACKAGE_ZIP=${3}
EDGE_PACKAGE_ZIP=${4}

echo Packaging extension for ${BROWSER_NAME}

cd_dist_zip () {
  wd=dist
  output=$1
  # zip with sync to file system and recursive options
  cd ${wd} && zip -rFS ${output} *
}

rm -rf dist

# Install deps
pnpm
# Build typescript, including dependency project references
NODE_ENV=production pnpm build-prod ${BROWSER_NAME}

if [[ ${BROWSER_NAME} = "firefox" ]]
then
  cd_dist_zip ../"$FIREFOX_PACKAGE_ZIP"
elif [[ ${BROWSER_NAME} = "chrome" ]]
then
  cd_dist_zip ../"$CHROME_PACKAGE_ZIP"
elif [[ ${BROWSER_NAME} = "edge" ]]
then
  cd_dist_zip ../"$EDGE_PACKAGE_ZIP"
fi
