var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* POST Register info */
router.post('/', function(req, res, next) {
    const body = req.body;

    const resp = req.body;

    const newUser = req.body;

    Mongo.insert("Users", newUser, () => {
        res.json(resp);
    });
});

module.exports = router;