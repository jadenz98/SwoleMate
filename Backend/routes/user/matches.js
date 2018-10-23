var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* GET matches */

 router.get('/', function(req, res, next) {
     const email = req.header("email");

     Mongo.getMatches(email, (matches) => {
     	   //console.log(matches);
         res.json(matches);
     });
 });

/*
Before you delete and redo this sam, READ THIS
This method takes a User, checks the matches for the user.
If it gets true for a match it will check that user to see if
that User has a true next to him.
*/

router.post('/', function(req, res, next) {
	const body = req.body;
	const email1 = body.email1;
	const email2 = body.email2;

	if(body.swipe == "true"){
	    Mongo.setMatches(email1, email2, () => {
				const resp = {
            success: true
        };
        res.json(resp);
	    });
	}else{
		  const resp = {
			  	success: false
		  };
		  res.json(resp);
	}
});

module.exports = router;
