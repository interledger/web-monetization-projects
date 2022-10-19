import http from 'http'

const log = console.log

const requestListener: http.RequestListener = function (req, res) {
  log('url', req.url)
  if (req.url === '/') {
    res.writeHead(200, {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link
      link: '<https://ilp.uphold.com/gRa4mXFEMYrL>; ' + 'rel="monetization"'
    })
    res.end('Hello, World!')
  } else {
    res.writeHead(404)
    res.end('Not Found')
  }
}

const server = http.createServer(requestListener)
const port = 8080

server.listen(port, () => {
  console.log(`listening on ${port}! `)
})
