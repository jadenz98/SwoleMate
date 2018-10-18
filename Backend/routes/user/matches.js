var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* GET matches */

// router.get('/', function(req, res, next) {
//     const email = req.header("email");

//     Mongo.getMatches(email, (matches) => {
//     	// Console.log(matches);
//         res.json(req.body);
//     });
// });

/*
Before you delete and redo this sam, READ THIS
This method takes a User, checks the matches for the user. 
If it gets true for a match it will check that user to see if 
that User has a true next to him. 
*/

router.post('/', function(req, res, next) {
	const User = req.body;
	// var userList= [];
	var userPotentialUserList= [];
	// console.log(User.potentialMatches);
	if(User.potentialMatches == 1){
	    Mongo.getMatches(User.email, (matchesUser) => {
			Mongo.getMatches(User.potentialUserEmail, (potentialUser) => {
				console.log(matchesUser);
				console.log(potentialUser);

				// console.log(potentialUser);
				// if(potentialUser == 0){
				// 	const resp = {
			 //           	success: false
			 //       	};
			 //       	res.json(resp);
				// }

			});

	    });

	    // console.log(userList);
	    res.json(User);
	}else{
		res.json(User);
	}
	
});

module.exports = router;
