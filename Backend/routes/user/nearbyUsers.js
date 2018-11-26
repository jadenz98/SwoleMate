var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* GET nearby Users */
router.get('/', function(req, res, next) {
    const email = req.header("email");

    Mongo.getNearbyUsers(email, (users) => {
        res.json(users);
    });
});

module.exports = router;
