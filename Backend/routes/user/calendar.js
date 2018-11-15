var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* GET matches */
router.get('/', function(req, res, next) {
    console.log("EAWFWE");
    const email = req.header("email");
    Mongo.findReal("Calendars" , {email: email}, undefined,  (result) => {
        res.json(result[0].events);
    });
});


router.post('/', function(req, res, next) {
    const email = req.body.email;
    const a = req.body.event;
    // const msg = req.body.msg;
    Mongo.findReal("Calendars" , {email: email}, undefined,  (result) => {
        // console.log(result[0].events);
        result[0].events.push(a);
        // console.log(result[0].events);
        const newValues = { //appends it to mathces for MANGO DB
            $set: result[0]
        };
        Mongo.update("Calendars", {email: email}, newValues, () => { //appends new matchlist 1
            const resp = { //return 0 since no match!
                success: true
            };
            res.json(resp);
        });
    });
});

module.exports = router;
