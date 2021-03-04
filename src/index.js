const {
  server: {
    port: SERVER_PORT
  },
  database: {
    path: DATABASE_PATH,
    port: DATABASE_PORT
  }
} = require('./config')

const bunyan = require('bunyan')
const redis = require('redis')

const app = require('./app')

// Set up logger instance and pass through reference to app
const logger = bunyan.createLogger({ name: 'article-gateway'})
app.setResource('logger', logger)

// Set up db instance and pass through reference to app
const redisClient = redis.createClient({ host: DATABASE_PATH, port: DATABASE_PORT})
redisClient.on('ready', () => {
  logger.info({ database: 'ready' })
  app.setResource('database', redisClient)
})

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