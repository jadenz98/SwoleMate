var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var bcrypt = require('bcryptjs');

import Mongo from '../../utils/Mongo';
import auth from '../../config/googleAuth';

/* POST User info */
router.post('/', function(req, res, next) {
    const user = req.body;
    const userQuery = {
        email: user.email
    };

    Mongo.find("Users", userQuery, undefined, (result) => {
        if (result.length === 0) {
            const resp = {
                success: false
            };

            res.json(resp);
        } else {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: auth.email,
                    pass: auth.pass
                }
            });

            const mailOptions = {
                from: auth.email,
                to: user.email,
                subject: 'Reseting your SwoleMate Password',
                text: 'To reset your password click on the link below.\nLINK: http://18.224.157.155:8000/accountRecovery/' + user.email + '\nIf you did not request to reset your password then please ignore this.'
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
