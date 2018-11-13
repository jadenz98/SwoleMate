
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var bcrypt = require('bcryptjs');

import Mongo from '../../utils/Mongo';

/* POST Register info */
router.post('/', function(req, res, next) {
    const newUser = req.body;
    const userQuery = {
        email: newUser.email
    };
    // console.log(userQuery);

    Mongo.find("Users", userQuery, undefined, (result) => {
        if (result.length == 0) {
            const resp = {
                success: false
            };
            res.json(resp);
            // console.log(hash + "\n\n\n");

        } else {
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'SwoleMateRecovery@gmail.com',
                pass: 'DontGuessThis'
              }
            });

            var mailOptions = {
              from: 'SwoleMateRecovery@gmail.com',
              to: newUser.email,
              subject: 'Reseting your SwoleMate Password',
              text: 'To reset your password click on the link below.\nLINK: http://localhost:3000/accountRecovery/' + newUser.email + '\nIf you did not request to reset your password then please ignore this.'
            };
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
            const resp = {
                success: true
            };
            res.json(resp);
        }
    });
});

module.exports = router;
