var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* GET calendar */
router.get('/', function(req, res, next) {
    const email = req.header("email");

    Mongo.findReal("Calendars" , {email: email}, undefined, (result) => {
        res.json(result[0].events);
    });
});

/* POST calendar event */
router.post('/', function(req, res, next) {
    const email = req.body.email;
    const a = req.body.event;

    Mongo.findReal("Calendars" , {email: email}, undefined, (result) => {
        result[0].events.push(a);

        const newValues = {
            $set: result[0]
        };

        Mongo.update("Calendars", {email: email}, newValues, () => {
            const resp = {
                success: true
            };

            res.json(resp);
        });
    });
});

module.exports = router;
