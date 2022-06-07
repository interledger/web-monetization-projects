import { controller, httpGet } from 'inversify-express-utils'

@controller('/settings')
export class SettingsController {
  @httpGet('/')
  async settings() {
    return `
<!doctype html>
<html lang="en">
<head>
<title>Settings</title>
<script type="application/javascript">
  function logout() {
    delete localStorage.token 
    window.dispatchEvent(new Event('coil_writeToken'))
  }
</script>
</head>
<body>
<svg data-cy='hamburger-toggle'></svg>
<button><p data-testid="signout-nav-button" onclick="logout()">Sign Out</p></button>  
</body>
</html>
    `
  }
}
