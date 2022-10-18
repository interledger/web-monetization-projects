import http from 'http'

const requestListener: http.RequestListener = function (req, res) {
  res.writeHead(200, {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link
    link: '<https://ilp.uphold.com/gRa4mXFEMYrL>; ' + 'rel="monetization"'
  })
  res.end('Hello, World!')
}

const server = http.createServer(requestListener)
const port = 8080

server.listen(port, () => {
  console.log(`listening on ${port}! `)
})
