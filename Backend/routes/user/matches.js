var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* GET matches */

 router.get('/', function(req, res, next) {
     const email = req.header("email");
     Mongo.getMatches(email, (matches) => {
     	// console.log("HERE");
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
	// console.log(email1);

	if(body.swipe == "true"){ //If they swipe right
		Mongo.find("Matches", {email: email1}, undefined, (matches1) => { //get matchlist of email 1
			Mongo.find("Matches", {email: email2}, undefined, (matches2) => { //get matchlist of email 2
				for (var i = 0; i < matches2.likes.length; i++) { //go through all the emails in matchlist 2
					if(matches2.likes[i].email == email1){	//if we find email1 in matchlist 2
						if(matches2.likes[i].match == true){ 	//if that says true we know its a match!
							const conver = {	//create convo format
								email1: email1,
								email2: email2,
								conversation: []
							}
							Mongo.insert("Conversations", conver, () => {}); //insert the new convo!
							const querty = {	//gets resp ready
								email: email2,
								match: true
							}
							matches1.likes.push(querty); //pushes it on the matchlist1
			                const newValues = {	//appends it to mathces for MANGO DB
	                  			$set: matches1
	                		};
			            	Mongo.update("Matches", {email: email1}, newValues, () => { //updates and appends the new matchlist 1
			            		const resp = { //send back true because people matched!
									success: true
								};
								res.json(resp);
			                });
			                return; //return;
						}
					}
				}
				//if they swipe right but other person hasnt swiped/swiped left. 
				const querty = { //puts true in the matchlist 1
					email: email2,
					match: true
				}
				matches1.likes.push(querty); 
		        const newValues = {
		  			$set: matches1
				};
		    	Mongo.update("Matches", {email: email1}, newValues, () => { //appends new matchlist 1
		    		const resp = { //return 0 since no match!
						success: false
					};
					res.json(resp);
		        });
		    	return;
			});
		});
	}else{ //swipe == false
		Mongo.find("Matches", {email: email1}, undefined, (matches1) => {
			const querty = {
				email: email2,
				match: false
			}
			matches1.likes.push(querty);
	        const newValues = {
	  			$set: matches1
			};
	    	Mongo.update("Matches", {email: email1}, newValues, () => {
	    		const resp = {
					success: false
				};
				res.json(resp);
	        });
        });
	}
});

module.exports = router;
