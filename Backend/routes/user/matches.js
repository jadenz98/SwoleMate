var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* POST update info */
router.get('/', function(req, res, next) {
    const username = req.header("username");

    Mongo.getNearbyUsers(username, (users) => {
        res.send(JSON.stringify(users));
    });
});

module.exports = router;
