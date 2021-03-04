require('dotenv').config()

module.exports = {
  path: process.env.DATABASE_PATH || 'localhost',
  port: process.env.DATABASE_PORT || 6379
}