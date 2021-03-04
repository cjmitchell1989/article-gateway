const cors = require('cors')

function setResource (type, resource) {
  this.set(type, resource)
}

// Set the cors config for the app
const corsConfig = cors({
  origin: '*'
})

module.exports = {
  setResource,
  corsConfig
}