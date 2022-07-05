SAFARI_DIR=${SAFARI_DIR:-safari}
SAFARI_SCHEME=${SAFARI_SCHEME:-Coil (macOS)}
xcodebuild build -scheme "$SAFARI_SCHEME" -project "$SAFARI_DIR"/Coil/Coil.xcodeproj
echo "check Safari (v14+) -> Preferences -> Extensions"
echo "make sure to enable developer mode for extensions"
