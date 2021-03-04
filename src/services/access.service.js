class AccessService {

  constructor(logger) {
    this._logger = logger
  }

  async checkAccess() {
    this._logger.info('Checking access')
    return { message: 'OK' }
  }

}

module.exports = AccessService