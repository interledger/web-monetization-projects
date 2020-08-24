#!/bin/bash -u
# We use set -e and bash with -u to bail on first non zero exit code of any
# processes launched or upon any unbound variable.
# We use set -x to print commands before running them to help with
# debugging.
set -ex

# Rebuild six apk
./scripts/sixpacker.sh

# Uinstall old extension
adb uninstall com.coil.android.six

# Force stop Samsung Internet
adb shell am force-stop com.sec.android.app.sbrowser
# Clear Samsung Internet shared settings
adb shell pm clear com.sec.android.app.sbrowser

# Reinstall SIX apk
adb install -r ./coil-six.apk

# Restart Samsung Internet
adb shell am start com.sec.android.app.sbrowser
