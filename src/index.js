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

// Handle process ends
const shutdown = ({ code = 0, message = 'FAIL' } = {}) => {
  logger.warn(`Shutting down with error code: ${code} Message: ${message}`)
  if (server) {
    server.close()
  }
  process.exit()
}
process.on('SIGINT', () => { shutdown({ code: 1, message: 'SIGINT' }) })
process.on('SIGTERM', () => { shutdown({ code: 1, message: 'SIGTERM' }) })


module.exports = server