import * as bodyParser from 'body-parser'
import * as express from 'express'

export const configureMiddleware = (app: express.Application) => {
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  app.use(bodyParser.text())
  app.use('*', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Headers', '*')
    next()
  })
}
