process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Accounts = require('./scripts/Accounts');

chai.use(chaiHttp);

describe('SwoleMate API endpoint testing', function() {
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

    it('Should be able to get user information', (done) => {
        chai.request(server)
            .get('/user')
            .set("email", "s@s0")
            .send()
            .end((err, res) => {
                res.body.should.deep.equal({
                    name: "s@s0",
                    email: "s@s0",
                    birthday: "12/17/1500",
                    phone: "1234567890",
                    bio: "test bio!",
                    searchDistance: 100,
                    location: {
                        type: "Point",
                        coordinates: [
                            -86.9132166,
                            40.4244238
                        ]
                    },
                    interests: ["swimming"],
                    isGhost: false,
                    photoData: "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",
                    photoHeight: 60.75,
                    photoWidth: 34166666666666664.,
                    milestones: [
                        "I did something pretty cool",
                        "this is my Milestone"
                    ],
                    goal: "GOAL!!!"
                });

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

    it('Should be able to send a message to a conversation', (done) => {
        chai.request(server)
            .post('/user/conversation')
            .send({
                sender: "s@s0",
                re: "s@s1",
                msg: "hi!"
            })
            .end((err, res) => {
                res.body.success.should.be.true;

                chai.request(server)
                    .get('/user/conversation')
                    .set({
                        email1: "s@s0",
                        email2: "s@s1"
                    })
                    .end((err, res) => {
                        res.body.should.deep.equal([{ email: 's@s0', msg: 'hi!', _id: 0 }]);

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
                                match(num1 + 1, num2, callback);
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
                    .set({ email: "s@s0" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.length.should.equal(1);

                        done();
                    });
            });
    });

    it('Should be able to change my password', (done) => {
        chai.request(server)
            .get('/user')
            .set({ email: "s@s0" })
            .end((err, res) => {
                res.should.have.status(200);


                chai.request(server)
                    .post('/user/passwordChange')
                    .send({ email: "s@s0", password: "123" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.success.should.be.true;

                        chai.request(server)
                            .post('/user/login')
                            .send({ email: "s@s0", password: "123" })
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.success.should.be.true;

                                done();
                            });
                    });
            });
    });

    it('Should not be able to change my password to an empty password', (done) => {
        chai.request(server)
            .get('/user')
            .set({ email: "s@s0" })
            .end((err, res) => {
                res.should.have.status(200);
                chai.request(server)
                    .post('/user/passwordChange')
                    .send({ email: "s@s0", password: "" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        // res.body.success.should.be.true;
                        chai.request(server)
                            .post('/user/login')
                            .send({ email: "s@s0", password: "123" })
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.success.should.be.false;
                                done();
                            });
                    });
            });
    });

    it('Should be able to set Calendar Events', (done) => {
        let event = {
            date: "2018-23-12",
            time: "12:30",
            endtime: "1:30"
        }
        chai.request(server)
            .post('/user/calendar')
            .send({ email: "s@s0", event: event })
            .end((err, res) => {
                res.should.have.status(200);

                chai.request(server)
                    .get('/user/calendar')
                    .set({ email: "s@s0" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.length.should.equal(1);
                        done();
                    });
            });
    });

    it('Should be able to set multiple Calendar Events', (done) => {
        let event1 = {
            date: "2012-23-12",
            time: "12:30",
            endtime: "1:30"
        }
        let event2 = {
            date: "2019-23-1",
            time: "12:30",
            endtime: "1:30"
        }
        let event3 = {
            date: "2018-23-6",
            time: "12:30",
            endtime: "1:30"
        }
        let event4 = {
            date: "2017-23-3",
            time: "12:30",
            endtime: "1:30"
        }
        chai.request(server)
            .post('/user/calendar')
            .send({ email: "s@s0", event: event1 })
            .end((err, res) => {
                res.should.have.status(200);

                chai.request(server)
                    .post('/user/calendar')
                    .send({ email: "s@s0", event: event2 })
                    .end((err, res) => {
                        res.should.have.status(200);

                        chai.request(server)
                            .post('/user/calendar')
                            .send({ email: "s@s0", event: event3 })
                            .end((err, res) => {
                                res.should.have.status(200);

                                chai.request(server)
                                    .post('/user/calendar')
                                    .send({ email: "s@s0", event: event4 })
                                    .end((err, res) => {
                                        res.should.have.status(200);

                                        chai.request(server)
                                            .get('/user/calendar')
                                            .set({ email: "s@s0" })
                                            .end((err, res) => {
                                                res.should.have.status(200);
                                                res.body.length.should.equal(5);
                                                done();
                                            });
                                    });
                            });
                    });
            });
    });

    it('Should be able to hide personal info', (done) => {
        chai.request(server)
            .post('/user/update')
            .set({ email: "s@s0" })
            .send({ hideinfo: true })
            .end((err, res) => {
                res.should.have.status(200);

                chai.request(server)
                    .get('/user')
                    .set({ email: "s@s0" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.hideinfo.should.be.true;
                        done();
                    });
            });
    });

    it('Should be able to reveal personal info', (done) => {
        chai.request(server)
            .post('/user/update')
            .set({ email: "s@s0" })
            .send({ hideinfo: false })
            .end((err, res) => {
                res.should.have.status(200);

                chai.request(server)
                    .get('/user')
                    .set({ email: "s@s0" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.hideinfo.should.be.false;
                        done();
                    });
            });
    });

    it('Should be able to reveal personal info', (done) => {
        chai.request(server)
            .post('/user/update')
            .set({ email: "s@s0" })
            .send({ hideinfo: false })
            .end((err, res) => {
                res.should.have.status(200);

                chai.request(server)
                    .get('/user')
                    .set({ email: "s@s0" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.hideinfo.should.be.false;
                        done();
                    });
            });
    });

    it('Should be able too share users, this should be reflected on the DB', (done) => {
        chai.request(server)
            .post('/user/conversation')
            .send({ sender: "s@s9", re: "s@s19", msg: "#link[t@t18:@t@t18]" })
            .end((err, res) => { //#link[t@t18:@t@t18]
                res.should.have.status(200);
                res.body.success.should.be.true;
                // done();
                chai.request(server)
                    .get('/user/conversation')
                    .set({ email1: "s@s9", email2: "s@s19" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.length.should.equal(1);
                        res.body[0].msg.should.equal("#link[t@t18:@t@t18]");
                        done();
                    });
            });
    });

    it('Should be able too share users, this should be reflected on the DB EDGE THE BEGE CASE', (done) => {
        chai.request(server)
            .post('/user/conversation')
            .send({ sender: "s@s9", re: "s@s19", msg: "#NOLINK[t@t18:@t@t18]" })
            .end((err, res) => { //#link[t@t18:@t@t18]
                res.should.have.status(200);
                res.body.success.should.be.true;
                console.log("EAFEWFAEW");
                chai.request(server)
                    .get('/user/conversation')
                    .set({ email1: "s@s9", email2: "s@s19" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.length.should.equal(2);
                        res.body[1].msg.should.equal("#NOLINK[t@t18:@t@t18]");
                        done();
                    });
            });
    });

    it('As a user I want to set goals', (done) => {
        chai.request(server)
            .post('/user/update')
            .set({ email: "s@s1" })
            .send({ goal: "THISISAGOAL" })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;

                chai.request(server)
                    .get('/user')
                    .set({ email: "s@s1" })
                    .end((err, res) => {
                        res.should.have.status(200);

                        res.body.goal.should.equal("THISISAGOAL");
                        // res.body[0].msg.should.equal("#NOLINK[t@t18:@t@t18]");
                        done();
                    });
            });
    });

    it('As a user I want to set goals EDGE THE BEGE', (done) => {
        chai.request(server)
            .post('/user/update')
            .set({ email: "s@s1" })
            .send({ goal: "" })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;

                chai.request(server)
                    .get('/user')
                    .set({ email: "s@s1" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.goal.should.equal("");
                        // res.body[0].msg.should.equal("#NOLINK[t@t18:@t@t18]");
                        done();
                    });
            });
    });

    it('As a user I want to set my fav gym location', (done) => {
        chai.request(server)
            .post('/user/update')
            .set({ email: "s@s1" })
            .send({ favgym: "Co Rec, North Martin Jischke Drive, West Lafayette, IN, USA" })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;

                chai.request(server)
                    .get('/user')
                    .set({ email: "s@s1" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.favgym.should.equal("Co Rec, North Martin Jischke Drive, West Lafayette, IN, USA");
                        // res.body[0].msg.should.equal("#NOLINK[t@t18:@t@t18]");
                        done();
                    });
            });
    });

    it('As a user I want to set my fav gym location EDGE THE BEGE', (done) => {
        chai.request(server)
            .post('/user/update')
            .set({ email: "s@s1" })
            .send({ favgym: "" })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;

                chai.request(server)
                    .get('/user')
                    .set({ email: "s@s1" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.favgym.should.equal("");
                        // res.body[0].msg.should.equal("#NOLINK[t@t18:@t@t18]");
                        done();
                    });
            });
    });
});



/* db.Conversations.update({"email1": "t@t3", "email2":"t@t19"}, {$set: {"conversation": []}}) */