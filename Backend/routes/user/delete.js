var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* POST update info */
router.post('/', function(req, res, next) {
    // console.log(req.body.email + " + \n\n\n\n");
    const userQuery = { email: req.body.email };
    // console.log(userQuery);

    const resp = {
        success: true
    };
    const yikes = {
        success: false
    };



    Mongo.findReal("Users", userQuery, undefined, (result) => {
        if(result.length === 0){
            res.json(yikes);
            return;
        }else{
            for (var i = 0; i < result.length; i++) {
                    Mongo.delete("Users", {_id:result[i]._id}, () => {});
            }
            Mongo.findReal("Matches", userQuery, undefined, (result) => {
                console.log(result);
                for (var i = 0; i < result.length; i++) {
                    Mongo.delete("Matches", {_id:result[i]._id}, () => {});
                }
                Mongo.findReal("Conversations", userQuery, undefined, (result) => {
                    for (var i = 0; i < result.length; i++) {
                        Mongo.delete("Conversations", {_id:result[i]._id}, () => {
                        });
                    }
                    res.json(resp);

                        // Mongo.delete("Matches", userQuery, () => {});
                });
            });
        }
    });
    // Mongo.delete("Users", userQuery, (result) => {
    //     const resp = {
    //         success: true
    //     };
    //     res.json(resp);
    // });
});

module.exports = router;
