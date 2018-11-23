var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* POST User info to delete */
router.post('/', function(req, res, next) {
    const userQuery = { email: req.body.email };

    const resp = {
        success: true
    };
    const yikes = {
        success: false
    };

    Mongo.findReal("Users", userQuery, undefined, (result) => {
        if (result.length === 0) {
            res.json(yikes);
        } else {
            for (let i = 0; i < result.length; i++) {
                Mongo.delete("Users", {_id:result[i]._id}, () => {});
            }

            Mongo.findReal("Matches", userQuery, undefined, (result) => {
                for (let i = 0; i < result.length; i++) {
                    Mongo.delete("Matches", {_id:result[i]._id}, () => {});
                }

                Mongo.findReal("Conversations", userQuery, undefined, (result) => {
                    for (let i = 0; i < result.length; i++) {
                        Mongo.delete("Conversations", {_id:result[i]._id}, () => {});
                    }

                    res.json(resp);
                });
            });
        }
    });
});

module.exports = router;
