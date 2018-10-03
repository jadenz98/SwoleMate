var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* POST Register info */
router.post('/', function(req, res, next) {
    const body = req.body;

    const resp = {
        user: body.username,
        pass: body.password,
        email: body.useremail,
        dob: body.dateofbirth,
        phone: body.userphone,
        bio: body.userbio
    };

    const newUser = {
        username: body.username,
        password: body.password,
        email: body.useremail,
        dateOfBirth: body.dateofbirth,
        phone: body.userphone,
        bio: body.userbio
    };

    Mongo.insert("Users", newUser, () => {
        res.send(JSON.stringify(resp));
    });
});

module.exports = router;