// NPM requires
const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

var db = require("../../models");

module.exports = function(router){

// ------ HEADLINE ROUTE TO DISPLAY ARTICLES FROM DB ------- //

router.get("/articles", function(req, res) {
  // Find all results from the newsData collection in the db
  db.newsData.find({})
  .then(function(error, found) {
     // If there are no errors, send the data to the browser as json
    return res.json(found);
  })
    .catch(function(err) {
        // If an error occurred, send it to the client
        res.json('ERROR: ' + err);
      });
  });

};

// module.exports = router;