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
            // Delete the user
            Mongo.delete("Users", userQuery, () => {
                Mongo.delete("Matches", userQuery, () => {
                    Mongo.delete("Conversations", {email1: result[0].email}, () => {
                        Mongo.delete("Conversations", {email2: result[0].email}, () => {
                            Mongo.delete("reports", {email: result[0].email}, () => {
                                Mongo.delete("Calendars", {email: result[0].email}, () => {
                                    res.json(resp);
                                });
                            });
                        });
                    });
                });
            });
        }
    });
});

module.exports = router;
