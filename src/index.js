const {
  server: {
    port: SERVER_PORT
  }
} = require('./config')

const bunyan = require('bunyan')
const logger = bunyan.createLogger({ name: 'article-gateway'})

const app = require('./app')
app.setResource('logger', logger)

const server = app.listen(SERVER_PORT, () => {
  logger.info(`Server listening on port ${SERVER_PORT}`)
})

module.exports = server