process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('SwoleMate API endpoint testing', () => {
    it('Should handle a get request', (done) => {
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

    it('Should be able to delete a user', (done) => {
        const newUser = {
            name: 'mocha-test',
            password: 'test',
            email: 'test@test.com',
            birthday: '01/01/01',
            phone: '1234567890',
            bio: 'test bio!'
        };

        // Create a new test user to delete
        chai.request(server)
            .post('/user/register')
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
                // done();
                // Delete the user
                chai.request(server)
                    .post('/user/delete')
                    .send({email: newUser.email})
                    .end((err, res) => {
                        res.body.should.be.an('object');
                        res.body.success.should.be.true;

                        done();
                    });
            });
    });
});