var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* POST update info */
router.post('/', function(req, res, next) {
    const userQuery = { email: req.body.email };
    console.log(userQuery);

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
        	Mongo.delete("Users", userQuery, () => {
        		res.json(resp);
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
