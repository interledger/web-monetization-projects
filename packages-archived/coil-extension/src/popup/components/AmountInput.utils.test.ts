import { calculateInputWidth, normalizeAmountInput } from './AmountInput.utils'

describe('handleAmountInputChange', () => {
  const tipContext = {
    maxAllowableTipAmountUsd: 20
  }
  it('should normalize fractional inputs', () => {
    const input = '0.1'
    const normed = normalizeAmountInput(input, tipContext)
    expect(normed).toStrictEqual({ displayValue: '1', value: '1' })
  })
  it('should ignore alphas', () => {
    const input = 'a'
    const normed = normalizeAmountInput(input, tipContext)
    expect(normed).toStrictEqual({ displayValue: '', value: '1' })
  })
  it('should ignore spaces', () => {
    const input = ' '
    const normed = normalizeAmountInput(input, tipContext)
    expect(normed).toStrictEqual({ displayValue: '', value: '1' })
  })
  it('should normalize 1.0 to 10', () => {
    const input = '1.0'
    const normed = normalizeAmountInput(input, tipContext)
    expect(normed).toStrictEqual({ displayValue: '10', value: '10' })
  })
  it('should normalize 10.0 to 10', () => {
    const input = '10.0'
    const normed = normalizeAmountInput(input, tipContext)
    expect(normed).toStrictEqual({ displayValue: '20', value: '20' })
  })
})

describe('calculateInputWidth', () => {
  it('should return a px denominated number', () => {
    const width = calculateInputWidth('1')
    expect(width).toBe('40px')
  })
  it('should return "80px" for "10"', () => {
    const width = calculateInputWidth('10')
    expect(width).toBe('80px')
  })
})
