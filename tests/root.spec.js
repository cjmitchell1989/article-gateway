const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)
const expect = chai.expect

const server = require('../src')

describe('Test initial route and setup of express', () => {
  it('should return successfully', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
  })
})