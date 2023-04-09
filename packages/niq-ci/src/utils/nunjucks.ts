import * as nunjucks from 'nunjucks'

nunjucks.configure({
  tags: {}
})

class MatrixExtension implements nunjucks.Extension {
  tags = ['matrix']

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parse(parser: any, nodes: any) {
    const token = parser.nextToken()
    const args = parser.parseSignature(null, true)
    parser.advanceAfterBlockEnd(token.value)
    return new nodes.CallExtension(this, 'run', args)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  run(context: any, key: string) {
    return `$\{{ matrix.${key} }}`
  }
}

export const nunjucksEnv = new nunjucks.Environment()
nunjucksEnv.addExtension('matrix', new MatrixExtension())
