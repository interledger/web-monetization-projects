import {
  BaseHttpController,
  controller,
  httpGet
} from 'inversify-express-utils'
import { loginMutation } from '@coil/client'
import { initCoil } from '@coil/puppeteer-utils'

const attr = (a: string) => a.slice(1, a.length - 1)

@controller('/login')
export class LoginController extends BaseHttpController {
  @httpGet('/')
  login() {
    // language=HTML
    return `
      <!doctype html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <script type="application/javascript">
          const gateWayPath = window.location.origin + '/gateway'
          const loginMutation = ${JSON.stringify(
            loginMutation.replace('token', 'token\nuser {email, id}')
          )}

          function submit() {
            try {
              const variables = {
                input: {
                  password: document.getElementById('password').value,
                  email: document.getElementById('email').value
                }
              }
              const init = {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query: loginMutation, variables })
              }

              // TODO: make submit an async function?
              fetch(gateWayPath, init).then(result => {
                return result.text().then(t => {
                  const parsed = JSON.parse(t)
                  document.getElementById('log').innerHTML = JSON.stringify(parsed, null, 2)
                  localStorage.token = parsed.data.auth.token
                  window.dispatchEvent(new Event('coil_writeToken'))
                  const domain = new URL(window.location.href)
                  domain.pathname = '/handler.html'
                  setTimeout(() => {
                    window.location = domain.href
                  }, 3e3)
                })
              }).catch(e => {
                console.error(e)
              })
            } catch (e) {
              console.error(e)
            }
          }

          document.addEventListener('readystatechange', () => {
            if (document.readyState === 'complete') {
              document.getElementById('form').addEventListener(
                'submit', (event) => {
                  event.preventDefault()
                  submit()
                  return false
                }
              )
            }
          })
        </script>
        <title>Login</title>
      </head>
      <body>
      <form id="form">
        <input ${attr(
          initCoil.loginSelector
        )} id="email" type="email" placeholder="email">
        <input ${attr(
          initCoil.passwordSelector
        )} id="password" type="password" placeholder="password">
        <button ${attr(initCoil.nextSelector)} type="submit">Log in</button>
      </form>
      <pre id="log"></pre>
      </body>
      </html>
    `
  }
}
