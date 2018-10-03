var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient,
url = 'mongodb://18.224.157.155:27017';

/* POST update info */
router.post('/', function(req, res, next) {
    MongoClient.connect(url, function(error, db){
        //check for connection error
        if(error){
            console.error(error);
            process.exit(1);
        }
        //put methods to modify database here
        var dbo = db.db("SwoleMate");
        var myquery = { username: req.body.username };
        var newvalues = { $set: {useremail: req.body.useremail, dateofbirth: req.body.dateofbirth, userphone: req.body.userphone, userbio: req.body.userbio } };
        dbo.collection("Users").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
        console.log("1 document updated");
        //close database
        db.close();
      })
    })
    const resp = {
      success: true
    };
    res.send(JSON.stringify(resp));
});
module.exports = router;
