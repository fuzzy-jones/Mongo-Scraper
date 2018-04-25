var express = require("express");
var router = express.Router();

/* GET home page. */

router.get('/scrape', function(req, res) {
    res.render("dashboard/scraped");
});

module.exports = router;