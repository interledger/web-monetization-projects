import {
  BaseHttpController,
  controller,
  httpGet
} from 'inversify-express-utils'
import { loginMutation } from '@coil/client'
import { initCoilSelectors } from '@coil/puppeteer-utils'

const selToAttr = (a: string) => a.slice(1, a.length - 1)

@controller('/auth/login')
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

          const log = (...args) => {
            // noinspection UnnecessaryLocalVariableJS
            const innerHTML = args.map(val => JSON.stringify(val)).join('')
            document.getElementById('log').innerHTML = innerHTML
          }
          
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
                  log(parsed)
                  const token = parsed?.data?.auth?.token
                  if (token) {
                    localStorage.token = token
                    window.dispatchEvent(new Event('coil_writeToken'))
                    const domain = new URL(window.location.href)
                    domain.pathname = '/settings'
                    // This is for the puppeteer test that waits for navigation
                    setTimeout(() => {
                      window.location = domain.href
                    }, 3e3)
                  }
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
              if (localStorage.token) {
                const domain = new URL(window.location.href)
                domain.pathname = '/settings'
                log('redirecting to ', domain.href)
                window.location.href = domain.href
              }
            }
          })
        </script>
        <title>Login</title>
      </head>
      <body>
      <form id="form">
        <input ${selToAttr(
          initCoilSelectors.loginSelector
        )} id="email" type="email" placeholder="email">
        <input ${selToAttr(
          initCoilSelectors.passwordSelector
        )} id="password" type="password" placeholder="password">
        <button ${selToAttr(
          initCoilSelectors.nextSelector
        )} type="submit">Log in
        </button>
      </form>
      <pre id="log"></pre>
      </body>
      </html>
    `
  }
}
