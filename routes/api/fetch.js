// NPM requires
const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

var db = require("../../models");

module.exports = function(router){
// Main route to render Handlebars pages
router.get("/", function(req, res) {
  db.newsData.find({'saved': false}) 
  .then(function(err, data){

    var mainObject = {
      article: data
    };
})
.catch(function(err) {
    // If an error occurred, send it to the client
    res.json('ERROR: ' + err);
});
    console.log('Unsaved Articles: ' + mainObject);
    res.render('index', mainObject);
    // res.send('Scrape has been completed');
  });





// Scrape data from one site and place it into the mongodb db
router.get("/scrape", function(req, res) {

  
// Make a request call to grab the HTML body from the site of your choice
    request("http://www.punchbowlsocial.com/location/chicago", function(error, response, html) {
      
 // Load the HTML into cheerio and save it to a variable
 // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(html);
        
//An empty array to save the scraped data 
        var results = [];
      
 // Select each element in the HTML body from which you want information.
 // NOTE: Cheerio selectors function similarly to jQuery's selectors,
 // but be sure to visit the package's npm page to see how it works
 $("div.row").each(function(i, element,) {
      
   // var link = $(element).children().attr("href");
   var title = $(element).children().text();
   var imgLink = $(element).find("a").attr("href");
   var summary = $(element);

   var entry = new Article(results);

   //Save entry to database
   entry.save(function(err, dbArticle){
       if(err){
           console.log(err);
           res.json(err);
       } else {
           console.log(dbArticle);
           // If there are no errors, send the data to the browser as json
           res.json(dbArticle);
       }
   });
});
    res.send('Scrape Is Complete');
    console.log(results);
    
  });
});

}

// module.exports = router;