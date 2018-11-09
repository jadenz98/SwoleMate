var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* POST update info */
router.post('/', function(req, res, next) {
    let email = req.body.email;
    let emailReported = req.body.emailReported;
    let reportMessage = req.body.reportMessage;

    const message = {
        email: email,
        emailReported: emailReported,
        reportMessage: reportMessage
    }
    console.log(message);

    const resp = {
        success: true
    };

    Mongo.insert("reports", message, () => {});
    res.json(resp);
});

module.exports = router;
