var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* GET Reports for User */
router.get('/', function(req, res, next) {
    let email = req.header("email");

    Mongo.findReal("reports", {email:email}, undefined, (bac) => {
        res.json(bac);
    });
});

/* POST report info */
router.post('/', function(req, res, next) {
    let email = req.body.email;
    let emailReported = req.body.emailReported;
    let reportMessage = req.body.reportMessage;

    const message = {
        email: email,
        emailReported: emailReported,
        reportMessage: reportMessage
    };

    Mongo.insert("reports", message, () => {
        const resp = {
            success: true
        };

        res.json(resp);
    });
});

module.exports = router;
