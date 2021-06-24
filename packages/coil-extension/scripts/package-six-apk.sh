#!/bin/bash -u
# We use set -e and bash with -u to bail on first non zero exit code of any
# processes launched or upon any unbound variable.
# We use set -x to print commands before running them to help with
# debugging.
set -ex

# Build without the suffix
unset WEXT_MANIFEST_SUFFIX
# Enable production web-packing
NODE_ENV=production yarn build-prod chrome
# Create an apk
scripts/sixpacker.sh
