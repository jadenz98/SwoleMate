var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* POST Register info */
router.post('/', function(req, res, next) {
    const body = req.body;

    const userQuery = { email: req.body.email };
    // console.log(userQuery);

    // const resp = {
    //     user: body.username,
    //     pass: body.password,
    //     email: body.useremail,
    //     dob: body.dateofbirth,
    //     phone: body.userphone,
    //     bio: body.userbio
    // };
    const newUser = {
        name: body.name,
        password: body.password,
        email: body.email,
        sex: body.sex,
        birthday: body.birthday,
        phone: body.phone,
        bio: body.bio
    };
    Mongo.find("Users", userQuery, undefined, (result) => {
        if(result.length == 0){
            const resp = {
                success: true
            };
            Mongo.insert("Users", newUser, () => {
                res.json(resp);
            });
            // res.json(resp);
        }else{
            const resp = {
                success: false
            };
            res.json(resp);
        }

        // res.json(resp);
    });

});

module.exports = router;