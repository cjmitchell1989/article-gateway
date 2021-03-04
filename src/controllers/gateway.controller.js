const {
  Access: AccessService
} = require('../services')

const checkAccessLimit = (req, res, next) => {
  const logger = req.app.get('logger')
  
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