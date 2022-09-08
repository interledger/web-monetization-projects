import { injectable } from 'inversify'

@injectable()
export class BalancesService {
  private balances: Record<string, { balance: bigint; packets: number }> = {}

  addPacket(paymentPointer: string, amount: number | string) {
    const record = (this.balances[paymentPointer] ??= {
      balance: 0n,
      packets: 0
    })
    record.packets++
    record.balance += BigInt(amount)
  }

  getBalance(paymentPointer: string) {
    return this.balances[paymentPointer]
  }

  getBalances() {
    return this.balances
  }
}
