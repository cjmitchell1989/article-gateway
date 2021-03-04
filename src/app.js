const express = require('express')
const app = express()

// Remove x-powered-by to hide express
app.disable('x-powered-by')

app.get('/', (req, res, next) => {
  res.status(200).send({ message: 'OK' })
  return next()
})

module.exports = app