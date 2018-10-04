var express = require('express');
var router = express.Router();

/* GET test. */
router.get('/', function(req, res, next) {
    const resp = {
        message: "hello world!",
        arbitraryData: "123456",
        whatever: "blah"
    };

    res.json(resp);
});

module.exports = router;
