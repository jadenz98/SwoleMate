var express = require('express');
var router = express.Router();

/* POST login info */
router.post('/', function(req, res, next) {
    const resp = {
        user: req.body.username,
        pass: req.body.password
    };

    res.json(resp);
});

module.exports = router;
