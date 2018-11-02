var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* POST update info */
router.post('/', function(req, res, next) {
    const email = req.header("email");
    // console.log(email);
    // console.log(req.body.latitude);
    // console.log(req.body.longitude);

    Mongo.updateLocation(email, req.body.latitude, req.body.longitude, () => {
        const resp = {
            success: true
        };
        res.json(resp);
    });
});

module.exports = router;
