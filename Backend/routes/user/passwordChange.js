var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

import Mongo from '../../utils/Mongo';

/* POST new login info */
router.post('/', function(req, res, next) {
	const newUser = req.body; 
    const email = req.body.email;
    const userQuery = {email};

    bcrypt.hash(newUser.password, 10, function(err, hash) {
        if(err){
            console.log(err);
        }

        newUser.password = hash;

        const newValues = {
            $set: newUser
        };

        Mongo.update("Users", userQuery, newValues, () => {
            const resp = {
                success: true
            };

            res.json(resp);
        });
    });
});

module.exports = router;
