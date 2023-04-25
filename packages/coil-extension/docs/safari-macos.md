# Safari

### Build safari project after webpack

```
export AFTER_DONE_SHELL_CMD="./scripts/build-safari.sh"
pnpm dev-chrome-prod
```

### Loading unsigned extensions

- First enable the Develop menu:
  Preferences -> Advanced
  ![img](./safari-preferences-advanced-show-develop-menu.png)
- Then:
  Develop -> Allow Unsigned Extensions
  ![img](./safari-menu-develop-allow-unsigned-extensions.png)
- Then toggle the extension:
  Preferences -> Extensions
  ![img](./safari-menu-preferences-extensions.png)

### Debugging

- Enable debugging:
  Develop -> Web Extension Background Pages
  ![image](https://user-images.githubusercontent.com/525211/93846107-54d59480-fccd-11ea-9d81-121ebbc02d3c.png)
