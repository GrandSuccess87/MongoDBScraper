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

var PORT = process.env.PORT || 8002;

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

// Use deployed Heroku database or local
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper";
// mongoose.connect(MONGODB_URI, {
//   useMongoClient: true
// });


var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "/views/layouts/partials")
}));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
require('./routes/api/notes.js')(app);
require('./routes/api/fetch.js')(app);
require('./routes/api/headlines.js')(app);
require('./routes/api/saved.js')(app);
require('./routes/api/delete.js')(app);

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/ChicagoTribune");

// Database configuration
var databaseUrl = "mongooseScraper";
var collections = ["newsData"];


var db = mongoose.connection;

// Show any mongoose errors
// Hook mongojs configuration to the db variable
// db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// logging into mongoosedb
db.on("open", function() {
  console.log("Mongoose connection successful.");
});



// Listen on port 8001
app.listen(PORT, function() {
  console.log('App running on PORT ' + PORT + '!');
});