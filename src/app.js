const {
  core: {
    setResource
  }
} = require('./middlewares')

const express = require('express')
const app = express()

// Remove x-powered-by to hide express
app.disable('x-powered-by')

app.setResource = setResource

app.get('/', (req, res, next) => {
  const logger = req.app.get('logger')
  logger.info('test')

  res.status(200).send({ message: 'OK' })
  return next()
})

module.exports = app