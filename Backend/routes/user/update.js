var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* POST update info */
router.post('/', function(req, res, next) {
    const username = req.header("username");
    const userQuery = {username};

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
