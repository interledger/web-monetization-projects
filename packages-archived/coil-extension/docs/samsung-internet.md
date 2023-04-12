### APK package name

    com.coil.android.six

### samsung internet browser package name:

    com.sec.android.app.sbrowser

### clear browser preferences:

    adb shell pm clear com.sec.android.app.sbrowser

### hard stop browser:

    adb shell am force-stop com.sec.android.app.sbrowser

### adb logcat browser:

    adb logcat --pid=$(adb shell pidof -s com.sec.android.app.sbrowser)

### adb logcat six:

    adb logcat --pid=$(adb shell pidof -s com.coil.android.six)

### force reset reinstall

    adb uninstall com.coil.android.six
    adb shell am force-stop com.sec.android.app.sbrowser
    adb shell pm clear com.sec.android.app.sbrowser
    adb install -r ./coil-six.apk
    adb shell am start com.sec.android.app.sbrowser

### remote devtools debugging

- enable android developer mode
- enable usb debugging
- go to chrome://inspect on host
