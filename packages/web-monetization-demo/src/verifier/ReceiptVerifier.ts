import { randomBytes } from 'crypto'

import { injectable } from 'inversify'
import { decodeReceipt, verifyReceipt } from 'ilp-protocol-stream'

import { hmac } from '../utils/hmac'

export interface ReceiptDetails {
  receiptNonce: Buffer
  receiptSecret: Buffer
}

@injectable()
export class ReceiptVerifier {
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

  verify(receipt: string) {
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
    return amount
  }
}
