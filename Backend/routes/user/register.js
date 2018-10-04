var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* POST Register info */
router.post('/', function(req, res, next) {
    const newUser = req.body;
    const userQuery = {
        email: newUser.email
    };

    Mongo.find("Users", userQuery, undefined, (result) => {
        if (result.length === 0) {
            const resp = {
                success: true
            };
            Mongo.insert("Users", newUser, () => {
                res.json(resp);
            });
        } else {
            const resp = {
                success: false
            };
            res.json(resp);
        }
    });
});

module.exports = router;