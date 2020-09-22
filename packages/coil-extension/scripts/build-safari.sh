SAFARI_DIR=${SAFARI_DIR:-safari}
xcodebuild build -project "$SAFARI_DIR"/Coil/Coil.xcodeproj
echo "check Safari (v14+) -> Preferences -> Extensions"
echo "make sure to enable developer mode for extensions"
