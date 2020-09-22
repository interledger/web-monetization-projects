#!/bin/bash -u
# We use set -e and bash with -u to bail on first non zero exit code of any
# processes launched or upon any unbound variable.
# We use set -x to print commands before running them to help with
# debugging.
set -ex

SIX_DIR=${SIX_DIR:-six}

"$CHROME" --pack-extension="$PWD"/dist \
         --pack-extension-key="$COIL_SIX_PACK_KEY"

mv dist.crx "$SIX_DIR"/assets

pushd "$SIX_DIR"
jar cf ../coil-six.apk .
popd

jarsigner -verbose -keystore \
  "$COIL_SIX_KEYSTORE_PATH" \
  -storepass "$COIL_SIX_KEYSTORE_PASS" \
  coil-six.apk coilkey

echo 'To uninstall: "adb uninstall com.coil.android.six"'
echo 'To install:   "adb install -r ./coil-six.apk"'
