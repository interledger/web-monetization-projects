#!/bin/bash -u
# We use set -e and bash with -u to bail on first non zero exit code of any
# processes launched or upon any unbound variable.
# We use set -x to print commands before running them to help with
# debugging.
set -ex

SAFARI_DIR=${SAFARI_DIR:-safari}
SAFARI_SCHEME=${SAFARI_SCHEME:-Coil (macOS)}
xcodebuild build -scheme "$SAFARI_SCHEME" -project "$SAFARI_DIR"/Coil/Coil.xcodeproj
echo "check Safari (v14+) -> Preferences -> Extensions"
echo "make sure to enable developer mode for extensions"
