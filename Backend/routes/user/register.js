var express = require('express');
var router = express.Router();

/* POST Register info */
router.post('/', function(req, res, next) {
    const resp = {
        user: req.body.username,
        pass: req.body.password
    };

    res.send(JSON.stringify(resp));
});

module.exports = router;