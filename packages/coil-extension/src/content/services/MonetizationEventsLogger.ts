import { injectable } from 'inversify'
import { ScriptInjection } from '@web-monetization/wext/content'

@injectable()
export class MonetizationEventsLogger {
  constructor(private scripts: ScriptInjection) {}

  bindLoggersToEvents() {
    const events = [
      'monetizationstart',
      'monetizationstop',
      'monetizationpending',
      'tip'
      // Don't log these events
      // 'monetizationprogress'
    ]
    const code = events
      .map(
        e =>
          `document.monetization.addEventListener('${e}', ` +
          `(e) => console.log(
           '%c Web-Monetization %s event:  %s',
           'color: aqua; background-color: black',
           e.type,
           JSON.stringify(e.detail)) )
          `
      )
      .join(';')
    this.scripts.inject(code)
  }
}
