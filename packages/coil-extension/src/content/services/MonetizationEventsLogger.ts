import { injectable } from 'inversify'
import { ScriptInjection } from '@web-monetization/wext/content'

@injectable()
export class MonetizationEventsLogger {
  constructor(private scripts: ScriptInjection) {}

  bindLoggersToEvents() {
    const events = [
      'monetizationstart',
      'monetizationstop',
      'monetizationpending'
    ]
    const code = events
      .map(
        e =>
          `document.monetization.addEventListener('${e}', ` +
          `(e) => console.log(e.type, JSON.stringify(e.detail)) )`
      )
      .join(';')
    this.scripts.inject(code)
  }
}
