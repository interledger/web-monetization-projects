import { randomBytes } from 'crypto'

import { injectable } from 'inversify'
import { decodeReceipt, verifyReceipt } from 'ilp-protocol-stream'

import { dbg } from '../utils/logging'
import { hmac } from '../utils/hmac'

export interface BalanceRecord {
  balance: number
}

export interface ReceiptDetails {
  receiptNonce: Buffer
  receiptSecret: Buffer
}

@injectable()
export class ReceiptVerifier {
  balances: Record<string, BalanceRecord> = {}
  receipts: Record<string, number> = {}
  receiptSeed: Buffer = randomBytes(32)

  generateReceiptSecret(nonce: Buffer): Buffer {
    return hmac(this.receiptSeed, nonce)
  }

  generateReceiptDetails(): ReceiptDetails {
    const receiptNonce = randomBytes(16)
    return {
      receiptNonce,
      receiptSecret: this.generateReceiptSecret(receiptNonce)
    }
  }

  creditReceipt(requestId: string, receipt: string) {
    const receiptBuffer = Buffer.from(receipt, 'base64')
    const decoded = decodeReceipt(receiptBuffer)
    verifyReceipt(receiptBuffer, this.generateReceiptSecret(decoded.nonce))
    const receiptId = `${decoded.nonce.toString('base64')}:${decoded.streamId}`
    const totalReceived = decoded.totalReceived.toNumber()

    const amount = this.receipts[receiptId]
      ? totalReceived - this.receipts[receiptId]
      : totalReceived
    if (amount < 0) {
      throw new Error('stale receipt')
    }
    this.receipts[receiptId] = totalReceived
    dbg('received money', amount)
    if (typeof this.balances[requestId] !== 'object') {
      this.balances[requestId] = {
        balance: amount
      }
    } else {
      this.balances[requestId].balance += amount
    }
    return this.balances[requestId]
  }
}
