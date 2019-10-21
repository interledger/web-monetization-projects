#!/bin/bash -u
# We use set -e and bash with -u to bail on first non zero exit code of any
# processes launched or upon any unbound variable.
# We use set -x to print commands before running them to help with
# debugging.
set -ex

DEV=${DEV:-false}
CI=${CI:-}

# Logout test logs in, waits for connecting to 3 sites, then logs out
# and makes sure the stream has closed so is a good default
TESTFILE=${1-'test/puppeteer/logout-test.ts'}

if [[ ${DEV} = 'false' ]]
then
  COMMAND="ts-node -r tsconfig-paths/register -T -P test/tsconfig.json"
else
  COMMAND="ts-node-dev -r tsconfig-paths/register -P test/tsconfig.json --respawn --transpileOnly"
fi

export DEBUG='coil*'
# This will all get ported to jest, but in the mean time it's useful

# shellcheck disable=SC2086
npx $COMMAND \
    "$TESTFILE"
