const {
  server: {
    port: SERVER_PORT
  }
} = require('./config')

const app = require('./app')
const server = app.listen(SERVER_PORT, () => {
  console.info(`Server listening on port ${SERVER_PORT}`)
})

module.exports = server