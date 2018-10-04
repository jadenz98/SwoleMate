var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* POST update info */
router.get('/', function(req, res, next) {
    const email = req.header("email");

    Mongo.getNearbyUsers(email, (users) => {
        res.json(users);
    });
});

module.exports = router;
