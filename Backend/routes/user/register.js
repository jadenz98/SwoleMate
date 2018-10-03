var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://18.224.157.155:27017';

/* POST Register info */
router.post('/', function(req, res, next) {
    const resp = {
        user: req.body.username,
        pass: req.body.password,
        email: req.body.useremail,
        dob: req.body.dateofbirth,
        phone: req.body.userphone,
        bio: req.body.userbio
    };
    	// console.log(user);
        MongoClient.connect(url, function(error, db){
    	if(error) throw error;
    	var dbo = db.db("SwoleMate");
    	var myobj = { username: req.body.username, password: req.body.password, useremail: req.body.useremail, dateofbirth: req.body.dateofbirth, userphone: req.body.userphone, userbio: req.body.userbio };
    	dbo.collection("Users").insertOne(myobj, function(err, res){
    		if(err) throw err;
    		console.log("1 docuemnt inserted");
    		db.close();
    	})
	})
    res.send(JSON.stringify(resp));
    
});





module.exports = router;