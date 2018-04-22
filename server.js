// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");

// route
var index = require("./routes/index");

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

// routes
app.use('/', index);

// // Database configuration
var databaseUrl = "viceScraper";
var collections = ["scrapedData"];

// // Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
    console.log("Database Error:", error);
});



// app.get("/all", function(req, res) {
//     // Query: In our database, go to the scraper collection, then "find" everything
//     db.scrapedData.find({}, function(err, data) {
//         // Log any errors if the server encounters one
//         if (err) {
//         console.log(err);
//         }
//         else {
//         // Otherwise, send the result of this query to the browser
//         res.json(data);
//         }
//     });
// });

// scrape vice news site 
/* -/-/-/-/-/-/-/-/-/-/-/-/- */
// app.get("/scrape", function(req, res) {
//     // Make a request call to grab the HTML body from the site of your choice
//     request("https://www.vice.com/en_us", function(error, response, html) {
      
//         // Load the HTML into cheerio and save it to a variable
//         // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
//         var $ = cheerio.load(html);
      
//         // Select each element in the HTML body from which you want information.
//         // NOTE: Cheerio selectors function similarly to jQuery's selectors,
//         // but be sure to visit the package's npm page to see how it works
//         $("a.grid__wrapper__card").each(function(i, element) {
            
//             // storing the scraped info into variables
//             var link = $(element).attr("href");
//             var title = $(element).children("div.grid__wrapper__card__text").children().children("h2").text();
//             var summary = $(element).children("div.grid__wrapper__card__text").children().children("div.grid__wrapper__card__text__summary").text();
        
        
//             db.scrapedData.insert({
//                 title: title,
//                 summary: summary,
//                 link: link
//             },
//             function(err, inserted) {
//                 if (err) {
//                   // Log the error if one is encountered during the query
//                   console.log(err);
//                 }
//                 else {
//                   // Otherwise, log the inserted data
//                   console.log(inserted);
//                 }
//             });
          
//         });
//     });
// });

// request for testing to see if scrape is working in console before scraping to mongodb
// Make a request call to grab the HTML body from the site of your choice
// request("https://www.vice.com/en_us", function(error, response, html) {
    
//     // Load the HTML into cheerio and save it to a variable
//     // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
//     var $ = cheerio.load(html);

//     // An empty array to save the data that we'll scrape
//     var results = [];

//     // Select each element in the HTML body from which you want information.
//     // NOTE: Cheerio selectors function similarly to jQuery's selectors,
//     // but be sure to visit the package's npm page to see how it works
//     $("a.grid__wrapper__card").each(function(i, element) {
//         // <a class="grid__wrapper__card grd-col col-12-xs col-6-m col-4-xl col-3-hd" href="https://video.vice.com/en_us/video/blazing-trails-in-frisco-colorado-blunt-reviews/5ac7e631f1cdb36f883212e1?ref=vice" target="_blank"><div class="p-b-2-xs dsp-none-xs dsp-block-m grid__wrapper__card__topic"><div class="jsx-4125111214 topic__date"><div class="canonical__topic hed-xs dsp-inline-xs"><span>Blunt Reviews</span></div></div></div><div class="grid__wrapper__card__thumbnail__wrapper"><div class="grid__wrapper__card__thumbnail"><picture><source srcset="https://video-images.vice.com/videos/5a/c7/5ac7e631f1cdb36f883212e1/5ac7e631f1cdb36f883212e1-1524260343756.jpg?crop=1xw%3A1xh%3Bcenter%2Ccenter&amp;resize=1250%3A*" media="(min-width: 1250px)"><source srcset="https://video-images.vice.com/videos/5a/c7/5ac7e631f1cdb36f883212e1/5ac7e631f1cdb36f883212e1-1524260343756.jpg?crop=1xw%3A1xh%3Bcenter%2Ccenter&amp;resize=1050%3A*" media="(min-width: 1050px)"><source srcset="https://video-images.vice.com/videos/5a/c7/5ac7e631f1cdb36f883212e1/5ac7e631f1cdb36f883212e1-1524260343756.jpg?crop=1xw%3A1xh%3Bcenter%2Ccenter&amp;resize=850%3A*" media="(min-width: 850px)"><source srcset="https://video-images.vice.com/videos/5a/c7/5ac7e631f1cdb36f883212e1/5ac7e631f1cdb36f883212e1-1524260343756.jpg?crop=1xw%3A1xh%3Bcenter%2Ccenter&amp;resize=650%3A*" media="(min-width: 650px)"><source srcset="https://video-images.vice.com/videos/5a/c7/5ac7e631f1cdb36f883212e1/5ac7e631f1cdb36f883212e1-1524260343756.jpg?crop=1xw%3A1xh%3Bcenter%2Ccenter&amp;resize=600%3A*" media="(min-width: 400px)"><source srcset="https://video-images.vice.com/videos/5a/c7/5ac7e631f1cdb36f883212e1/5ac7e631f1cdb36f883212e1-1524260343756.jpg?crop=1xw%3A1xh%3Bcenter%2Ccenter&amp;resize=400%3A*" media="(min-width: 0px)"><img priority="2" class="" src="https://vice-web-statics-cdn.vice.com/images/blank.png"></picture></div><div class="play-duration__wrapper dsp-flex-xs p-t-2-xs p-b-2-xs p-r-2-xs p-l-2-xs"><div class="play-duration__duration m-l-1-xs hed-xs">9:12</div></div></div><div class="grid__wrapper__card__text p-4-xs p-t-3-m p-b-6-m p-r-0-m p-r-5-m p-l-0-m"><div><h2 class="grid__wrapper__card__text__title hed-m m-b-2-xs">Blazing Trails in Frisco, Colorado</h2><div class="grid__wrapper__card__text__summary bod-s m-b-2-xs">Host Simone Sullivan books a curated mountain weed retreat in Frisco, Colorado.</div></div><div class="dsp-inline-xs hed-xxs canonical__date hed-xxs canonical__date--no-divider">6 hours ago</div></div></a>

//     var link = $(element).attr("href");
//     var title = $(element).children("div.grid__wrapper__card__text").children().children("h2").text();
//     var summary = $(element).children("div.grid__wrapper__card__text").children().children("div.grid__wrapper__card__text__summary").text();

//     // Save these results in an object that we'll push into the results array we defined earlier
//     results.push({
//         title: title,
//         summary: summary,
//         link: link
//     });
//     });

//     // Log the results once you've looped through each of the elements found with cheerio
//     console.log(results);
// });


// // Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
});