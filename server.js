// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Set up a static folder (public) for our web app
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Database configuration
var databaseUrl = "viceScraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
    console.log("Database Error:", error);
});

// Main route (simple Hello World Message)
app.get("/", function(req, res) {
    res.send("Hello world");
});

app.get("/all", function(req, res) {
    // Query: In our database, go to the scraper collection, then "find" everything
    db.scrapedData.find({}, function(err, data) {
        // Log any errors if the server encounters one
        if (err) {
        console.log(err);
        }
        else {
        // Otherwise, send the result of this query to the browser
        res.json(data);
        }
    });
});



// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
});