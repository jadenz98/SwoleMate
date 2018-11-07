var express = require('express');
var router = express.Router();
// var path = require("../html/accountRecover.html");

/* GET home page. */
// http://localhost:3000/index?pass=eawfsd&passs=feasd
router.get('/', function(req, res, next) {
	console.log(router.route[0]);
});

module.exports = router;