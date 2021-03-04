const {
  errors: {
    ResponseError
  }
} = require('../lib')
const {
  Access: AccessService
} = require('../services')

const checkAccessLimit = (req, res, next) => {
  const logger = req.app.get('logger')

  // Retrieve client_id from query params and validate
  const clientId = req.query.client_id
  if (typeof clientId === 'undefined') {
    return next(new ResponseError({ statusCode: 401, message: 'client_id invalid' }))
  }
  
  const accessService = new AccessService(logger)
  accessService.checkAccess().then(result => {
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