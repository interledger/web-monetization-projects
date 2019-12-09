import { injectable } from 'inversify'

@injectable()
export class ScriptInjection {
  constructor(private document: Document) {}

  inject(code: string) {
    const document = this.document
    const script = document.createElement('script')
    script.innerHTML = code
    document.documentElement.appendChild(script)

    // clean it up afterwards
    document.documentElement.removeChild(script)
  }
}
