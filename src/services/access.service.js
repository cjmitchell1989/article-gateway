class AccessService {

  constructor(logger) {
    this._logger = logger
  }

  async checkAccessLimit(clientId) {
    this._logger.info({ clientId })
    return { message: 'OK' }
  }

}

module.exports = AccessService