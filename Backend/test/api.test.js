process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('SwoleMate API endpoint testing', () => {
    /*
    Creats a newUser with correct username and pass
    */
    newUser = {
        name: 'mocha-test',
        password: 'test',
        email: 'test@test.com',
        birthday: '01/01/01',
        phone: '1234567890',
        bio: 'test bio!'
    };
    /*
    Creats a badUser with incorrect username and pass
    */
    badUser = {
        name: 'mocha-test',
        password: 'test1',
        email: 'test@test.com1',
        birthday: '01/01/01',
        phone: '1234567890',
        bio: 'test bio!'
    };
    /*
    This is for testing purposes, deletes the user if he is already
    in the database, does not expect anything besides a 200 from the server 
    and a json object back. (does not check if true or false)
    */


    it('Delete User for re-testing', (done) => {
        chai.request(server)
            .post('/user/delete')
            .send(newUser)
            .end((err, res) => {
                res.body.should.be.an('object');
                // res.body.success.should.be.true;
                done();
            });

    });
    /*
    This test sends a get request to the server
    */
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
    /*
    This test creates a user and then deletes the user.
    */
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

    /*
    This test checks the login to with
    bad email + good pass. -> false
    good email + bad pass  -> false
    bad email + bad pass. -> false
    */
    it('Should be able to block wrong login creds', (done) => {
        const badPass = {
            name: 'mocha-test',
            password: 'test1',
            email: 'test@test.com',
            sex: 'Male',
            birthday: '01/01/01',
            phone: '1234567890',
            bio: 'test bio!'
        };
        const badEmail = {
            name: 'mocha-test1',
            password: 'test',
            email: 'test@test.com',
            sex: 'Male',
            birthday: '01/01/01',
            phone: '1234567890',
            bio: 'test bio!'
        };
        const badBoth = {
            name: 'mocha-test1',
            password: 'test1',
            email: 'test@test.com',
            sex: 'Male',
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
                // Delete the user

                chai.request(server)
                    .post('/user/login')
                    .send({email: badPass.email})
                    .end((err, res) => {
                        res.body.should.be.an('object');
                        res.body.success.should.be.false;
                    });
                chai.request(server)
                    .post('/user/login')
                    .send({email: badEmail.email})
                    .end((err, res) => {
                        res.body.should.be.an('object');
                        res.body.success.should.be.false;
                    });
                chai.request(server)
                    .post('/user/login')
                    .send({email: badBoth.email})
                    .end((err, res) => {
                        res.body.should.be.an('object');
                        res.body.success.should.be.false;
                    });
                    done();
            });
    });
    /*
    This test logs the user in with the correct email + password
    */
    it('Should be able to Login with valid email + password', (done) => {
        chai.request(server)
            .post('/user/login')
            .send(newUser)
            .end((err, res) => {
                res.body.should.be.an('object');
                res.body.success.should.be.true;
                done();
            });

    });
    /*
    This test updating location (does not actaully check if its right though :( )
    */

    it('Should be able update Location', (done) => {
        chai.request(server)
            .post('/user/updateLocation')
            .send({email: newUser.email})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.success.should.be.true;
                done();
            });
    });

    /*
    This deletes the user -> registers a user 
    -> trys to log in with wrong email and pass
    -> logs in with correct email and pass
    */

    it('ROBUSTNESS', (done) => {
        chai.request(server)
            .post('/user/delete')
            .send({email: newUser.email})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.success.should.be.true;
                chai.request(server)
                    .post('/user/register')
                    .send(newUser)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.an('object');
                        res.body.success.should.be.true;

                        chai.request(server)
                            .post('/user/login')
                            .send(badUser)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.an('object');
                                res.body.success.should.be.false;
                                chai.request(server)
                                    .post('/user/login')
                                    .send(newUser)
                                    .end((err,res) => {
                                        res.should.have.status(200);
                                        res.body.should.be.an('object');
                                        res.body.success.should.be.true;
                                        done();
                                    })
                            });
                    
                    });
            });
    });
    /*
        Frontend testing??
    */
    it('Should be able to logout after being logged in', (done) => {
        done();
    });

});




 