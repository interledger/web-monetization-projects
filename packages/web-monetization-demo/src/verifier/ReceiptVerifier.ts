import { createHmac, randomBytes } from 'crypto'

import { injectable } from 'inversify'
import { Reader } from 'oer-utils'

import { dbg } from './logging'

const RECEIPT_VERSION = 1
const HASH_ALGORITHM = 'sha256'

function hmac(key: Buffer, message: Buffer): Buffer {
  const h = createHmac(HASH_ALGORITHM, key)
  h.update(message)
  return h.digest()
}

export interface BalanceRecord {
  firstPacketMs: number
  lastPacketMs: number
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
    const reader = Reader.from(Buffer.from(receipt, 'base64'))
    if (reader.readUInt8Number() !== RECEIPT_VERSION) {
      throw new Error('invalid receipt version')
    }
    const nonce = reader.readOctetString(16)
    const streamId = reader.readUInt8()
    const totalReceived = parseInt(reader.readUInt64())

    const receiptHmac = reader.readOctetString(32)
    const secret = this.generateReceiptSecret(nonce)

    if (!receiptHmac.equals(hmac(secret, reader.buffer.slice(0, 26)))) {
      throw new Error('invalid receipt')
    }

    const receiptId = `${nonce.toString('base64')}:${streamId}`
    const amount = this.receipts[receiptId]
      ? totalReceived - this.receipts[receiptId]
      : totalReceived
    if (amount < 0) {
      throw new Error('stale receipt')
    }
    this.receipts[receiptId] = totalReceived
    dbg('received money', amount)
    const now = Date.now()
    if (typeof this.balances[requestId] !== 'object') {
      this.balances[requestId] = {
        balance: amount,
        lastPacketMs: now,
        firstPacketMs: now
      }
    } else {
      this.balances[requestId].balance += amount
      this.balances[requestId].lastPacketMs = now
    }
    return this.balances[requestId]
  }
}
