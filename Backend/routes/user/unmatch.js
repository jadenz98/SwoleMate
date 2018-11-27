var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* POST unmatch info */
router.post('/', function(req, res, next) {
    const userQuery1 = {
        email1: req.body.email1,
        email2: req.body.email2
    };

    Mongo.delete("Conversations", userQuery1, () => {});

    const userQuery2 = {
        email1: req.body.email2,
        email2: req.body.email1
    };

    Mongo.delete("Conversations", userQuery2, () => {});

    Mongo.find("Matches", { email: req.body.email1 }, undefined, (matches) => {
        for (let i = 0; i < matches.likes.length; i++) {
            if (matches.likes[i].email === req.body.email2) {
                matches.likes[i].match = false;
                const newValues = {
                    $set: matches
                };
                /**
                 * This will update the matches of email 1 so they get unmatched and 
                 * can never be matched again. 
                 */
                Mongo.update("Matches", { email: req.body.email1 }, newValues, (success) => {
                    const resp = {
                        success: true
                    };
                });
            }
        }


        res.json(resp);
    });
});

module.exports = router;