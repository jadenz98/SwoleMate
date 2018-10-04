var express = require('express');
var router = express.Router();

/* POST login info */
router.post('/', function(req, res, next) {
    const userQuery = {
        user: req.body.email,
        pass: req.body.password
    };
    Mongo.find("Users", userQuery, undefined, (result) => {
        if(result.length == 0){
            const resp = {
                success: false
            };
            res.json(resp);
        }else{
            const resp = {
                success: true
            };
            res.json(resp);
        }
        // res.json(resp);
    });
    // res.json(resp);
});

module.exports = router;
