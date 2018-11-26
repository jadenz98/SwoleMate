process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Accounts = require('./scripts/Accounts');

chai.use(chaiHttp);

describe('SwoleMate API endpoint testing', function () {
    this.timeout(50000);

    before((done) => {
        Accounts.create(20, "s@s", () => {
            done();
        });
    });

    after((done) => {
        Accounts.delete(20, "s@s", () => {
            done();
        });
    });

    it('Should delete a user account', (done) => {
        chai.request(server)
            .post('/user/delete')
            .send({ email: "s@s0" })
            .end((err, res) => {
                res.body.success.should.be.true;
                done();
            });
    });

    it('should not be able to log into a deleted account', (done) => {
        chai.request(server)
            .post('/user/login')
            .send({ email: "s@s0", password: "test" })
            .end((err, res) => {
                res.body.success.should.be.false;
                done();
            });
    });

    it('Should be able to recreate a deleted User', (done) => {
        Accounts.create(1, "s@s", () => {
            done();
        });
    });

    it('Should not be able to delete an account that is not in the DB', (done) => {
        chai.request(server)
            .post('/user/delete')
            .send({ email: "steven@steve.com" })
            .end((err, res) => {
                res.body.success.should.be.false;
                done();
            });
    });

    it('Should not be able to log in with wrong pass', (done) => {
        chai.request(server)
            .post('/user/login')
            .send({ email: "s@s0", password: "te" })
            .end((err, res) => {
                res.body.success.should.be.false;
                done();
            });
    });

    it('Should not be able to log in with wrong email', (done) => {
        chai.request(server)
            .post('/user/login')
            .send({ email: "boywonder@boy", password: "test" })
            .end((err, res) => {
                res.body.success.should.be.false;
                done();
            });
    });

    it('Should be able to log into a account with correct creds', (done) => {
        chai.request(server)
            .post('/user/login')
            .send({ email: "s@s0", password: "test" })
            .end((err, res) => {
                res.body.success.should.be.true;
                done();
            });
    });

    it('Should be able to edit my account', (done) => {
        chai.request(server)
            .post('/user/update')
            .set("email", "s@s0")
            .send({
                name: "Pizzaman",
                phone: "800",
                bio: "Come get me",
                birthday: "0/0/0",
                searchDistance: 69
            })
            .end((err, res) => {
                res.body.success.should.be.true;
                done();
            });
    });

    it('Should save my updated values', (done) => {
        chai.request(server)
            .get('/user')
            .set("email", "s@s0")
            .send()
            .end((err, res) => {
                res.body.name.should.equal("Pizzaman");
                res.body.bio.should.equal("Come get me");
                res.body.birthday.should.equal("0/0/0");
                res.body.phone.should.equal("800");
                res.body.searchDistance.should.equal(69);
                done();
            });
    });

    it('Should be able to update my location', (done) => {
        chai.request(server)
            .post('/user/updateLocation')
            .set("email", "s@s0")
            .send({ latitude: 69, longitude: 57 })
            .end((err, res) => {
                res.body.success.should.be.true;

                chai.request(server)
                    .get('/user')
                    .set({ email: "s@s0" })
                    .end((err, res) => {
                        res.body.location.coordinates[0].should.equal(57);
                        res.body.location.coordinates[1].should.equal(69);
                        done();
                    });
            });
    });

    it('Should not be able to update my location outside the world', (done) => {
        chai.request(server)
            .post('/user/updateLocation')
            .set("email", "s@s0")
            .send({ latitude: 180, longitude: 180 })
            .end((err, res) => {
                res.body.success.should.be.false;

                chai.request(server)
                    .get('/user')
                    .set({ email: "s@s0" })
                    .end((err, res) => {
                        res.body.location.coordinates[0].should.equal(57);
                        res.body.location.coordinates[1].should.equal(69);
                        done();
                    });
            });
    });

    it('Should be able to get 10 users from nearbyUsers', (done) => {
        chai.request(server)
            .get('/user/nearbyUsers')
            .set({ email: "s@s1" })
            .end((err, res) => {
                res.body.length.should.equal(10);
                done();
            });
    });

    it('Should return no matches if a user has not swiped', (done) => {
        chai.request(server)
            .get('/user/matches')
            .set({ email: "s@s0" })
            .end((err, res) => {
                res.body.length.should.equal(0);
                done();
            });
    });

    it('Should be able to swipe on someone that has not swiped on them', (done) => {
        chai.request(server)
            .post('/user/matches')
            .send({ email1: "s@s0", email2: "s@s1", swipe: "true" })
            .end((err, res) => {
                res.body.success.should.be.false;
                done();
            });
    });

    it('Should be able to swipe on someone who has swiped on them', (done) => {
        chai.request(server)
            .post('/user/matches')
            .send({ email1: "s@s1", email2: "s@s0", swipe: "true" })
            .end((err, res) => {
                res.body.success.should.be.true;
                done();
            });
    });

    it('Should start a conversation if a mutual match is made', (done) => {
        chai.request(server)
            .get('/user/matches')
            .set({ email: "s@s0" })
            .end((err, res) => {
                res.body.length.should.equal(1);

                chai.request(server)
                    .get('/user/matches')
                    .set({ email: "s@s1" })
                    .end((err, res) => {
                        res.body.length.should.equal(1);
                        done();
                    });
            });
    });

    it('Should be able to unmatch with someone', (done) => {
        chai.request(server)
            .post('/user/unmatch')
            .send({ email1: "s@s1", email2: "s@s0" })
            .end((err, res) => {
                res.body.success.should.be.true;

                chai.request(server)
                    .get('/user/matches')
                    .set({ email: "s@s1" })
                    .end((err, res) => {
                        res.body.length.should.equal(0);

                        chai.request(server)
                            .get('/user/matches')
                            .set({ email: "s@s0" })
                            .end((err, res) => {
                                res.body.length.should.equal(0);
                                done();
                            });
                    });
            });
    });

    it('Should match a user with all users', (done) => {
        const match = function match(num1, num2, callback) {
            if (num1 === num2) {
                callback();
            } else {
                console.log("Matching s@s" + num1 + " with s@s" + num2 + "...");

                chai.request(server)
                    .post('/user/matches')
                    .send({ email1: "s@s" + num1, email2: "s@s" + num2, swipe: "true" })
                    .end((err, res) => {
                        res.body.success.should.be.false;

                        chai.request(server)
                            .post('/user/matches')
                            .send({ email1: "s@s" + num2, email2: "s@s" + num1, swipe: "true" })
                            .end((err, res) => {
                                res.body.success.should.be.true;
                                match(num1 + 1, num2, done);
                            });
                    });
            }
        };

        // Recursively match all the users to s@s19
        match(0, 19, () => {
            // Check that s@s19 has all the matches
            chai.request(server)
                .get('/user/matches')
                .set({ email: "s@s19" })
                .end((err, res) => {
                    res.body.length.should.equal(19);
                    done();
                });
        });
    });

    it('Should be able to report other users', (done) => {
        let msg = "I really dont like this guy, REPORTED";

        chai.request(server)
            .post('/user/report')
            .send({ email: "s@s0", emailReported: "s@s15", reportMessage: msg })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;

                chai.request(server)
                    .get('/user/report')
                    .set({email: "s@s0"})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.length.should.equal(1);

                        done();
                    });
            });
    });
});