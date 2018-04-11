// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
var mongojs = require("mongojs");

// Require request and cheerio. This makes the scraping possible
// Scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var request = require("request");
var cheerio = require("cheerio");

//Require all Models
var db = require('./models');

var port = 8002;

//Create environmental remote port
// var PORT = process.env.PORT || 8001;

// Initialize Express
var app = express();


// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
// new Promise(() => { throw new Error('exception!'); });

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/Scraper");

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "/views/layouts/partials")
}));
app.set("view engine", "handlebars");


// Database configuration
var databaseUrl = "mongooseScraper";
var collections = ["scrappedData"];

// Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

// // Main route 
// app.get("/", function(req, res) {
//   // db.scrappedData.find({'saved': false}, function(err, data){
//   //   if (error) {
//   //     console.log(error);
//   //   } else {
//   //   var mainObject = {
//   //     article: data
//   //   };
//   //   console.log(data);    
//   //   console.log(mainObject);
//   //   res.render('index', mainObject);
//     res.send('Scrape has been completed');
//     // }
//   // });
// });

// Scrape data from one site and place it into the mongodb db
// app.get("/scrape", function(req, res) {

  
//         // Make a request call to grab the HTML body from the site of your choice
//   request("http://www.punchbowlsocial.com/location/chicago", function(error, response, html) {
      
//         // Load the HTML into cheerio and save it to a variable
//         // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
//         var $ = cheerio.load(html);
        
//       //   // An empty array to save the data that we'll scrape
//         // var results = [];
      
//         // Select each element in the HTML body from which you want information.
//         // NOTE: Cheerio selectors function similarly to jQuery's selectors,
//         // but be sure to visit the package's npm page to see how it works
//         $("div.row").each(function(i, element,) {
      
//           // var link = $(element).children().attr("href");
//           var title = $(element).children().text();
//           var imgLink = $(element).find("a").attr("href");
//           // var summary = 
//           // Save these results in an object that we'll push into the results array we defined earlier
          
//           // var entry = new Article(results);
//           if(title && imgLink) {
          
//           db.scrapedData.insert({
//             title: title,
//             link: imgLink
//           },
//           function(err, inserted) {
//               if (err) {
//                 // Log the error if one is encountered during the query
//                 console.log(err);
//               }
//               else {
//                 // Otherwise, log the inserted data
//                 console.log(inserted);
//               }
//             });
//         };
  
//       });
//     });
  
//     // Send a "Scrape Complete" message to the browser
//     res.send("Scrape Complete");
//   });

// // Retrieve data from the db
// app.get("/all", function(req, res) {
//   // Find all results from the newsData collection in the db
//   db.scrappedData.find({}, function(error, found) {
//     // Throw any errors to the console
//     if (error) {
//       console.log(error);
//     }
//     // If there are no errors, send the data to the browser as json
//     else {
//       res.json(found);
//     }
//   });
// });


// Listen on port 8001
app.listen(port, function() {
  console.log('App running on port ' + port + '!');
});