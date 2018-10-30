var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* GET matches */
router.get('/', function(req, res, next) {
    const email1 = req.header("email1");
    const email2 = req.header("email2");
    var convo = [];
    Mongo.getConversation(email1, email2, (conversation) => {
    	console.log(conversation);
    	convo.push(conversation);
        res.json(conversation);
    });
});


router.post('/', function(req, res, next) {
    Mongo.setConversation(email1, email2, (conversation) => {
    	
        res.json(conversation);
    });
});

module.exports = router;
