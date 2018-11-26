const Accounts = {};
const request = require('request');

Accounts.create = function (num, name, callback) {
    num--;

    const user = {
        name: name + num,
        password: "test",
        email: name + num,
        birthday: "12/17/1500",
        phone: "1234567890",
        bio: "test bio!",
        searchDistance: 100,
        location: {
            type: "Point",
            coordinates: [
                -86.9132166 + (.00001 * num),
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
    };

    if (num <= -1) {
        callback();
    } else {
        console.log("Creating user " + user.name + "...");

        request.post(
            'http://localhost:8000/user/register',
            {
                json: user
            },
            function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    Accounts.create(num, name, callback);
                }
            }
        );
    }
};

Accounts.delete = function (num, name, callback) {
    num--;

    if (num <= -1) {
        callback();
    } else {
        console.log("Deleting user " + name + num + "...");

        request.post(
            'http://localhost:8000/user/delete',
            {
                json: {
                    email: name + num
                }
            },
            function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    Accounts.delete(num, name, callback);
                }
            }
        );
    }
};

module.exports = Accounts;