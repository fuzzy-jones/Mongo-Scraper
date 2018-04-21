// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Set up a static folder (public) for our web app
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

// need to write this to scrape for vice news
/* -/-/-/-/-/-/-/-/-/-/-/-/- */
app.get("/scrape", function(req, res) {
    // Make a request call to grab the HTML body from the site of your choice
    request("https://news.vice.com/en_us", function(error, response, html) {
      
        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(html);
      
        // Select each element in the HTML body from which you want information.
        // NOTE: Cheerio selectors function similarly to jQuery's selectors,
        // but be sure to visit the package's npm page to see how it works
        $("article.unit standard-unit a l ea eb ec ed ag ah ee ef eg eh ei ej").each(function(i, element) {

            <article class="unit standard-unit a l ea eb ec ed ag ah ee ef eg eh ei ej"><div class="a bq ek el em en eo ep eq er es et eu ev ew ex ey ez fa fb fc"><div class="label-topic fd fe dm cx bd bm ff ds">NORTH KOREA</div></div><a href="/en_us/article/j5a9mk/kim-jong-un-says-north-korea-has-suspended-its-nuclear-missile-testing" class="ds dr"><div class="u a en eo fg fh fi fj fk"><div class="ai fl fm fn fo fp fq fr fs"></div><div class="j ft fu"><div class="label-topic fd fe dm cx bd bm ff ds">NORTH KOREA</div><div class="fv bt c d fw fx">Kim Jong Un says North Korea has suspended its nuclear missile testing</div></div></div></a></article>
            
            var link = $(element).children("a").attr("href");
            var title = $(element).children(".fv bt c d fw fx").text();
        
            // Save these results in an object that we'll push into the results array we defined earlier
            db.scrapedData.insert(
            {
            title: title,
            link: link
            });
          
        });
    });
});

// request for testing to see if scrape is working in console before scraping to mongodb

// Make a request call to grab the HTML body from the site of your choice
request("article.unit standard-unit a l ea eb ec ed ag ah ee ef eg eh ei ej", function(error, response, html) {
    
    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(html);

    // An empty array to save the data that we'll scrape
    var results = [];

    // Select each element in the HTML body from which you want information.
    // NOTE: Cheerio selectors function similarly to jQuery's selectors,
    // but be sure to visit the package's npm page to see how it works
    $("a.itemTitle").each(function(i, element) {

    var link = $(element).children("a").attr("href");
    var title = $(element).children(".fv bt c d fw fx").text();

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
        title: title,
        link: link
    });
    });

    // Log the results once you've looped through each of the elements found with cheerio
    console.log(results);
});


// // Listen on port 3000
// app.listen(3000, function() {
//     console.log("App running on port 3000!");
// });