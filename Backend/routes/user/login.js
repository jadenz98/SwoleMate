var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

import Mongo from '../../utils/Mongo';
/* POST login info */
router.post('/', function(req, res, next) {
    const userQuery = {
        email: req.body.email,
        // password: req.body.password
    };


    // console.log("STEVE" + req.body.email + " " + req.body.password);
    // var email = userQuery.email;
    Mongo.find("Users", userQuery, undefined, (result) => {

        if(result.length === 0){
            const resp = {
                success: false
            };
            res.json(resp);
        }else{
            bcrypt.compare(req.body.password, result.password, function(err, re) {
                if(re){
                    const resp = {
                        success: true
                    };
                    res.json(resp);
                }else{
                    const resp = {
                        success: false
                    };
                    res.json(resp);
                }
            });

        }
    });
});

module.exports = router;
