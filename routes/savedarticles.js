var express = require("express");
var router = express.Router();

/* GET home page. */

router.get('/savedarticles', function(req, res) {
    res.render("dashboard/savedarticles");
});

module.exports = router;