// NPM requires
const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

var db = require("../../models");

module.exports = function(router){

// Route to delete an article
    router.post("/articles/delete/:id", function(req, res) {
        db.newsData.findOneAndUpdate({ "_id": req.params.id }, {"saved": false, "notes": []})
        .then(function(err, dbDeletedArticle) {
            res.send(dbDeletedArticle);
        })
        .catch(function(err) {
        // If an error occurred, send it to the client
            res.json('ERROR: ' + err);
        });
    });

// Route to delete note
    router.delete("/notes/delete/:note_id/:article_id", function(req, res) {      
        db.Note.findOneAndRemove({ "_id": req.params.article_id }, {$pull: {"notes": req.params.note_id}})
            .then(function(dbNoteDelete) {
                return res.json(dbNoteDelete);
                console.log("Note Deleted!");
            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                res.json('ERROR: ' + err);
            });
          });
}
   



