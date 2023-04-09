import { removeCommonIndentation } from './removeCommonIndentation'

describe('removeCommonIndentation', () => {
  test('removes common leading indentation', () => {
    const input = [
      '', // this should be trimmed in initial step
      // if we run trim() here it's no good.
      '  ' + 'function foo() {',
      "    return 'bar';",
      '  }',
      '  ', // this should be trimmed in initial step
      '' // this should be trimmed
    ].join('\n')

    const expectedOutput = ['function foo() {', "  return 'bar';", '}'].join(
      '\n'
    )

    expect(removeCommonIndentation(input)).toEqual(expectedOutput)
  })

  test('handles empty strings', () => {
    expect(removeCommonIndentation('')).toEqual('')
  })

  test('handles strings with no leading indentation', () => {
    const input = "function foo() {\n  return 'bar';\n}\n"
    expect(removeCommonIndentation(input)).toEqual(input.trim())
  })
})
