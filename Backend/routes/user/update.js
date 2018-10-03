var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* POST update info */
router.post('/', function(req, res, next) {
    const userQuery = { username: req.body.username };
    const newValues = {
        $set: {
            email: req.body.useremail,
            dateOfBirth: req.body.dateofbirth,
            phone: req.body.userphone,
            bio: req.body.userbio
        }
    };

    Mongo.update("Users", userQuery, newValues, () => {
        const resp = {
            success: true
        };

        res.send(JSON.stringify(resp));
    });
});
module.exports = router;
