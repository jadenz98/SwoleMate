
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

import Mongo from '../../utils/Mongo';

/* POST Register info */
router.post('/', function(req, res, next) {
    const newUser = req.body;
    const userQuery = {
        email: newUser.email
    };
    const matches = {
        email: newUser.email,
        likes: []
    };

    Mongo.find("Users", userQuery, undefined, (result) => {
        if (result.length === 0) {
            const resp = {
                success: true
            };
            // console.log("HERE1 STEVE: " + newUser.password + "\n\n");

            bcrypt.hash(newUser.password, 10, function(err, hash) {
                if(err){
                    console.log(err);
                }
                // console.log(hash + "\n\n\n");
                // console.log(hash + "\n\n\n");
                newUser.password = hash;
                Mongo.insert("Matches", matches, () => {});
                Mongo.insert("Users", newUser, () => {
                    res.json(resp);
                });
            });
            // console.log(hash + "\n\n\n");

        } else {
            const resp = {
                success: false
            };
            res.json(resp);
        }
    });
});

module.exports = router;