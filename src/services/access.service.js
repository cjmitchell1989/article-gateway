const {
  errors: {
    ResponseError
  }
} = require('../lib')

class AccessService {

  constructor(logger, database, maxAccesses) {
    this._logger = logger
    this._database = database
    this._maxAccesses = maxAccesses
  }

  get logger() {    
    return this._logger
  }

  get database() {
    return this._database
  }

  get maxAccesses() {
    return this._maxAccesses
  }

  async checkAccessLimit(clientId) {
    this.logger.info({ clientId })
    
    let accesses
    try {
      accesses = await this.incrementAccess(clientId)
    } catch (err) {
      this.logger(err)
      throw new ResponseError({ statusCode: 503, message: 'Issue calculating accesses' })
    }

    if (accesses > this.maxAccesses) {
      throw new ResponseError({ statusCode: 429, message: 'You have accessed too many articles' })
    }

    return { message: 'OK' }

  }

  incrementAccess(client_id) {
    return new Promise((resolve, reject) => {

      if (!this.database) {
        reject(new Error('Database not set'))
      }

      // Redis database increment
      this.database.incr(client_id, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }

}

module.exports = AccessService