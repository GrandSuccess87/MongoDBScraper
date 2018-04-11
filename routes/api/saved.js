// NPM requires
const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

var db = require("../../models");

module.exports = function(router){
// // Route for viewing saved articles

router.get('/saved', function(req, res){
    db.newsData.find({'saved': true}) 
    .then(function(savedData){
        var savedObject = {
          article: savedData
        };
    })
    .catch(function(err) {
        // If an error occurred, send it to the client
        res.json('ERROR: ' + err);
    });
        // console.log(savedData);    
        console.log('Saved Articles: ' + savedObject);
        res.render('saved', savedObject);
        // If there are no errors, send the data to the browser as json
        // res.json(savedObject);      
});

// Route to save an article
    router.post('articles/save/:id', function(req, res){
        db.newsData.findOneAndUpdate({_id: req.params.id}, {saved: true})
        .then(function(dbSaveArticle){
            res.json(dbSaveArticle);
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json('ERROR: ' + err);
          });
    })
}