const checkAccessLimit = (req, res, next) => {
  const logger = req.app.get('logger')
  logger.info('test')

  res.status(200).send({ message: 'OK' })
  return next()
}

module.exports = {
  checkAccessLimit
}