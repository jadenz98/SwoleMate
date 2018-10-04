var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* GET matches */
router.get('/', function(req, res, next) {
    const email = req.header("email");

    Mongo.getMatches(email, (matches) => {
        res.json(matches);
    });
});

module.exports = router;
