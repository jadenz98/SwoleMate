var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* GET test. */
router.get('/', function(req, res, next) {
    const username = req.header("username");

    Mongo.find("Users", {username: username}, undefined, (user) => {
        res.json(user);
    });
});

module.exports = router;
