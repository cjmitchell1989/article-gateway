const {
  errors: {
    ResponseError
  }
} = require('../lib')
const cors = require('cors')

function setResource (type, resource) {
  this.set(type, resource)
}

// Set the cors config for the app
const corsConfig = cors({
  origin: '*'
})

// If a route doesn't exist, return this to user
const catchBadRoute = (req, res, next) => {
  if (!res.headersSent) {
    // If headers not sent then no route has been found to respond to user
    // Set an error and fall to error handler
    return next(new ResponseError({ statusCode: 404, message: 'Route not found' }))
  }
  return next()
}

// Set up error handler so any error passed by next(err) is caught
const errorHandler = (err, req, res, next) => {
  if (err && err.statusCode) {
    res.status(err.statusCode).send({ message: err.message })
  } else {
    res.status(500).send({ message: 'Server error' })
  }
  return next()
}

module.exports = {
  setResource,
  corsConfig,
  catchBadRoute,
  errorHandler
}