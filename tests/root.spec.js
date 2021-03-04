const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)
const expect = chai.expect

const server = require('../src')

describe('Test initial route and setup of express', () => {
  it('should return unauthrized with no client_id passed', (done) => {
    chai.request(server)
      .get('/?client_id=')
      .end((err, res) => {
        expect(res).to.have.status(401)
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

  it('should return an error for bad route', (done) => {
    chai.request(server)
      .get('/test')
      .end((err, res) => {
        expect(res).to.have.status(404)
        done()
      })
  })
})