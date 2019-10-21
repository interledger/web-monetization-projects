import { inject, injectable } from 'inversify'

import * as tokens from '../tokens'

@injectable()
export class ScriptInjection {
  constructor(@inject(tokens.Document) private document: Document) {}

  inject(code: string) {
    const document = this.document
    const script = document.createElement('script')
    script.innerHTML = code
    document.documentElement.appendChild(script)

    // clean it up afterwards
    document.documentElement.removeChild(script)
  }
}
