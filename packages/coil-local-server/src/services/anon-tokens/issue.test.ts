import { InnerIssueRequest } from './AnonTokenIssuerController'

describe('Anonymous Tokens Issuing', () => {
  it('all starts with an issue request', () => {
    const request =
      '{"bl_sig_req":"eyJ0eXBlIjoiSXNzdWUiLCJjb250ZW50cyI6WyJBdzBrMmVwL2l0RzZGK0hHU1cvQ0N4dm9HZEU3cVp5VWp6MDNyTVhPeFppaCIsIkFvU052QWJVZzU3dzUrSmRLNVBvZkhVL1J0dzlxT1NPRi9nN3pFdzRsMFcwIiwiQXd4dUo3aHVSaUx5V2dwZGttSnQvTHIyOWFOYUxSUUZURm9hNEJOUG1WOVAiLCJBaDk1Q3JaN050T2ltK1ZOL2VaUExlM3I5M0EwaFhMSG12YnpNNkFBQk1GSyIsIkEvdEg2YUFNUzZQRnZ5SDgraWgxY3FoaGdrN2Vnc2IyTFZpb0FZOG40WUh3IiwiQTJqM1Q3ditwNW5oaEliamhMUlhxdU5BODNOWXhTcm1ZUGZXcUUvcFJmc3AiLCJBcHhGN00yQkZod2RSQlZ4VmJLQ0dhRWVhSUZ4MXdiaFowOExaNm91UzNyNiIsIkFyTG1LeVpOdWZCK2hKNGl6L2dQd0ptaGZFYkkzZHRmdnJzRk9KUm9aNWFwIiwiQWxsOVE4VUd4cS8zbHhDQjhXNWg4RERXVFk0dFRTaEFEcjA0K1d2SUVoY0oiLCJBOVE3cVB0bjltQVpJUEQ0M1BXeGdTUExQdzkrSUFyT05oSXpMZk1TL3QyQiJdfQ=="}'
    const response = {
      sigs: [
        'BEkLV8CXn3629nZWMd5prYEUE9EuQ9Qjp8TxIYLD4/m+7o25PnpCyqJrLFlWnin3HR+wDQU4FT5b7+w2ccmn74I=',
        'BEzGbWUX+//MqNuARVx4b5AxWin1u7bv+xDjSXEuX+wTwqdUKksnv2f0wdNaIv1JKzSWU2rJaelgE/9pRbgcTos=',
        'BBvnM+MRmit9r8UetjO5Ce+6JfivMKSn9f+Tsv//84S/0CUxQY+VypPNZettXd00lA80IdzPFN7z+dxy8y42+z4=',
        'BD5Pz68SycycreD/uYZrqbyHvr+1f0segqVL5uV9sAQtgpo0PuvGCJgTe7ginuoKqUe75HEjuAttbKabrffQduw=',
        'BMVzb7VwnaiiVmIycbQ4z05j++wORhRaYG/F9PA0JJw3lK1wai212MpxO5vQ8530OKX5AI5mLGAj9/PfHdcWwJI=',
        'BM8UNshmQ6idrPfn7hWy3pmbB04GThsCW23Zu44Vv8DRGi+SOoz4uhokb/u6jqDhD87ZtI1jtDtLCifwCCfMQOc=',
        'BKNLnd7etKWhR/3GopJq8cqDCQbT+DHSv6uL+jJSENCdyHM+BoQdC3eYgJBoPbLjitUPVadHNe3ZaK7RDURGrEQ=',
        'BKVOVnNwV97WP/lzaNFy3nQzOREBN27IYSNSw/tk9i85eCdba7U6UflZGQM6SJBgDSlaaBawreiN0xCpxjTKD68=',
        'BCsUkNPkoFWv8LpxnK1ZLoDAo9cOiBG2Qi9hCte0u8FY3Znp8Q3gJUffUzTLNOdD9QBcoCHTIJ8B6bPWCAtgsI4=',
        'BFYu/IC9rgohmwfnyyfrsMMznhLlQd7ArmpcQQikGdrV6K6s19Zl+WCfoA0Omtn8k/E8RagaHipJ2NWVBr5smXc='
      ],
      proof:
        'YmF0Y2gtcHJvb2Y9eyJQIjoiZXlKU0lqb2lkbUUyWVRGd2VIUk9iRWxHVm5OMmF6QnhaV1oyTTBGcVVpOVpja1ZqVjBaNkwzaFFOazlCVERkMVJUMGlMQ0pESWpvaU9WcHNXblZLZUZaVmJXeGtVVEp1VFVScGNGQTRPWFIwUVZwc2F6WnNkRmhCVEZaUll5ODRUemhTZHowaWZRPT0ifQ==',
      version: '1.0'
    }
    const jsonParsed: { bl_sig_req: string } = JSON.parse(request)
    const base64Parsed = Buffer.from(jsonParsed.bl_sig_req, 'base64')
    const innerJSON: InnerIssueRequest = JSON.parse(base64Parsed.toString())

    // Each element in the request's `contents` array is a base64 encoded compressed
    // point on the p256 curve
    innerJSON.contents.forEach(val => {
      const buf = Buffer.from(val, 'base64')
      // 32 bytes x, + 1 byte for whether y is odd
      expect(buf.length).toBe(33)
      expect(buf[0].toString()).toMatch(/[23]/)
    })

    // Each element in the response's `sigs` array is a base64 encoded
    // uncompressed point on the p256 curve
    response.sigs.forEach(sig => {
      const decoded = Buffer.from(sig, 'base64')
      expect(decoded.length).toBe(65)
      expect(decoded[0]).toBe(0x04)
    })
  })
})
