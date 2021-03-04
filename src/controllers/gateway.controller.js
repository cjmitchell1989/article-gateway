const {
  errors: {
    ResponseError
  }
} = require('../lib')
const {
  server: {
    maxAccesses: MAX_ACCESSES
  }
} = require('../config')
const {
  Access: AccessService
} = require('../services')

const checkAccessLimit = (req, res, next) => {
  const logger = req.app.get('logger')
  if (typeof logger === 'undefined') {
    return next(new ResponseError({ statusCode: 503, message: 'Server not ready' }))
  }

  const database = req.app.get('database')
  if (typeof database === 'undefined') {
    return next(new ResponseError({ statusCode: 503, message: 'Server not ready' }))
  }

  // Retrieve client_id from query params and validate
  const clientId = req.query.client_id
  if (typeof clientId === 'undefined' || clientId.length < 1) {
    return next(new ResponseError({ statusCode: 401, message: 'client_id query parameter must be included' }))
  }
  
  const accessService = new AccessService(logger, database, MAX_ACCESSES)
  accessService.checkAccessLimit(clientId).then(result => {
    res.status(200).send(result)
    return next()
  }).catch(err => {
    logger.info(err)
    return next(err)
  })
  
}

module.exports = {
  checkAccessLimit
}