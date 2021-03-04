require('dotenv').config()

module.exports = {
  port: process.env.PORT || 3000,
  maxAccesses: process.env.MAX_ACCESSES || 3
}