const {
  core: {
    setResource,
    corsConfig,
    catchBadRoute,
    errorHandler
  }
} = require('./middlewares')
const routes = require('./routes')

const express = require('express')
const router = express.Router({ mergeParams: true })
router.use('/', routes)

const app = express()

// Remove x-powered-by to hide express
app.disable('x-powered-by')

app.setResource = setResource
app.use(corsConfig)

app.use(router)

app.use(catchBadRoute)
app.use(errorHandler)

module.exports = app