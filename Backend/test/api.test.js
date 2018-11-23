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
        // git delete.
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
        let lat = -86.9132166;

        for (var i = 0; i < 41; i++) {
            lat += .00001;
            // console.log(lat);
            use[i] = {
                name: "s@s" + i,
                password: "test",
                email: "s@s" + i,
                birthday: "12/17/1500",
                phone: "1234567890",
                bio: "test bio!",
                searchDistance: 100,
                location: {
                    type: "Point",
                    coordinates: [
                        lat,
                        40.4244238
                    ]
                },
                interests: ["swimming"],
                isGhost: false,
                photoData: "/9j/4AAQSkZJRgABAQAASABIAAD/4QBYRXhpZgAATU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAI6ADAAQAAAABAAAAPQAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgAPQAjAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwUDAwMFBgUFBQUGCAYGBgYGCAoICAgICAgKCgoKCgoKCgwMDAwMDA4ODg4ODw8PDw8PDw8PD//bAEMBAgICBAQEBwQEBxALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/dAAQAA//aAAwDAQACEQMRAD8A8f0vSljGIAEynJxzyw/n0r71/Z++AGialoC694zT7XPd/wCqjDkCKPORyuDuPevkG0gjsLG7v2+dLYqyg4+6CMDPvxX0ePFHx5174T6TYfBL7HaatfXL+ddXBVIre2jfa7BiD82c8kHgcZJFfmeTUlObnNaI/WeKMTKnCNKk7N6s+p/Ef7LPw51qyb+zvO0m4X7kkUhkQH3R8g/mD718IfEr4f6h4P1uTRNQkDPH8omTowP+rb29CO1e0X3jL4leNNb8P3HwN+K2k6veeGj9n8RadOSy3DjAcRhUOckMFYlemQeoqt8edWlHijTtN14LGdUiWVITgywsowyEgnK5UkN7V7Wb5ZTlRdSnG0lr8j57I80qwrxhUlzRlofK8d6ioqzxM0ijBOPSn/brf/ni/wCVeiHwno11if8Aex7wPlRgV6dQSe/Wk/4QvRv79x+Y/wAa+D9rA/QrxP/Qi1LwrceJPA+paPpchjvb3akJUZO4dBgdc15/8KvjlqnhT4bt4E1hjZ6hZ3U6Rea4R5ApBkUjPJSQnOOcV9IfDuw1G91XT/Jg320cnnTS4JVMdAT05OMDvXxZ8dPA9tZePNe0S+tH8me6a9hdQPkjuMsGHbGcqfXHrX5nk3MqMnLZv9D93pZTRx2KlRnL3oxuvPXY634ML4U+Gvi681nRdejsL7Wrj7VOnybJG5O0YIZeWOO3PSvc/H1m/wASfF+i/FeXVmmj060e3gjRMRyZ3HeWPUfNnHsOa/PzQvh5bx3w+zzSXF7JiGElQAJZDsUKASRgHknB/Cv1t0b4fTn4aaboGnbGudPjVmDHbvSNNrAHpnHIz19a+xr89XBVVT1dt+/l9x85mOUUsBiqMqnVvTt5/eeDi7cDCnA9nAH5Gl+2y+p/77FT/wDCF3d4TcpcQAOT97dnjjtxR/wgV7/z8W//AI//AI1+Wcke59M0f//R9f8Ah94t03RtHufCl7IYbzWDEbVyMKzru+TPQE44/Gvlj45+PLYanAdWZrHULZzCkygbZEJwY2PQqcfLkYBr6a+Glx4ROqs/im8hie0gX7MJW2KHK5ZizYHy5OBnqa+L/wBqy2TxbrcVj4KEd7b2xMs1wpUI5+6qo2fmI79vevgspjzYdc8rJH6vLEyo5l7SjFuW/l/wzWjO0+FdrLqOqnWL+ff82bWL5AS5+9LsQAZxwGIz1r6Ak/aX8DeFNTvfCqXD3GpRI1usSRuQZSOF3Yxjnk9ODzXyB8DviR4b8Lrp9nr0y2F9YqsMsc2Q3yjqvHOfY16i2iHxZql1qek2/lWWoiWWF5Vw+A+9eOvIzX0NfMFhsLG2tzmxl8yx0p1I8qVrJben9eYlp4m1J7ZHWYgEcZzn9Ks/8JHqf/Pf+ddfY2UNjZxWnlqfKXGdtW9sP/PJf++a/OnJX2PtUj//0qoXMkqsoZGHTHBGe/5Vx/iLR5dUYJbqAVj3enAx0/OuzsMGcxY/1W1c+uTmtWS0iiWFlHLROPzwK/H6cuV6H7vDZngXh7wHp93fT6pqEIllRAUz0+XIOR3xXvnh6TbYwSRYH2dyMdsA5/I5NYGnxR26yBB/HIn4da6XTdN+w6cJBJv81icYxjHB785zWtWs5bsFFJaF9YbebMmVXJIwe2DinfZLf++n5VVNsihR1+VfX0pPs6eg/Wuc6FI//9k=",
                photoHeight: 60.75,
                photoWidth: 34166666666666664.
            };
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
        chai.request(server)
            .post('/user/delete')
            .send({ email: x })
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
            .send({ email: "steven@steve.com" })
            .end((err, res) => {
                res.body.success.should.be.false;
                done();
            });
    });


    it('Should not be able to log in with wrong pass', (done) => {
        let x = use[40];
        chai.request(server)
            .post('/user/login')
            .send({ email: x.email, password: "te" })
            .end((err, res) => {
                res.body.success.should.be.false;
                done();
            });
    });
    it('Should not be able to log in with wrong email', (done) => {
        let x = use[40];
        chai.request(server)
            .post('/user/login')
            .send({ email: "boywonder@boy", password: x.password })
            .end((err, res) => {
                res.body.success.should.be.false;
                done();
            });
    });
    it('should be able to log into a account with correct creds', (done) => {
        let x = use[40];
        chai.request(server)
            .post('/user/login')
            .send({ email: x.email, password: x.password })
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
            .send({ name: "Pizzaman", phone: "800" })
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
            .send({ bio: "Come get me", birthday: "0/0/0" })
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
            .send({ searchDistance: 69 })
            .end((err, res) => {
                res.body.success.should.be.true;
                done();
            });
    });

    it('check to see if everything is updated', (done) => {
        let x = use[40];
        // console.log(x);
        chai.request(server)
            .get('/user')
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
            .send({ email: x.email })
            .end((err, res) => {
                res.body.success.should.be.true;
                done();
            });
    });

    it('should not be able to log into a deleted account', (done) => {
        let x = use[40];
        chai.request(server)
            .post('/user/login')
            .send({ email: x.email, password: x.password })
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
            .send({ latitude: 69, longitude: 57 })
            .end((err, res) => {
                res.body.success.should.be.true;
                done();
            });
    });

    it('should check to make sure location is updated', (done) => {
        let x = use[39];
        chai.request(server)
            .get('/user')
            .set({ email: x.email })
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
            .send({ latitude: 180, longitude: 180 })
            .end((err, res) => {
                res.body.success.should.be.false;
                done();
            });
    });

    it('should check to make sure location is updated', (done) => {
        let x = use[39];
        chai.request(server)
            .get('/user')
            .set({ email: x.email })
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
            .set({ email: x.email })
            .end((err, res) => {
                res.body.length.should.equal(10);
                done();
            });
    });

    it('should be able to get 10 users from nearbyUsers on a differnt user', (done) => {
        let x = use[0];
        chai.request(server)
            .get('/user/nearbyUsers')
            .set({ email: x.email })
            .end((err, res) => {
                res.body.length.should.equal(10);
                done();
            });
    });

    it('a user should have no users if he has not swiped', (done) => {
        let x = use[0];
        chai.request(server)
            .get('/user/matches')
            .set({ email: x.email })
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
            .send({ email1: x.email, email2: y.email, swipe: s })
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
            .send({ email1: x.email, email2: y.email, swipe: s })
            .end((err, res) => {
                res.body.success.should.be.true
                done();
            });
    });

    it('If both people swiped on eachother, start a conversation', (done) => {
        let x = use[0];
        chai.request(server)
            .get('/user/matches')
            .set({ email: x.email })
            .end((err, res) => {
                res.body.length.should.equal(1);
                done();
            });
    });

    it('If both people swiped on eachother, start a conversation', (done) => {
        let x = use[1];
        chai.request(server)
            .get('/user/matches')
            .set({ email: x.email })
            .end((err, res) => {
                res.body.length.should.equal(1);
                done();
            });
    });

    it('should be able to unmatch with someone', (done) => {
        let x = use[1];
        let y = use[0];
        chai.request(server)
            .post('/user/unmatch')
            .send({ email1: x.email, email2: y.email })
            .end((err, res) => {
                // console.log(res.body);
                res.body.success.should.be.true
                done();
            });
    });

    it('If both people swiped on eachother, then one of the umatched, should reflect in DB', (done) => {
        let x = use[1];
        chai.request(server)
            .get('/user/matches')
            .set({ email: x.email })
            .end((err, res) => {
                res.body.length.should.equal(0);
                done();
            });
    });

    it('multiple people swiping on eachother', (done) => {
        let s0 = use[0];
        let s1 = use[1];
        let s2 = use[2];
        let s3 = use[3];
        let s4 = use[4];
        let s5 = use[5];
        let s6 = use[6];
        let s7 = use[7];
        let s8 = use[8];
        let s9 = use[9];
        let s10 = use[10];
        let s11 = use[11];
        let s12 = use[12];
        let s13 = use[13];
        let s14 = use[14];
        let s15 = use[15];
        let s16 = use[16];
        let s17 = use[17];
        let s18 = use[18];
        let s19 = use[19];
        let s20 = use[20];
        let s21 = use[21];
        let s22 = use[22];
        let s23 = use[23];
        let s24 = use[24];
        let s25 = use[25];
        let s26 = use[26];
        let s27 = use[27];
        let s28 = use[28];
        let s29 = use[29];
        let s31 = use[31];
        let s32 = use[32];
        let s33 = use[33];
        let s34 = use[34];
        let s35 = use[35];
        let s36 = use[36];
        let s37 = use[37];
        let s38 = use[38];
        let s39 = use[39];
        let t = "true";
        let f = "false";

        chai.request(server)
            .post('/user/matches')
            .send({ email1: s0.email, email2: s2.email, swipe: t })
            .end((err, res) => {
                // console.log(res.body);
                // res.body.success.should.be.false
                // done();

                chai.request(server)
                    .post('/user/matches')
                    .send({ email1: s0.email, email2: s3.email, swipe: t })
                    .end((err, res) => {
                        // console.log(res.body);
                        // res.body.success.should.be.false
                        // done();

                        chai.request(server)
                            .post('/user/matches')
                            .send({ email1: s0.email, email2: s4.email, swipe: t })
                            .end((err, res) => {
                                // console.log(res.body);
                                // res.body.success.should.be.false
                                // done();

                                chai.request(server)
                                    .post('/user/matches')
                                    .send({ email1: s0.email, email2: s5.email, swipe: t })
                                    .end((err, res) => {
                                        // console.log(res.body);
                                        // res.body.success.should.be.false
                                        // done();

                                        chai.request(server)
                                            .post('/user/matches')
                                            .send({ email1: s1.email, email2: s2.email, swipe: t })
                                            .end((err, res) => {
                                                // console.log(res.body);
                                                // res.body.success.should.be.false
                                                // done();
                                            });
                                        chai.request(server)
                                            .post('/user/matches')
                                            .send({ email1: s1.email, email2: s3.email, swipe: t })
                                            .end((err, res) => {
                                                // console.log(res.body);
                                                // res.body.success.should.be.false
                                                // done();

                                                chai.request(server)
                                                    .post('/user/matches')
                                                    .send({ email1: s1.email, email2: s4.email, swipe: t })
                                                    .end((err, res) => {
                                                        // console.log(res.body);
                                                        // res.body.success.should.be.false
                                                        // done();

                                                        chai.request(server)
                                                            .post('/user/matches')
                                                            .send({ email1: s1.email, email2: s5.email, swipe: t })
                                                            .end((err, res) => {
                                                                // console.log(res.body);
                                                                // res.body.success.should.be.false
                                                                // done();

                                                                chai.request(server)
                                                                    .post('/user/matches')
                                                                    .send({ email1: s2.email, email2: s0.email, swipe: t })
                                                                    .end((err, res) => {
                                                                        // console.log(res.body);
                                                                        // res.body.success.should.be.true
                                                                        // done();

                                                                        chai.request(server)
                                                                            .post('/user/matches')
                                                                            .send({ email1: s2.email, email2: s1.email, swipe: t })
                                                                            .end((err, res) => {
                                                                                // console.log(res.body);
                                                                                // res.body.success.should.be.true
                                                                                // done();

                                                                                chai.request(server)
                                                                                    .post('/user/matches')
                                                                                    .send({ email1: s2.email, email2: s3.email, swipe: t })
                                                                                    .end((err, res) => {
                                                                                        // console.log(res.body);
                                                                                        // res.body.success.should.be.false
                                                                                        // done();

                                                                                        chai.request(server)
                                                                                            .post('/user/matches')
                                                                                            .send({ email1: s2.email, email2: s4.email, swipe: t })
                                                                                            .end((err, res) => {
                                                                                                // console.log(res.body);
                                                                                                // res.body.success.should.be.false
                                                                                                // done();

                                                                                                chai.request(server)
                                                                                                    .post('/user/matches')
                                                                                                    .send({ email1: s3.email, email2: s0.email, swipe: t })
                                                                                                    .end((err, res) => {
                                                                                                        // console.log(res.body);
                                                                                                        // res.body.success.should.be.true
                                                                                                        // done();

                                                                                                        chai.request(server)
                                                                                                            .post('/user/matches')
                                                                                                            .send({ email1: s3.email, email2: s1.email, swipe: t })
                                                                                                            .end((err, res) => {
                                                                                                                // console.log(res.body);
                                                                                                                // res.body.success.should.be.true
                                                                                                                // done();

                                                                                                                chai.request(server)
                                                                                                                    .post('/user/matches')
                                                                                                                    .send({ email1: s3.email, email2: s2.email, swipe: t })
                                                                                                                    .end((err, res) => {
                                                                                                                        // console.log(res.body);
                                                                                                                        // res.body.success.should.be.true
                                                                                                                        done();
                                                                                                                    });
                                                                                                            });
                                                                                                    });
                                                                                            });
                                                                                    });
                                                                            });
                                                                    });
                                                            });
                                                    });
                                            });
                                    });
                            });
                    });
            });

    });

    it('Givening someone all the matches to make sure nothing breaks', (done) => {
        let x = match(0, 39, done);
    }).timeout(50000);

    function match(num1, num2, done) {
        let t = "true";
        let f = "false";
        if (num1 === num2) {

            done();
            return 1;
        }
        chai.request(server)
            .post('/user/matches')
            .send({ email1: use[num1].email, email2: use[num2].email, swipe: t })
            .end((err, res) => {
                res.body.success.should.be.false
                chai.request(server)
                    .post('/user/matches')
                    .send({ email1: use[num2].email, email2: use[num1].email, swipe: t })
                    .end((err, res) => {
                        res.body.success.should.be.true
                        match(num1 + 1, num2, done);
                    });
            });
    }

    it('check to make sure s39 has the correct amount of matches', (done) => {
        let x = use[39];
        chai.request(server)
            .get('/user/matches')
            .set({ email: x.email })
            .end((err, res) => {
                res.body.length.should.equal(39);
                done();
            });
    });

    it('A user should be able to report other users', (done) => {
        let msg = "I really dont like this guy, REPORTED";
        chai.request(server)
            .post('/user/report')
            .send({ email: use[0].email, emailReported: use[15].email, reportMessage: msg })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true
                chai.request(server)
                    .get('/user/report')
                    .set({email: use[0].email})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.length.should.equal(1);
                        done();
                    });
            });
    });




    // function matches(num1, num2, done) {
    //     let t = "true";
    //     let f = "false";
    //     if (num1 === num2) {
    //         console.log("END:" + num1 + ":" + num2);
    //         done();
    //         return 1;
    //     }
    //     chai.request(server)
    //         .post('/user/matches')
    //         .send({ email1: use[num2].email, email2: use[num1].email, swipe: t })
    //         .end((err, res) => {
    //             match(num1 + 1, num2, done);
    //         });
    //     // match(num1 + 1, num2, done);
    // }
    // function matches(num1, num2) {
    //     let t = "true";
    //     let f = "false";
    //     if (num1 === num2) {
    //         return;
    //     }
    //     console.log(use[num2].email);
    //     console.log(use[num1].email);
    //     chai.request(server)
    //         .post('/user/matches')
    //         .send({ email1: use[num1].email, email2: use[num2].email, swipe: t })
    //         .end((err, res) => {
    //             var wait = res.body;
    //             console.log(wait);
    //         });
    //     match(num1, num2 + 1);
    // }




    // it('multiple peoele swiping', (done) => {
    //     let y = use[0];
    //     let x = use[1];
    //     let s = "true";
    //     chai.request(server)
    //         .post('/user/matches')
    //         .send({email1:x.email, email2: y.email, swipe:s})
    //         .end((err, res) => {
    //             res.body.success.should.be.true
    //             done();
    //         });
    // });

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