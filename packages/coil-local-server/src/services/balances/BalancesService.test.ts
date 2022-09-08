import { BalancesService } from './BalancesService'

describe('BalancesService', () => {
  it('should be able to track packets for a payment pointer', () => {
    const pp = '$service.com/user'
    const balances = new BalancesService()
    balances.addPacket(pp, 1e6)
    expect(balances.getBalance(pp)).toEqual({
      balance: BigInt(1e6),
      packets: 1
    })
    balances.addPacket(pp, '1000000')
    expect(balances.getBalance(pp)).toEqual({
      balance: BigInt(2e6),
      packets: 2
    })
    expect(balances.getBalances()).toMatchInlineSnapshot(`
      {
        "$service.com/user": {
          "balance": 2000000n,
          "packets": 2,
        },
      }
    `)
  })
})
