var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* GET User Info */
router.get('/', function(req, res, next) {
    const email = req.header("email");

    Mongo.find("Users", {email: email}, undefined, (user) => {
        user.password = undefined;
        user._id = undefined;

        res.json(user);
    });
});

module.exports = router;