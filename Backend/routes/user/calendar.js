var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* GET matches */
router.get('/', function(req, res, next) {
    const email = req.header("email");
    Mongo.findReal("Calendars" , {email: email}, undefined,  (result) => {
        res.json(result.events);
    });
});


router.post('/', function(req, res, next) {
    const email = req.body.email;
    const event = req.body.event;
    // const msg = req.body.msg;
    Mongo.findReal("Calendars" , {email: email}, undefined,  (result) => {
        var eventList = result.events;
        eventList.push(event);
        Mongo.update("Calendars", {email: email}, eventList, () => { //appends new matchlist 1
            const resp = { //return 0 since no match!
                success: true
            };
            res.json(resp);
        });
    });
});

module.exports = router;
