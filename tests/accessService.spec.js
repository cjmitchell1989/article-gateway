const chai = require('chai')
const expect = chai.expect

const AccessService = require('../src/services/access.service')

describe('Access Service test', () => {

  it('should fail to run an increment method with no database set', (done) => {
    const mockLogger = {
      info(input) {
        return input
      }
    }

    const clientId = 1
    const accessService = new AccessService(mockLogger, null, 5)
    accessService.incrementAccess(clientId).catch(err => {
      done()
    })

  })

  it('should run an increment method on a database reference', (done) => {
    const mockLogger = {
      info(input) {
        return input
      }
    }
    const mockDatabase = {
      incr(clientId, cb) {
        cb(null, 1)
      }
    }
    const clientId = 1

    const accessService = new AccessService(mockLogger, mockDatabase, 5)
    accessService.incrementAccess(clientId).then(result => {
      expect(result).to.equal(1)
      done()
    })

  })

  it('should run an increment method on a database reference and throw an error due to database error returned', (done) => {
    const mockLogger = {
      info(input) {
        return input
      }
    }
    // Return an error
    const mockDatabase = {
      incr(clientId, cb) {
        cb('test', 1)
      }
    }
    const clientId = 1

    const accessService = new AccessService(mockLogger, mockDatabase, 5)
    accessService.incrementAccess(clientId).catch(err => {
      done()
    })

  })



  it('should check the access limit and return ok', (done) => {
    const mockLogger = {
      info(input) {
        return input
      }
    }
    // Return 1 (below access limit)
    const mockDatabase = {
      incr(clientId, cb) {
        cb(null, 1)
      }
    }
    const clientId = 1

    const accessService = new AccessService(mockLogger, mockDatabase, 5)
    accessService.checkAccessLimit(clientId).then(result => {
      done()
    })

  })

  it('should check the access limit and return error', (done) => {
    const mockLogger = {
      info(input) {
        return input
      }
    }
    // Return 5 (above access limit)
    const mockDatabase = {
      incr(clientId, cb) {
        cb(null, 5)
      }
    }
    const clientId = 1

    const accessService = new AccessService(mockLogger, mockDatabase, 4)
    accessService.checkAccessLimit(clientId).catch(err => {
      done()
    })

  })
})