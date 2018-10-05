var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* GET matches */
router.get('/', function(req, res, next) {
    const email1 = req.header("email1");
    const email2 = req.header("email2");

    Mongo.getConversation(email1, email2, (conversation) => {
        res.json(conversation);
    });
});

module.exports = router;
