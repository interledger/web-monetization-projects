# Debugging Extension on Firefox 69 / Ubuntu 18.04 LTS

### Install Firefox 69

Use the Mozilla PPA

```bash
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys A6DCF7707EBC211F
sudo apt-add-repository "deb http://ppa.launchpad.net/ubuntu-mozilla-security/ppa/ubuntu bionic main"
sudo apt update
sudo apt install firefox
```

### Debug Extension Popup

- Go to "about:debugging"
- Click "This Firefox"
  - ![image](https://user-images.githubusercontent.com/525211/66808860-48da4200-ef56-11e9-89ed-fd578e1ee683.png)
- Find "Coil" in the "Extensions" list and click the "Inspect" button
  - ![image](https://user-images.githubusercontent.com/525211/66808914-72936900-ef56-11e9-950c-02530d809ac4.png)
- Click the `...` context menu button and then "Disable Popup Auto-Hide"
  - ![image](https://user-images.githubusercontent.com/525211/66809086-d87ff080-ef56-11e9-9c0d-7052ad64784b.png)
- Select the "popup" context
  - ![image](https://user-images.githubusercontent.com/525211/66809720-1f221a80-ef58-11e9-87cb-080f29f569a0.png)
    - The select action button trigger is often partially concealed by the popup itself
      - ![image](https://user-images.githubusercontent.com/525211/66809845-57295d80-ef58-11e9-8a91-480f9c6d68e8.png)
  - ![image](https://user-images.githubusercontent.com/525211/66809735-2812ec00-ef58-11e9-9cfa-7bbf5685814b.png)
- The Webconsole context will have changed
  - ![image](https://user-images.githubusercontent.com/525211/66809976-8fc93700-ef58-11e9-934d-6b57be6e6fe9.png)
