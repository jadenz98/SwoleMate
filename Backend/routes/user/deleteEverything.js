var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* POST update info */
router.post('/', function(req, res, next) {


    const resp = {
        success: true
    };


    Mongo.findReal("Users", "", undefined, (result) => {
        for (var i = 0; i < result.length; i++) {
                Mongo.delete("Users", {_id:result[i]._id}, () => {});
        }
        Mongo.findReal("Matches", "", undefined, (result) => {
            // console.log(result);
            for (var i = 0; i < result.length; i++) {
                Mongo.delete("Matches", {_id:result[i]._id}, () => {});
            }
            Mongo.findReal("Conversations", "", undefined, (result) => {
                for (var i = 0; i < result.length; i++) {
                    Mongo.delete("Conversations", {_id:result[i]._id}, () => {

                        // res.json(resp);
                    });
                }
                res.json(resp);

                    // Mongo.delete("Matches", userQuery, () => {});
            });
        });
    });


    
    
    // Mongo.delete("Users", userQuery, (result) => {
    //     const resp = {
    //         success: true
    //     };
    //     res.json(resp);
    // });
});

module.exports = router;
