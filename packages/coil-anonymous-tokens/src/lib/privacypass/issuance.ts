/**
 * Functions for handling issue requests and server responses
 * from: https://github.com/privacypass/challenge-bypass-extension/blob/master/src/ext/issuance.js
 */
import { sec1EncodeToBase64 } from './crypto'

export const CACHED_COMMITMENTS_STRING = 'cached-commitments'

/**
 * Retrieves the batchProof and signatures, depending on the type of object received
 * @param {Object} issueResp object containing signed points, DLEQ proof and
 * optional commitment version
 * @return {Object} Formatted object for inputs
 */
export function parseIssueResp(issueResp) {
  let signatures
  let batchProof
  let version
  // If this is not an array then the object is probably JSON.
  if (!issueResp[0]) {
    signatures = issueResp.sigs
    batchProof = issueResp.proof
    version = issueResp.version
  } else {
    batchProof = issueResp[issueResp.length - 1]
    signatures = issueResp.slice(0, issueResp.length - 1)
  }
  const prng = issueResp.prng || 'shake'
  return {
    signatures: signatures,
    proof: batchProof,
    version: version,
    prng: prng
  }
}

/**
 * Creates an issuance request for the current set of stored tokens. The format
 * is base64(json(BlindTokenRequest)), where BlindTokenRequest is a JSON struct
 * with "type":"Issue" and "contents":[ base64.encode(compressed_curve_points) ]
 *
 * @param {Array<Object>} tokens contains curve points for server signing
 * @return {string} base64-encoded issuance request
 */
export function BuildIssueRequest(tokens) {
  const contents: string[] = []
  for (let i = 0; i < tokens.length; i++) {
    const encodedPoint = sec1EncodeToBase64(tokens[i].point, true)
    contents.push(encodedPoint)
  }
  return btoa(JSON.stringify({ type: 'Issue', contents: contents }))
}
