// NPM requires
const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

var db = require("../../models");

module.exports=function(router){

// Route for grabbing a specific Article by its id, then populate it with it's note
    router.get('articles/:id', function(req, res){
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.newsData.findOne({ _id: req.params.id })
        .populate("note")
        .then(function(dbNote) {
    // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbNote);
        })
        .catch(function(err) {
    // If an error occurred, send it to the client
        res.json(err);
        });
    });

// Route for saving/updating an Article's associated Note
    router.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
      .then(function(dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.newsData.findOneAndUpdate({ '_id': req.params.id }, { 'note': dbNote._id }, { new: true });
      })
      .then(function(dbUpdatedNote) {
        // If we were able to successfully update an Article, send it back to the client
        res.json('UPDATED ARTICLE NOTE: ' + dbUpdatedNote);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json('ERROR: ' + err);
      });
  });    
};


// module.exports = router;