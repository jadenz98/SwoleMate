var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* POST update info */
router.post('/', function(req, res, next) {
    // console.log(req.body.email + " + \n\n\n\n");
    const userQuery =
    {
      email1: req.body.email1,
      email2: req.body.email2
    };

    Mongo.delete("Conversations", userQuery, () => {
      //res.json(resp);
    });

    Mongo.find("Matches", {email: req.body.email1}, undefined, (matches) => {
      for(var i = 0; i < matches.likes.length; i++) {
        if(matches.likes[i].email == req.body.email2) {
          matches.likes[i].match = false;
          const newValues = {
            $set: matches
          };
          const resp = {
              success: true
          };
          Mongo.update("Matches", {email: req.body.email1}, newValues, () => {
            res.json(resp);
          });
        }
      }
    });
});

module.exports = router;
