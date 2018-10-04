var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* POST update info */
router.post('/', function(req, res, next) {
    const username = req.header("username");

    Mongo.updateLocation(username, req.body.latitude, req.body.longitude, () => {
        const resp = {
            success: true
        };

        res.send(JSON.stringify(resp));
    });
});

module.exports = router;
