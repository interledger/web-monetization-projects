import {
  BaseHttpController,
  controller,
  httpGet
} from 'inversify-express-utils'

@controller('/handler.html')
export class HandlerController extends BaseHttpController {
  @httpGet('/')
  handler() {
    // see: https://github.com/coilhq/coil/blob/2fa7f8555c6166bcd7b3b7d0133ba012eb9b93e6/services/yoshi/public/handler.html
    return `
<p>
This is used by the extension with a liberal CSP, with no frame-ancestors
directive to prevent clickjacking. This allows the extension to access the auth
token. Named handler.html for historical reasons and backcompat
</p>  
 `
  }
}
