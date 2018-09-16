//File: models/note.js
//Summary: this file sets up the note model to be used by mongoose

//require mongoose
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//Use the Schema method to create a note schema object

var NoteSchema = new Schema({
    noteTitle: {
        type: String
    },
    noteText: {
        type: String
    }

});//end note schema

//Create the model from the note schema above
var Note = mongoose.model("Note", NoteSchema);

//Export the model
module.exports = Note;