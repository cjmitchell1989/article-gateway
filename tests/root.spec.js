const {
  database: {
    path: DATABASE_PATH,
    port: DATABASE_PORT
  }
} = require('../src/config')

const chai = require('chai')
const chaiHttp = require('chai-http')

const redis = require('redis')
let redisClient

chai.use(chaiHttp)
const expect = chai.expect

const server = require('../src')

describe('Test root route and setup of express', () => {

  before((done) => {
    redisClient = redis.createClient({ host: DATABASE_PATH, port: DATABASE_PORT })
    redisClient.on('ready', () => {
      redisClient.flushdb((err, res) => {
        done()
      })
    })
  })

  after((done) => {
    redisClient.flushdb((err, res) => {
      done()
    })
  })

  it('should return unauthorized with no client_id query param set', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(401)
        done()
      })
  })

  it('should return unauthorized with no client_id passed', (done) => {
    chai.request(server)
      .get('/?client_id=')
      .end((err, res) => {
        expect(res).to.have.status(401)
        done()
      })
  })

  it('should return an error for bad route', (done) => {
    chai.request(server)
      .get('/test')
      .end((err, res) => {
        expect(res).to.have.status(404)
        done()
      })
  })

  it('should return successfully', (done) => {
    chai.request(server)
      .get('/?client_id=xxx')
      .end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
  })
})

describe('Test multiple accesses block access', () => {

  before((done) => {
    redisClient = redis.createClient({ host: DATABASE_PATH, port: DATABASE_PORT })
    redisClient.on('ready', () => {
      redisClient.flushdb((err, res) => {
        redisClient.incrby('test', 500, (err, res) => {
          done()
        })
      })
    })
  })

  after((done) => {
    redisClient.flushdb((err, res) => {
      done()
    })
  })

  it('should return 429 limit reached', (done) => {

    chai.request(server)
      .get('/?client_id=test')
      .end((err, res) => {
        expect(res).to.have.status(429)
        done()
      })
  })
})