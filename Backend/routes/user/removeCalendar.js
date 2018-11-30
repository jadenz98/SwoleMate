var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* GET calendar */
// router.get('/', function(req, res, next) {

// });

/* POST calendar event */
router.post('/', function(req, res, next) {
    const email = req.body.email;
    const date = req.body.date;
    const time = req.body.time;
    Mongo.find("Calendars", { email: email }, undefined, (result) => {
        for (var i = 0; i < result.events.length; i++) {
            if ((result.events[i].date == date) && (result.events[i].startTime == time)) {
                result.events.splice(i, 1);
                const newValues = {
                    $set: { events: result.events }
                };
                Mongo.update("Calendars", { email: email }, newValues, () => {
                    const resp = {
                        success: true
                    };
                    res.json(resp);
                });
            }
        }
    });
});

module.exports = router;



/*
        {
            "Title" : "Hello",
            "startTime" : "10:12",
            "endTime" : "11:12",
            "date" : "2018-11-30",
            "length" : 780
        },
*/