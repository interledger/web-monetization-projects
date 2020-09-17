# Safari

### Build safari project after webpack

```
export AFTER_EMIT_SHELL_CMD="./scripts/build-safari.sh"
yarn dev-chrome-prod
```

### Loading unsigned extensions

- First enable the Develop menu:
  Preferences -> Advanced
  ![img](safari-preferences-advanced-show-develop-menu.png)
- Then:
  Develop -> Allow Unsigned Extensions
  ![img](safari-menu-develop-allow-unsigned-extensions.png)
- Then toggle the extension:
  Preferences -> Extensions
  ![img](safari-menu-preferences-extensions.png)
