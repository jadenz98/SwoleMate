var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* POST update info */
router.post('/', function(req, res, next) {
    const email = req.header("email");
    // console.log(email);
    const userQuery = {email};

    // console.log(req.body);

    const newValues = {
        $set: req.body
    };

    Mongo.update("Users", userQuery, newValues, () => {
        const resp = {
            success: true
        };
        res.json(resp);
    });
});

module.exports = router;