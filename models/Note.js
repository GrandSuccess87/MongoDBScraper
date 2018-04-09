var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model

var NoteSchema = new Schema({

  // `article` is of type String
  // `article` is an object that stores an Article id & makes reference to the Article Model
  // This allows us to populate the Note with an associated Article

   article: {  
    type: Schema.Types.ObjectId,
    ref: "Ariticle"
  },
  // `body` is of type String
  body: {type: String}
  
});

// This creates the Note model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;