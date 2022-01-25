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

function retry() {
  local n=0
  local try=$1
  local cmd="${@:2}"
  [[ $# -le 1 ]] && {
    echo "Usage $0 <retry_number> <Command>"
  }

  until [[ $n -ge $try ]]; do
    $cmd && break || {
      echo "Command Fail.."
      # echo the n++ else the ((n++)) *seems* to be treated as an exit code
      # and -u will bail
      echo $((n++))
      echo "retry $n ::"
      sleep 1
    }

  done
}

if [[ ${DEV} = 'false' ]]; then
  COMMAND="ts-node -r tsconfig-paths/register -T -P test/tsconfig.json"
else
  COMMAND="ts-node-dev -r tsconfig-paths/register -P test/tsconfig.json --respawn --transpile-only"
fi

export DEBUG='coil*'

retry 3 yarn "$COMMAND" "$TESTFILE"
