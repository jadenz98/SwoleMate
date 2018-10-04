const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('SwoleMate API endpoint testing', (done) => {
    // Before each test, execute this code
    beforeEach((done) => {
        done();
    });

    it('Should handle a get request', () => {
        chai.request(server)
            .get('/hello')
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.an('object');
               res.body.should.deep.equal({
                   message: "hello world!",
                   arbitraryData: "123456",
                   whatever: "blah"
               });

               done();
            });
    });
});