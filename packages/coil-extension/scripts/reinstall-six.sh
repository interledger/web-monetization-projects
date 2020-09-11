#!/bin/bash -u
# We use set -e and bash with -u to bail on first non zero exit code of any
# processes launched or upon any unbound variable.
# We use set -x to print commands before running them to help with
# debugging.
set -ex

# Rebuild six apk
./scripts/sixpacker.sh

# So can override with the beta
SIX_PKG=${SIX_PKG:-com.sec.android.app.sbrowser}

## Uinstall old extension
#adb uninstall com.coil.android.six
#
## Force stop Samsung Internet
#adb shell am force-stop $SIX_PKG
## Clear Samsung Internet shared settings
#adb shell pm clear $SIX_PKG

# Reinstall SIX apk
adb install -r ./coil-six.apk

# Restart Samsung Internet
# adb shell am start $SIX_PKG
