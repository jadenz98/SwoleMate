process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('SwoleMate API endpoint testing', () => {
    let use = [];
    /*
    This is for testing purposes, deletes the user if he is already
    in the database, does not expect anything besides a 200 from the server 
    and a json object back. (does not check if true or false)
    */

    it('DROP IT', (done) => {
        // const x = use[0];
        // console.log(x);
        chai.request(server)
            .post('/user/deleteEverything')
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
                done();
            });
    });

    it('Create users!', (done) => {
        
        // console.log(newUser)
        let lat = -39.54477844832991;

        for (var i = 0; i < 41; i++) {
            lat += .00001;
            // console.log(lat);
            use[i] = {
                name: "s@s" + i,
                password: "test",
                email: "s@s" + i,
                birthday: "01/01/01",
                phone: "1234567890",
                bio: "test bio!",
                searchDistance: 100,
                location: {
                    type: "Point",
                    coordinates: [
                        lat,
                        41.34554235595858
                    ]
                },
                interests: ["swimming"],
                isGhost: false
            };
    //         // console.log(use);
 
        }
        
        var x = use[0];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
                // done();
            });
        x = use[1];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[2];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[3];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[4];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[5];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[6];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[7];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[8];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[9];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[10];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[11];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[12];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[13];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[14];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[15];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[16];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[17];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[18];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[19];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[20];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[21];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[22];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[23];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[24];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[25];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[26];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[27];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[28];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[29];
        // console.log(x);
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[30];
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[31];
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;

            });
        x = use[32];
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;

            });
        x = use[33];
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;

            });
        x = use[34];
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;

            });
        x = use[35];
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;

            });
        x = use[36];
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;

            });
        x = use[37];
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;

            });
        x = use[38];
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;

            });
        x = use[39];
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
            });
        x = use[40];
        chai.request(server)
            .post('/user/register')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
                done();
            });
    });



    it('As a user i wanna delete my account', (done) => {
        let x = use[40].email;
        // console.log(use[40].email);
        // console.log("EWAFAEWFEAW");
        chai.request(server)
            .post('/user/delete')
            .send({email: x})
            .end((err, res) => {
                res.body.success.should.be.true;
                done();
            });
    });

    it('Should be able to recreate a delete Users', (done) => {
        chai.request(server)
            .post('/user/register')
            .send(use[40])
            .end((err, res) => {
                res.body.success.should.be.true;
                done();
            });
    });

    it('Should not be able to delete an account that is not in the DB', (done) => {
        chai.request(server)
            .post('/user/delete')
            .send({email: "steven@steve.com"})
            .end((err, res) => {
                res.body.success.should.be.false;
                done();
            });
    });


    it('Should not be able to log in with wrong pass', (done) => {
        let x = use[40];
        chai.request(server)
            .post('/user/login')
            .send({email: x.email, password:"te"})
            .end((err, res) => {
                res.body.success.should.be.false;
                done();
            });
    });
    it('Should not be able to log in with wrong email', (done) => {
        let x = use[40];
        chai.request(server)
            .post('/user/login')
            .send({email: "boywonder@boy", password:x.password})
            .end((err, res) => {
                res.body.success.should.be.false;
                done();
            });
    });
    it('should be able to log into a account with correct creds', (done) => {
        let x = use[40];
        chai.request(server)
            .post('/user/login')
            .send({email: x.email, password:x.password})
            .end((err, res) => {
                res.body.success.should.be.true;
                done();
            });
    });


    it('should be able to edit my account', (done) => {
        let x = use[40];
        chai.request(server)
            .post('/user/update')
            .set("email", x.email)
            .send({name: "Pizzaman", phone:"800"})
            .end((err, res) => {
                res.body.success.should.be.true;
                done();
            });
    });
    it('should be able to edit my account', (done) => {
        let x = use[40];
        chai.request(server)
            .post('/user/update')
            .set("email", x.email)
            .send({bio: "Come get me", birthday:"0/0/0"})
            .end((err, res) => {
                res.body.success.should.be.true;
                done();
            });
    });
    it('should be able to edit my account', (done) => {
        let x = use[40];
        chai.request(server)
            .post('/user/update')
            .set("email", x.email)
            .send({searchDistance: 69})
            .end((err, res) => {
                res.body.success.should.be.true;
                done();
            });
    });
    it('check to see if everything is updated', (done) => {
        let x = use[40];
        // console.log(x);
        chai.request(server)
            .post('/user')
            .set("email", x.email)
            .send()
            .end((err, res) => {
                // console.log(res.body);
                res.body.name.should.equal("Pizzaman");
                res.body.bio.should.equal("Come get me");
                res.body.birthday.should.equal("0/0/0");
                res.body.phone.should.equal("800");
                res.body.searchDistance.should.equal(69);
                done();
            });
    });


    it('should be able to delete an account at this point', (done) => {
        let x = use[40];
        chai.request(server)
            .post('/user/delete')
            .send({email: x.email})
            .end((err, res) => {
                res.body.success.should.be.true;
                done();
            });
    });
    it('should not be able to log into a deleted account', (done) => {
        let x = use[40];
        chai.request(server)
            .post('/user/login')
            .send({email: x.email, password:x.password})
            .end((err, res) => {
                res.body.success.should.be.false;
                done();
            });
    });






    it('should be able to update my location', (done) => {
        use[39] = {
            name: "s@s39",
            password: "test",
            email: "s@s39",
            birthday: "01/01/01",
            phone: "1234567890",
            bio: "test bio!",
            searchDistance: 100,
            location: {
                type: "Point",
                coordinates: [
                    69,
                    57
                ]
            },
            interests: ["swimming"],
            isGhost: false
        };
        let x = use[39];
        chai.request(server)
            .post('/user/updateLocation')
            .set("email", x.email)
            .send({latitude: 69, longitude:57})
            .end((err, res) => {
                res.body.success.should.be.true;
                done();
            });
    });
    it('should check to make sure location is updated', (done) => {
        let x = use[39];
        chai.request(server)
            .post('/user')
            .set({email:x.email})
            .end((err, res) => {
                res.body.location.coordinates[0].should.equal(57);
                res.body.location.coordinates[1].should.equal(69);
                done();
            });
    });

    it('should not be able to update my location outside the world', (done) => {
        use[39] = {
            name: "s@s39",
            password: "test",
            email: "s@s39",
            birthday: "01/01/01",
            phone: "1234567890",
            bio: "test bio!",
            searchDistance: 100,
            location: {
                type: "Point",
                coordinates: [
                    180,
                    180
                ]
            },
            interests: ["swimming"],
            isGhost: false
        };
        let x = use[39];
        chai.request(server)
            .post('/user/updateLocation')
            .set("email", x.email)
            .send({latitude: 180, longitude:180})
            .end((err, res) => {
                res.body.success.should.be.false;
                done();
            });
    });
    it('should check to make sure location is updated', (done) => {
        let x = use[39];
        chai.request(server)
            .post('/user')
            .set({email:x.email})
            .end((err, res) => {
                res.body.location.coordinates[0].should.equal(57);
                res.body.location.coordinates[1].should.equal(69);
                done();
            });
    });
    it('should be able to get 10 users from nearbyUsers', (done) => {
        let x = use[14];
        chai.request(server)
            .get('/user/nearbyUsers')
            .set({email:x.email})
            .end((err, res) => {
                res.body.length.should.equal(10);
                done();
            });
    });
    it('should be able to get 10 users from nearbyUsers on a differnt user', (done) => {
        let x = use[0];
        chai.request(server)
            .get('/user/nearbyUsers')
            .set({email:x.email})
            .end((err, res) => {
                res.body.length.should.equal(10);
                done();
            });
    });

    it('a user should have no users if he has not swiped', (done) => {
        let x = use[0];
        chai.request(server)
            .get('/user/matches')
            .set({email:x.email})
            .end((err, res) => {
                res.body.length.should.equal(0);
                done();
            });
    });


    it('a user be able to swipe on someone that the person hasnt swiped on them', (done) => {
        let x = use[0];
        let y = use[1];
        let s = "true";
        chai.request(server)
            .post('/user/matches')
            .send({email1:x.email, email2: y.email, swipe:s})
            .end((err, res) => {
                res.body.success.should.be.false
                done();
            });
    });

    it('a user be able to swipe on someone that the other person has swiped on', (done) => {
        let y = use[0];
        let x = use[1];
        let s = "true";
        chai.request(server)
            .post('/user/matches')
            .send({email1:x.email, email2: y.email, swipe:s})
            .end((err, res) => {
                res.body.success.should.be.true
                done();
            });
    });
    it('If both people swiped on eachother, start a conversation', (done) => {
        let x = use[0];
        chai.request(server)
            .get('/user/matches')
            .set({email:x.email})
            .end((err, res) => {
                res.body.length.should.equal(1);
                done();
            });
    });
    it('If both people swiped on eachother, start a conversation', (done) => {
        let x = use[1];
        chai.request(server)
            .get('/user/matches')
            .set({email:x.email})
            .end((err, res) => {
                res.body.length.should.equal(1);
                done();
            });
    });
//     /*
//     This test checks the login to with
//     bad email + good pass. -> false
//     good email + bad pass  -> false
//     bad email + bad pass. -> false
//     */
//     it('Should be able to block wrong login creds', (done) => {
//         const badPass = {
//             name: 'mocha-test',
//             password: 'test1',
//             email: 'test@test.com',
//             sex: 'Male',
//             birthday: '01/01/01',
//             phone: '1234567890',
//             bio: 'test bio!'
//         };
//         const badEmail = {
//             name: 'mocha-test1',
//             password: 'test',
//             email: 'test@test.com',
//             sex: 'Male',
//             birthday: '01/01/01',
//             phone: '1234567890',
//             bio: 'test bio!'
//         };
//         const badBoth = {
//             name: 'mocha-test1',
//             password: 'test1',
//             email: 'test@test.com',
//             sex: 'Male',
//             birthday: '01/01/01',
//             phone: '1234567890',
//             bio: 'test bio!'
//         };

//         // Create a new test user to delete
//         chai.request(server)
//             .post('/user/register')
//             .send(newUser)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.success.should.be.true;
//                 // Delete the user

//                 chai.request(server)
//                     .post('/user/login')
//                     .send({email: badPass.email})
//                     .end((err, res) => {
//                         res.body.should.be.an('object');
//                         res.body.success.should.be.false;
//                     });
//                 chai.request(server)
//                     .post('/user/login')
//                     .send({email: badEmail.email})
//                     .end((err, res) => {
//                         res.body.should.be.an('object');
//                         res.body.success.should.be.false;
//                     });
//                 chai.request(server)
//                     .post('/user/login')
//                     .send({email: badBoth.email})
//                     .end((err, res) => {
//                         res.body.should.be.an('object');
//                         res.body.success.should.be.false;
//                     });
//                     done();
//             });
//     });
//     /*
//     This test logs the user in with the correct email + password
//     */
//     it('Should be able to Login with valid email + password', (done) => {
//         chai.request(server)
//             .post('/user/login')
//             .send(newUser)
//             .end((err, res) => {
//                 res.body.should.be.an('object');
//                 res.body.success.should.be.true;
//                 done();
//             });
//     });

//     /*
//     This test updating location (does not actaully check if its right though :( )
//     */
//     it('Should be able update Location', (done) => {
//         chai.request(server)
//             .post('/user/updateLocation')
//             .send({email: newUser.email})
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.an('object');
//                 res.body.success.should.be.true;
//                 done();
//             });
//     });

//     /*
//     This deletes the user -> registers a user 
//     -> trys to log in with wrong email and pass
//     -> logs in with correct email and pass
//     */

//     it('ROBUSTNESS', (done) => {
//         chai.request(server)
//             .post('/user/delete')
//             .send({email: newUser.email})
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.an('object');
//                 res.body.success.should.be.true;
//                 chai.request(server)
//                     .post('/user/register')
//                     .send(newUser)
//                     .end((err, res) => {
//                         res.should.have.status(200);
//                         res.body.should.be.an('object');
//                         res.body.success.should.be.true;

//                         chai.request(server)
//                             .post('/user/login')
//                             .send(badUser)
//                             .end((err, res) => {
//                                 res.should.have.status(200);
//                                 res.body.should.be.an('object');
//                                 res.body.success.should.be.false;
//                                 chai.request(server)
//                                     .post('/user/login')
//                                     .send(newUser)
//                                     .end((err,res) => {
//                                         res.should.have.status(200);
//                                         res.body.should.be.an('object');
//                                         res.body.success.should.be.true;
//                                         done();
//                                     })
//                             });
                    
//                     });
//             });
//     });
//     s1 = {
//         name: 's@s1',
//         password: 'test',
//         email: 's@s1',
//         birthday: '01/01/01',
//         phone: '1234567890',
//         bio: 'test bio!'
//     };
//     s2 = {
//         name: 's@s2',
//         password: 'test',
//         email: 's@s2',
//         birthday: '01/01/01',
//         phone: '1234567890',
//         bio: 'test bio!'
//     };
//     s3 = {
//         name: 's@s3',
//         password: 'test',
//         email: 's@s3',
//         birthday: '01/01/01',
//         phone: '1234567890',
//         bio: 'test bio!'
//     };
//     s4 = {
//         name: 's@s4',
//         password: 'test',
//         email: 's@s4',
//         birthday: '01/01/01',
//         phone: '1234567890',
//         bio: 'test bio!'
//     };
//     s5 = {
//         name: 's@s5',
//         password: 'test',
//         email: 's@s5',
//         birthday: '01/01/01',
//         phone: '1234567890',
//         bio: 'test bio!'
//     };
//     s6 = {
//         name: 's@s6',
//         password: 'test',
//         email: 's@s6',
//         birthday: '01/01/01',
//         phone: '1234567890',
//         bio: 'test bio!'
//     };

//     it('Create a bunch of users', (done) => {

//         //Creates 6 useres to test matching
//         chai.request(server)
//             .post('/user/register')
//             .send(s1)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.an('object');
//                 chai.request(server)
//                     .post('/user/register')
//                     .send(s2)
//                     .end((err, res) => {
//                         res.should.have.status(200);
//                         res.body.should.be.an('object');
//                         // res.body.success.should.be.true;
//                         chai.request(server)
//                             .post('/user/register')
//                             .send(s3)
//                             .end((err, res) => {
//                                 // res.should.have.status(200);
//                                 // res.body.should.be.an('object');
//                                 // res.body.success.should.be.true;
//                                  chai.request(server)
//                                     .post('/user/register')
//                                     .send(s4)
//                                     .end((err, res) => {
//                                         // res.should.have.status(200);
//                                         // res.body.should.be.an('object');
//                                         // res.body.success.should.be.true;
//                                         chai.request(server)
//                                             .post('/user/register')
//                                             .send(s5)
//                                             .end((err, res) => {
//                                                 // res.should.have.status(200);
//                                                 // res.body.should.be.an('object');
//                                                 // res.body.success.should.be.true;
//                                                 chai.request(server)
//                                                     .post('/user/register')
//                                                     .send(s6)
//                                                     .end((err, res) => {
//                                                         done();
//                                                     });
//                                             });
//                                     });
//                             });
//                     });
//             });
//     });
//     /*
//         Frontend testing??
//     // */
//     it('Users Swipe!', (done) => {
//         chai.request(server)
//             .post('/user/matches')
//             .send({email1: s1.email, email2: s2.email, swipe:"true"})
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.an('object');
//                 // res.body.success.should.be.false;

//                 chai.request(server)
//                     .post('/user/matches')
//                     .send({email1: s1.email, email2: s4.email, swipe:"false"})
//                     .end((err, res) => {
//                         res.should.have.status(200);
//                         res.body.should.be.an('object');
//                         // res.body.success.should.be.false;

//                         chai.request(server)
//                             .post('/user/matches')
//                             .send({email1: s1.email, email2: s3.email, swipe:"true"})
//                             .end((err, res) => {
//                                 res.should.have.status(200);
//                                 res.body.should.be.an('object');
//                                 // res.body.success.should.be.false;

//                                 chai.request(server)
//                                     .post('/user/matches')
//                                     .send({email1: s3.email, email2: s2.email, swipe:"true"})
//                                     .end((err, res) => {
//                                         res.should.have.status(200);
//                                         res.body.should.be.an('object');
//                                         // res.body.success.should.be.false;

//                                         chai.request(server)
//                                             .post('/user/matches')
//                                             .send({email1: s2.email, email2: s1.email, swipe:"true"})
//                                             .end((err, res) => {
//                                                 res.should.have.status(200);
//                                                 res.body.should.be.an('object');
//                                                 // res.body.success.should.be.true;

//                                                 chai.request(server)
//                                                     .post('/user/matches')
//                                                     .send({email1: s4.email, email2: s1.email, swipe:"false"})
//                                                     .end((err, res) => {
//                                                         res.should.have.status(200);
//                                                         res.body.should.be.an('object');
//                                                         // res.body.success.should.be.false;

//                                                         chai.request(server)
//                                                             .post('/user/matches')
//                                                             .send({email1: s3.email, email2: s1.email, swipe:"true"})
//                                                             .end((err, res) => {
//                                                                 res.should.have.status(200);
//                                                                 res.body.should.be.an('object');
//                                                                 // res.body.success.should.be.true;
//                                                                 //////
//                                                                 chai.request(server)
//                                                                     .post('/user/matches')
//                                                                     .send({email1: s6.email, email2: s5.email, swipe:"true"})
//                                                                     .end((err, res) => {
//                                                                         res.should.have.status(200);
//                                                                         res.body.should.be.an('object');
//                                                                         // res.body.success.should.be.false;
//                                                                         chai.request(server)
//                                                                             .post('/user/matches')
//                                                                             .send({email1: s5.email, email2: s4.email, swipe:"true"})
//                                                                             .end((err, res) => {
//                                                                                 res.should.have.status(200);
//                                                                                 res.body.should.be.an('object');
//                                                                                 // res.body.success.should.be.false;
//                                                                                 chai.request(server)
//                                                                                     .post('/user/matches')
//                                                                                     .send({email1: s5.email, email2: s6.email, swipe:"true"})
//                                                                                     .end((err, res) => {
//                                                                                         res.should.have.status(200);
//                                                                                         res.body.should.be.an('object');
//                                                                                         // res.body.success.should.be.true;
//                                                                                         chai.request(server)
//                                                                                             .post('/user/matches')
//                                                                                             .send({email1: s4.email, email2: s5.email, swipe:"true"})
//                                                                                             .end((err, res) => {
//                                                                                                 res.should.have.status(200);
//                                                                                                 res.body.should.be.an('object');
//                                                                                                 // res.body.success.should.be.true;
//                                                                                                 done();
//                                                                                             });
//                                                                                     });
//                                                                             });
//                                                                     });
//                                                             });
//                                                     });
//                                             });
//                                     });
//                             });
//                     });
//             });
//     });

//     // it('getConvos!', (done) => {
//     //     chai.request(server)
//     //         .post('/user/conversation')
//     //         .send({email1: s1.email, email2: s2.email})
//     //         .end((err, res) => {
//     //             res.should.have.status(200);
//     //             res.body.should.be.an('object');
//     //             // res.body.success.should.be.false;

//     //             chai.request(server)
//     //                 .post('/user/conversation')
//     //                 .send({email1: s1.email, email2: s4.email})
//     //                 .end((err, res) => {
//     //                     res.should.have.status(200);
//     //                     res.body.should.be.an('object');
//     //                     // res.body.success.should.be.false;

//     //                     chai.request(server)
//     //                         .post('/user/conversation')
//     //                         .send({email1: s1.email, email2: s3.email})
//     //                         .end((err, res) => {
//     //                             res.should.have.status(200);
//     //                             res.body.should.be.an('object');
//     //                             // res.body.success.should.be.false;

//     //                             chai.request(server)
//     //                                 .post('/user/conversation')
//     //                                 .send({email1: s3.email, email2: s2.email})
//     //                                 .end((err, res) => {
//     //                                     res.should.have.status(200);
//     //                                     res.body.should.be.an('object');
//     //                                     // res.body.success.should.be.false;

//     //                                     chai.request(server)
//     //                                         .post('/user/conversation')
//     //                                         .send({email1: s2.email, email2: s1.email})
//     //                                         .end((err, res) => {
//     //                                             res.should.have.status(200);
//     //                                             res.body.should.be.an('object');
//     //                                             // res.body.success.should.be.true;

//     //                                             chai.request(server)
//     //                                                 .post('/user/conversation')
//     //                                                 .send({email1: s4.email, email2: s1.email})
//     //                                                 .end((err, res) => {
//     //                                                     res.should.have.status(200);
//     //                                                     res.body.should.be.an('object');
//     //                                                     // res.body.success.should.be.false;

//     //                                                     chai.request(server)
//     //                                                         .post('/user/conversation')
//     //                                                         .send({email1: s3.email, email2: s1.email})
//     //                                                         .end((err, res) => {
//     //                                                             res.should.have.status(200);
//     //                                                             res.body.should.be.an('object');
//     //                                                             // res.body.success.should.be.true;
//     //                                                             //////
//     //                                                             chai.request(server)
//     //                                                                 .post('/user/conversation')
//     //                                                                 .send({email1: s6.email, email2: s5.email})
//     //                                                                 .end((err, res) => {
//     //                                                                     res.should.have.status(200);
//     //                                                                     res.body.should.be.an('object');
//     //                                                                     // res.body.success.should.be.false;
//     //                                                                     chai.request(server)
//     //                                                                         .post('/user/conversation')
//     //                                                                         .send({email1: s5.email, email2: s4.email})
//     //                                                                         .end((err, res) => {
//     //                                                                             res.should.have.status(200);
//     //                                                                             res.body.should.be.an('object');
//     //                                                                             // res.body.success.should.be.false;
//     //                                                                             chai.request(server)
//     //                                                                                 .post('/user/conversation')
//     //                                                                                 .send({email1: s5.email, email2: s6.email})
//     //                                                                                 .end((err, res) => {
//     //                                                                                     res.should.have.status(200);
//     //                                                                                     res.body.should.be.an('object');
//     //                                                                                     // res.body.success.should.be.true;
//     //                                                                                     chai.request(server)
//     //                                                                                         .post('/user/conversation')
//     //                                                                                         .send({email1: s4.email, email2: s5.email})
//     //                                                                                         .end((err, res) => {
//     //                                                                                             res.should.have.status(200);
//     //                                                                                             res.body.should.be.an('object');
//     //                                                                                             // res.body.success.should.be.true;
//     //                                                                                             done();
//     //                                                                                         });
//     //                                                                                 });
//     //                                                                         });
//     //                                                                 });
//     //                                                         });
//     //                                                 });
//     //                                         });
//     //                                 });
//     //                         });
//     //                 });
//     //         });


// //     it('Should check conversations', (done) => {
// //         chai.request(server)
// //             .get('/user/conversation')
// //             .set("email", "s@s1")
// //             .end((err, res) => {
// //                 console.log(res.body);
// //                 // res.should.have.status(200);
// //                 // res.body.should.be.an('object');
// //                 // res.body.success.should.be.true;
// //                 done();
// //             });
// //     });

});


//             // .post('/user/register')
//             // .send({email: s2})
//             // .post('/user/register')
//             // .send({email: s3})
//             // .post('/user/register')
//             // .send({email: s4})
//             // .post('/user/register')
//             // .send({email: s5})
//             // .post('/user/register')
//             // .send({email: s6})

//  