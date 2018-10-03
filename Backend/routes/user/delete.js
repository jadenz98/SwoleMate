var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* POST update info */
router.post('/', function(req, res, next) {
    const userQuery = { username: req.body.username };

    Mongo.delete("Users", userQuery, () => {
        const resp = {
            success: true
        };

        res.send(JSON.stringify(resp));
    });
});

module.exports = router;
